/**
 * This is thanks to Lyxcode for helping me refresh on YouTube.
 */
const logger = require("../utils/logger");

const loadSelectMenus = async (autobotClient) => {
  const { loadFiles } = require("../functions/fileLoader");
  const asciiTable = require("ascii-table");
  const table = new asciiTable().setHeading("Select Menu", "Status");

  await autobotClient.selectMenus.clear();

  const files = await loadFiles("selectMenus");

  if (files.length > 0) {
    files.forEach((file) => {
      const selectMenu = require(file);

      try {
        autobotClient.selectMenus.set(selectMenu.name, selectMenu);

        table.addRow(selectMenu.name, "🟢");
      } catch (e) {
        table.addRow(selectMenu.name, "🔴");
      }
    });

    console.log(table.toString());

    logger.success("Loaded Select Menu.");
  } else logger.info("There are no select menus to load.");
};

module.exports = {
  loadSelectMenus,
};
