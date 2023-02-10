const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const { loadEvents } = require("./handlers/eventHandler");
