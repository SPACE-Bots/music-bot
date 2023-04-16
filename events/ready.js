module.exports = async (client) => {
  const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v10");

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN_BOT);

  (async () => {
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.commands,
      });

      console.log(`[ SLASH CMNDS ] Slash-команды загружены`);
    } catch (err) {
      console.log(err);
    }
  })();

  console.log(
    `[ CONNECTION ] Подключён как "${client.user.tag}" (${client.user.id})`
  );
};
