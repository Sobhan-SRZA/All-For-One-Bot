//======== Packages ========
const {
  Client,
  Collection,
  GatewayIntentBits,
  PermissionsBitField,
  Partials,
} = require('discord.js');
const clc = require("cli-color");
const fs = require('fs');
const client = new Client({
  shards: "auto",
  restRequestTimeout: 15000,
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
    Partials.ThreadMember
  ],
  allowedMentions: {
    parse: [
      "roles",
      "users",
      "everyone"
    ],//mentions disable
    repliedUser: true,//disable mention in replying messages
  },
  ws: {
    properties: {
      browser: "Discord Android",//Discord Web | Discord Android | Discord Ios | Discord Client
      os: "Linux"//Other | Android | iOS | TempleOS | Linux | Mac OS X | Windows
    },
  },
});
client.config = require(`${process.cwd()}/storage/config.js`);
client.prefix = client.config.discord.prefix;
client.token = client.config.discord.token;
client.colors = require(`${process.cwd()}/storage/colors.json`);
client.embed = require(`${process.cwd()}/storage/embed.json`);
client.images = require(`${process.cwd()}/storage/images.json`);
client.findlang = require(`${process.cwd()}/storage/languages.json`);
client.categories = fs.readdirSync(`${process.cwd()}/commands`);
client.slashCommands = new Collection();
client.messageCommands = new Collection();
client.slashCooldowns = new Collection();
client.messageCooldowns = new Collection();
client.languages = {};
const langs = fs.readdirSync(`${process.cwd()}/locales`);
for (const lang of langs.filter(file => file.endsWith(".json"))) {
  client.languages[`${lang.split(".json").join("")}`] = require(`${process.cwd()}/locales/${lang}`)
}
Object.freeze(client.languages)

//========== Set Emotes
let emotes = require(`${process.cwd()}/storage/emotes.json`);
client.on("ready", () => {
  client.emotes = emotes.theme;
})
client.on("interactionCreate", (interaction) => {
  if (!interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.UseExternalEmojis]) && !interaction.channel.permissionsFor(interaction.guild.members.me).has([PermissionsBitField.Flags.UseExternalEmojis])) {
    client.emotes = emotes.default;
  } else {
    client.emotes = emotes.theme;
  }
})
client.on("messageCreate", (message) => {
  if (!message.guild.members.me.permissions.has([PermissionsBitField.Flags.UseExternalEmojis]) && !message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.UseExternalEmojis])) {
    client.emotes = emotes.default;
  } else {
    client.emotes = emotes.theme;
  }
})
client.on("messageUpdate", (m, message) => {
  if (!message.guild.members.me.permissions.has([PermissionsBitField.Flags.UseExternalEmojis]) && !message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.UseExternalEmojis])) {
    client.emotes = emotes.default;
  } else {
    client.emotes = emotes.theme;
  }
})

//======== Loading Starts =========
var starts = fs.readdirSync(`${process.cwd()}/start`).filter(file => file.endsWith('.js'));
let counter = 0;
starts.forEach((file) => {
  require(`${process.cwd()}/start/${file}`)(client);
  counter += 1;
});
try {
  const stringlength = 69;
  console.log("\n")
  console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(counter)} Starts Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${counter} Starts Is Loaded!!`.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
  console.log("\n")
} catch { /* */ }

//======== Consol ========
if (client.token) {
  client.login(client.token).catch(e => {
    console.log(clc.red("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!\n" + e))
  })
} else {
  console.log(clc.red("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!"))
}

//========== Replit Alive
setInterval(() => {
  if (!client || !client.user) {
    try {
      client.logger("The Client Didn't Login Proccesing Kill 1")
      process.kill(1);
    } catch {
    }
  }
}, 20000);
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */