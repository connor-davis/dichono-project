const { BaseInteraction, Client, EmbedBuilder } = require("discord.js");
const logger = require("../../utils/logger");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {BaseInteraction} interaction
   * @param {Client} client
   */
  execute: (client, _, interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command)
        return interaction.reply({
          content: "This command is outdated.",
          ephemeral: true,
        });

      if (command.developer && interaction.user.id !== "965192559427194930")
        return interaction.reply({
          content: "This command is only available to the developer.",
          ephemeral: true,
        });

      logger
        .custom(`command.logger`)
        .info(`${interaction.user.username} used the ${command.name} command.`);

      command.execute(
        interaction,
        client,
        logger.custom(`command.${command.name}`)
      );
    }

    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);

      if (!button)
        return interaction.reply({
          content: "This button is outdated.",
          ephemeral: true,
        });

      if (button.developer && interaction.user.id !== process.env.DEVELOPER_ID)
        return interaction.reply({
          content: "This button is only available to the developer.",
          ephemeral: true,
        });

      logger
        .custom(`button.logger`)
        .info(`${interaction.user.username} used the ${button.name} button.`);

      button.execute(
        interaction,
        client,
        logger.custom(`button.${button.name}`)
      );
    }

    if (interaction.isStringSelectMenu()) {
      const selectMenu = client.selectMenus.get(interaction.customId);

      if (!selectMenu)
        return interaction.reply({
          content: "This select menu is outdated.",
          ephemeral: true,
        });

      if (
        selectMenu.developer &&
        interaction.user.id !== process.env.DEVELOPER_ID
      )
        return interaction.reply({
          content: "This select menu is only available to the developer.",
          ephemeral: true,
        });

      logger
        .custom(`selectMenu.logger`)
        .info(
          `${interaction.user.username} used the ${selectMenu.name} selectMenu.`
        );

      selectMenu.execute(
        interaction,
        client,
        logger.custom(`selectMenu.${selectMenu.name}`)
      );
    }
  },
};
