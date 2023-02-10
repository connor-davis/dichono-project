const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const { loadEvents } = require("./handlers/eventHandler");
const db = require("./utils/db");
const chalk = require("chalk");
const express = require("express");
const app = express();
const compression = require("compression");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const restRoutes = require("./rest");
const http = require("http").createServer(app);
let https;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();

db.get("botToken")
  .then(function (doc) {
    readline.close();

    (async () => {
      const botToken = doc.toString();

      const dichonoClient = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildMessages,
        ],
        partials: [
          Partials.User,
          Partials.Message,
          Partials.GuildMember,
          Partials.ThreadMember,
        ],
      });
      dichonoClient.events = new Collection();
      dichonoClient.commands = new Collection();
      dichonoClient.buttons = new Collection();
      dichonoClient.selectMenus = new Collection();
      dichonoClient.configuration = new Collection();

      await loadEvents(dichonoClient);

      app.use((request, response, next) => {
        request.dichonoClient = dichonoClient;
        request.avatarUrl = dichonoClient.user.avatarURL();

        next();
      });

      dichonoClient
        .login(botToken)
        .then(() => {
          logger.success("Dichono has logged in to Discord.");

          let morganMiddleware = morgan(function (tokens, req, res) {
            return [
              chalk.hex("#10b981").bold(tokens.method(req, res) + "\t"),
              chalk.hex("#ffffff").bold(tokens.status(req, res) + "\t"),
              chalk.hex("#262626").bold(tokens.url(req, res) + "\t\t\t"),
              chalk
                .hex("#10b981")
                .bold(tokens["response-time"](req, res) + " ms"),
            ].join(" ");
          });

          const corsOptions = {
            origin: "*",
            credentials: true, //access-control-allow-credentials:true
            optionSuccessStatus: 200,
          };

          app.use(morganMiddleware);
          app.use(cors(corsOptions));
          app.use(compression());
          app.use(json({ limit: "50mb" }));
          app.use(urlencoded({ limit: "50mb", extended: false }));
          app.use(session({ secret: process.env.ROOT_PASSWORD }));
          app.use(express.static(__dirname + "/public"));
          app.use(express.static(__dirname + "/.well-known"));

          app.use("/rest", restRoutes);

          http.listen(80, () => {
            logger.success("Dichono rest online at http://127.0.0.1");
          });
        })
        .catch((error) => {
          logger.error(error);
        });
    })();
  })
  .catch((error) => {
    readline.question(
      chalk.hex("#a3a3a3").italic("What is your bots token » "),
      (token) => {
        logger.success("Bot token has been saved. Please restart the bot.");

        db.put("botToken", token);

        readline.close();
      }
    );
  });
