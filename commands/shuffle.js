module.exports = {
  name: "перемешать",
  description: "Перемешать треки",
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guildId);
      if (!queue)
        return interaction
          .reply({ content: "Очередь пуста", ephemeral: false })
          .catch((e) => {});

      await queue.shuffle();
      interaction.reply({ content: "Треки успешно перемешаны!" });
    } catch (e) {
      console.log(e);
      return interaction
        .reply({
          content: `err. #3`,
          ephemeral: true,
        })
        .catch((e) => {});
    }
  },
};
