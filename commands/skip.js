const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "пропустить",
  description: "Пропустить трек(и)",
  options: [
    {
      name: "количество",
      description: "Сколько треков пропустить?",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guildId);
      if (!queue || !queue.playing)
        return interaction
          .reply({ content: "Стоп! Сейчас не играет трек!", ephemeral: false })
          .catch((e) => {});

      let number = interaction.options.getNumber("количество");
      if (number) {
        if (!queue.songs.length > number)
          return interaction
            .reply({ content: "Дальше нету трека!", ephemeral: false })
            .catch((e) => {});
        if (isNaN(number))
          return interaction
            .reply({ content: "Указано неверное число!", ephemeral: false })
            .catch((e) => {});
        if (1 > number)
          return interaction
            .reply({ content: "Указано неверное число!", ephemeral: false })
            .catch((e) => {});

        try {
          let old = queue.songs[0];
          await client.player.jump(interaction, number).then((song) => {
            return interaction
              .reply({ content: `Скипнуто до **${old.name}**` })
              .catch((e) => {});
          });
        } catch (e) {
          console.log(e);
          return interaction.reply({ content: `err. #4` }).catch((e) => {});
        }
      } else {
        try {
          let old = queue.songs[0];
          const sucess = await queue.skip();
          return interaction
            .reply({
              content: sucess
                ? `Скипнуто до **${old.name}**`
                : "Пропущенная песня",
            })
            .catch((e) => {});
        } catch (e) {
          console.log(e);
          return interaction
            .reply({
              content: `
              Больше нет песен, которые можно пропустить!`,
              ephemeral: false,
            })
            .catch((e) => {});
        }
      }
    } catch (e) {
      console.log(e);
      return interaction
        .reply({
          content: `err. #5`,
          ephemeral: true,
        })
        .catch((e) => {});
    }
  },
};
