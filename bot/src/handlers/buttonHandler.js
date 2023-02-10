/**
 * This is thanks to Lyxcode for helping me refresh on YouTube.
 */
const logger = require("../utils/logger");

const loadButtons = async (autobotClient) => {
  const { loadFiles } = require("../functions/fileLoader");
  const asciiTable = require("ascii-table");
  const table = new asciiTable().setHeading("Button", "Status");

  await autobotClient.buttons.clear();

  const files = await loadFiles("buttons");

  if (files.length > 0) {
    files.forEach((file) => {
      const button = require(file);

      try {
        autobotClient.buttons.set(button.name, button);

        table.addRow(button.name, "🟢");
      } catch (e) {
        table.addRow(button.name, "🔴");
      }
    });

    console.log(table.toString());

    logger.success("Loaded Buttons.");
  } else logger.info("There are no buttons to load.");
};

module.exports = {
  loadButtons,
};
