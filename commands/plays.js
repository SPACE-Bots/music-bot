const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "включить",
  description: "---",
  options: [
    {
      name: "трек",
      description: "Включить трек из YouTube или Spotify",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "запрос",
          description:
            "Введите ссылку или название трека (поддерживатеся Spotify и YouTube)",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      let stp = interaction.options.getSubcommand();

      if (stp === "трек") {
        const трек = interaction.options.getString("запрос");
        if (!трек)
          return interaction
            .reply({
              content: ":x: Запрос должен иметь ссылку или имя для поиска!",
              ephemeral: false,
            })
            .catch((e) => {});

        await interaction
          .reply({
            content: `Добавлено в очередь!
**${трек}**`,
            ephemeral: false,
          })
          .catch((e) => {});
        try {
          await client.player.play(interaction.member.voice.channel, трек, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction,
          });
        } catch (e) {
          console.log(e);
          await interaction
            .editReply({
              content:
                "<:unsuccess:1070752040965394522> Вы не находитесь в голосовом канале!",
              ephemeral: true,
            })
            .catch((e) => {});
        }
      }
    } catch (e) {
      console.log(e);
      return interaction
        .editReply({ content: `err. #2`, ephemeral: true })
        .catch((e) => {});
    }
  },
};
