//===========================================================================================================//
//======== Packages ========
require('dotenv').config()
const fs = require('fs');
const Meme = require("memer-api");
const clc = require("cli-color");
const { 
   Player 
} = require('discord-player');
const { 
    Client, 
    Intents, 
    Collection,
} = require('discord.js');
const client = new Client({
    intents: new Intents(32767), // 32767 == full intents, calculated from intent calculator 
    shards: 'auto',
    allowedMentions: {
    parse: ["roles", "users", "everyone"],//mentions disable
    repliedUser: false,//disable mention in replying messages
    },
    /*presence: {
      //setting bot status in client
        activities: [{
          name: `${require('./storage/config').status.text}`.replace("{prefix}", require('./storage/config').discord.prefix), 
          type: require('./storage/config').status.type, 
          url: require('./storage/config').status.url
        }],
        status: require('./storage/config').status.presence,
        afk: true
    },*/
    ws: { 
      properties: { 
        $browser: "Discord iOS"//can be "Discord Android" or "Discord iOS" 
       }
    },
});

client.player = new Player(client);
client.config = require('./storage/config');
client.prefix = client.config.discord.prefix;
client.token = client.config.discord.token;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.colors = client.config.colors;
client.categories = fs.readdirSync(`./commands`);
client.commands = new Collection();
client.slashCommands = new Collection();
client.db = require('quick.db');
client.cooldowns = new Collection();
client.memer = new Meme("D7FKH5ltWUe");

//===========================================================================================================//
//======== Loading Starts =========
var starts = fs.readdirSync('./start').filter(file => file.endsWith('.js'));
var FilesLength = new Map();
starts.forEach((file) => {
  require(`./start/${file}`)(client);
  FilesLength.set(file)
});
try {
  const stringlength = 69;
  console.log("\n")
  console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(FilesLength.size)} Starts Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${FilesLength.size} Starts Is Loaded!!`.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
  console.log("\n")
} catch { /* */ }

//===========================================================================================================//
//======== Consol ========
if(client.token){
    client.login(client.token).catch(e => {
     console.log(clc.red("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!\n"+e))
   })
  } else {
 console.log(clc.red("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!"))   
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
