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

      await loadEvents(dichonoClient);

      dichonoClient
        .login(botToken)
        .then(() => {
          logger.success("Dichono has logged in to Discord.");

          const io = require("socket.io")(http, {
            cors: {
              origin: ["https://3reco.co.za", "http://localhost:5173"],
              methods: ["GET", "POST"],
            },
          });

          dichonoClient.socket = io;

          http.listen(80, () => {
            logger.success("Dichono websocket online at http://127.0.0.1");
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
