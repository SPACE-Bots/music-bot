require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const fs = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.player = new DisTube(client, {
  leaveOnStop: true,
  plugins: [new SpotifyPlugin()],
});

const player = client.player;

fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[ CALLED EVENT ] ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./events/player/", (err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/player/${file}`);
    let eventName = file.split(".")[0];
    player.on(eventName, event.bind(null, client));
    console.log(`[ CALLED EVENT ] ${eventName}`);
  });
});

client.commands = [];
fs.readdir("./commands/", (err, files) => {
  if (err) throw err;
  files.forEach((f) => {
    try {
      if (f.endsWith(".js")) {
        let props = require(`./commands/${f}`);
        client.commands.push({
          name: props.name,
          description: props.description,
          options: props.options,
        });
        console.log(`[ CALLED PROPS ] ${props.name}`);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

client.on("ready", () => {
  const selected_our_activiti = [`музыку`];

  setInterval(() => {
    client.user.setPresence({
      activities: [
        {
          name: `${
            selected_our_activiti[
              Math.floor(Math.random() * selected_our_activiti.length)
            ]
          }`,
          type: 1,
          url: `https://twitch.tv/spacemusic`,
        },
      ],
      status: "idle",
      //Заметочка для даунов (в зеркало посмотри): 0 = Играет в, 1 = Стримит, 2 = Слушает, 3 = Смотрит, 5 = Соревнуется в
    });
  }, 15000);
});

(async () => {
  await client.login(process.env.TOKEN_BOT);
  console.log(
    `[ READY ] ${client.user.username} (${client.user.id}) | Серверов: ${client.guilds.cache.size}`
  );
})();
