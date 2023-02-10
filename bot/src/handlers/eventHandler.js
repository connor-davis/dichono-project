/**
 * This is thanks to Lyxcode for helping me refresh on YouTube.
 */
const logger = require("../utils/logger");

const loadEvents = async (autobotClient) => {
  const { loadFiles } = require("../functions/fileLoader");
  const asciiTable = require("ascii-table");
  const table = new asciiTable().setHeading("Event", "Status");

  await autobotClient.events.clear();

  const files = await loadFiles("events");

  if (files.length > 0) {
    files.forEach((file) => {
      const event = require(file);
      const execute = (...args) =>
        event.execute(
          autobotClient,
          logger.custom(`event.${event.name}`),
          ...args
        );

      autobotClient.events.set(event.name, execute);

      try {
        if (event.rest) {
          if (event.nonce) autobotClient.rest.on(event.name, execute);
          else autobotClient.rest.on(event.name, execute);
        } else {
          if (event.once) autobotClient.once(event.name, execute);
          else autobotClient.on(event.name, execute);
        }

        table.addRow(event.name, "🟢");
      } catch (e) {
        table.addRow(event.name, "🔴");
      }
    });

    console.log(table.toString());

    logger.success("Loaded Events.");
  } else logger.info("There are no events to load.");
};

module.exports = {
  loadEvents,
};
