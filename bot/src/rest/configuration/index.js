const { Client } = require("discord.js");
const { Router } = require("express");
const router = Router();

router.get(
  "/",
  /**
   * @param {Object} request
   * @param {Client} request.dichonoClient The bots client
   */
  async (request, response) => {
    const { dichonoClient } = request;

    const configuration = {
      id: dichonoClient.user.id,
      name: dichonoClient.user.username,
      avatar: request.avatarUrl,
      latency: dichonoClient.ws.ping,
      latestUsers: dichonoClient.users.cache.size,
    };

    return response.status(200).json(configuration);
  }
);

router.get(
  "/events",
  /**
   * @param {Object} request
   * @param {Client} request.dichonoClient The bots client
   */
  async (request, response) => {
    const { dichonoClient } = request;
    const events = Array.from(dichonoClient.events.keys());

    return response.status(200).json(events);
  }
);

router.get(
  "/commands",
  /**
   * @param {Object} request
   * @param {Client} request.dichonoClient The bots client
   */
  async (request, response) => {
    const { dichonoClient } = request;
    const commands = Array.from(dichonoClient.commands.keys());

    return response.status(200).json(commands);
  }
);

router.get(
  "/buttons",
  /**
   * @param {Object} request
   * @param {Client} request.dichonoClient The bots client
   */
  async (request, response) => {
    const { dichonoClient } = request;
    const buttons = Array.from(dichonoClient.buttons.keys());

    return response.status(200).json(buttons);
  }
);

router.get(
  "/selectMenus",
  /**
   * @param {Object} request
   * @param {Client} request.dichonoClient The bots client
   */
  async (request, response) => {
    const { dichonoClient } = request;
    const selectMenus = Array.from(dichonoClient.selectMenus.keys());

    return response.status(200).json(selectMenus);
  }
);

module.exports = router;
