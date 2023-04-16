const { InteractionType } = require("discord.js");
const fs = require("fs");

module.exports = async (client, interaction) => {
  try {
    if (!interaction?.guild) {
      return interaction?.reply({
        content: ":x: Бота можно использовать только на серверах!",
        ephemeral: false,
      });
    } else {
      if (interaction?.type === InteractionType.ApplicationCommand) {
        fs.readdir("./commands", (err, files) => {
          if (err) throw err;
          files.forEach(async (f) => {
            let props = require(`../commands/${f}`);
            if (interaction.commandName === props.name) {
              try {
                return props.run(client, interaction);
              } catch (e) {
                console.log(e);
                return interaction?.reply({
                  content: `err. #6`,
                  ephemeral: true,
                });
              }
            }
          });
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
