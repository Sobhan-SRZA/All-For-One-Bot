//===========================================================================================================//
//======== Packages ========
const fs = require('fs');
const clc = require("cli-color");
const { Client, Intents, Collection,MessageEmbed } = require('discord.js');
const INTENTS = new Intents(32767); // 32767 == full intents, calculated from intent calculator 
const client = new Client({
    shards: 'auto',
    allowedMentions: {
    parse: ["roles", "users", "everyone"],//mentions disable
    repliedUser: false,//disable mention in replying messages
    },
    /*presence: {//setting bot status in client
        activities: [{
          name: `${require('./config/bot').status.text}`.replace("{prefix}", require('./config/bot').discord.prefix), 
          type: require('./config/bot').status.type, 
          url: require('./config/bot').status.url
        }],
        status: require('./config/bot').status.presence,
        afk: true
    },*/
    ws: { 
      properties: { 
        $browser: "Discord iOS"//can be "Discord Android" or "Discord iOS" 
       }
    },
  intents: INTENTS
});
const { Player } = require('discord-player');
client.player = new Player(client);
require('dotenv').config()
client.config = require('./config/bot');
client.prefix = client.config.discord.prefix;
client.token = client.config.discord.token;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.colors = client.config.colors;
client.commands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
require('discord-buttons')(client);

//======== Loading Assets =========
var assets = fs.readdirSync('./assets').filter(file => file.endsWith('.js'));
assets.forEach((assets) => {
  require(`./assets/${assets}`)(client);
});
try {
  const stringlength = 69;
  console.log("\n")
  console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(assets.length)} Assets Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${assets.length} Assets Is Loaded!!`.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
} catch { /* */ }


//===========================================================================================================//
//======== Consol ========
if(client.token){
    client.login(client.token).catch(e => {
     console.log(clc.red("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!\n"))
   })
   } else {
     console.log(clc.red("Please Write Your Bot Token Opposite The Token In The ./config/bot.js File In Your Project!"))
   }    
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/