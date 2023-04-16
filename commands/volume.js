const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "громкость",
  description: "Установить громкость воспроизведения треков",
  options: [
    {
      name: "громкость",
      description: "Установить громкость (число от 1 до 100)",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
};
