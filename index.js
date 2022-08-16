//===========================================================================================================//
//======== Express ========
const express = require('express');
const app = express();
const port = 5000;
app.get('/', (req, res) => res.send('Bot Is Working Well!'));
app.listen(port, () => console.log(`Your app listening at http://localhost:${port} \n SIZAR Team `));

//===========================================================================================================//
//======== Consol ========
require('dotenv').config()
const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client({ disableMentions: 'everyone' });  
require('discord-buttons')(client);
const { Player } = require('discord-player');
client.player = new Player(client);
client.config = require('./config/bot');
const prefix = client.config.discord.prefix;
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.colors = client.config.colors;
client.commands = new Discord.Collection();
client.login(client.config.discord.token);
const { GiveawaysManager } = require("discord-giveaways");
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
        /*async getAllGiveaways() {
            return client.giveaways.fetchEverything().array();
        }
        async saveGiveaway(messageId, giveawayData) {
            client.giveaways.set(messageId, giveawayData);
            return true;
        }
        async editGiveaway(messageId, giveawayData) {
            client.giveaways.set(messageId, giveawayData);
            return true;
        }
        async deleteGiveaway(messageId) {
            client.giveaways.delete(messageId);
            return true;
        }*/
    };
const manager = new GiveawayManagerWithOwnDatabase(client, {
        default: {
            storage: "./database.json",
            botsCanWin: false,
            embedColor: '#FFD700',
            embedColorEnd: '#FF0000',
            reaction: `${client.emotes.giveaway}`
        }
    });
client.giveawaysManager = manager;


//===========================================================================================================//
//======== Loading Commands =========
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});
const clc = require("cli-color")//using this package on your codes is not important 
    console.log("\n")
    console.log(clc.red(`Starting AntiCrash`));
    process.on('unhandledRejection', (reason, promise) => {
            console.log(clc.redBright('=== [antiCrash] :: [unhandledRejection] :: [start] ==='));
            console.log(reason);
            console.log(clc.redBright('=== [antiCrash] :: [unhandledRejection] :: [end] ==='));
    });
    process.on('rejectionHandled', (promise) => {
            console.log(clc.redBright('=== [antiCrash] :: [rejectionHandled] :: [start] ==='));
            console.log(promise);
            console.log(clc.redBright('=== [antiCrash] :: [rejectionHandled] :: [end] ==='));
    })
    process.on("uncaughtException", (err, origin) => {
            console.log(clc.redBright('=== [antiCrash] :: [uncaughtException] :: [start] ==='));
            console.log(err);
            console.log(clc.redBright('=== [antiCrash] :: [uncaughtException] :: [end] ==='));
    });
    process.on('uncaughtExceptionMonitor', (err, origin) => {
            console.log(clc.redBright('=== [antiCrash] :: [uncaughtExceptionMonitor] :: [start] ==='));
            console.log(err);
            console.log(clc.redBright('=== [antiCrash] :: [uncaughtExceptionMonitor] :: [end] ==='));
    });
    console.log(clc.greenBright(`AntiCrash Started`));
    console.log("\n")
//===========================================================================================================//
//======== Events =========
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};
for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

//===========================================================================================================//
//======== Status Bot ========
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
client.on("ready", () => {
   function YousamPower() {
    let vazyiat = ["dnd","idle","online"] // online | dnd | idle | offline
    let godrat = Math.floor(Math.random() * vazyiat.length)
   client.user.setPresence({
     status: vazyiat[godrat] })
}; setInterval(YousamPower, 3000)
   function srza() {
    let sezar = [`${prefix}help`, `${prefix}play` , `${client.guilds.cache.size} Servers` ]
    let Power = Math.floor(Math.random() * sezar.length);
   client.user.setActivity(sezar[Power], {type: "WATCHING"});
        }; setInterval(srza, 3000)
  console.log(`${client.user.tag} Is Now Online :)`)
});

//===========================================================================================================//
//======== Bot Guild remove =========
client.on("guildDelete",async guild => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    const embed = new Discord.MessageEmbed()
        .setAuthor(client.user.tag,client.user.displayAvatarURL())
    .setDescription(` Man Az Servere **${guild.name}** Left Dadam Va Tedad Server Hayi Ke Joinam Be Tedad: \`${client.guilds.cache.size}\` Ast`)
    .addField(`👑| Ownere Server: ` ,` tage owner: \` ${guild.owner.tag}\``,true)
    .addField(`📬| Invite Server: ` ,` linke invite server:  **Can't create Invite**`,true)
    .addField(`🗿| ID Server: ` ,` id server: \` ${guild.id}\``,true)
    .setColor("#2F3136")
    .setThumbnail(guild.iconURL({ dynamic: true }))
     .setTimestamp(Date.now())

    channel.send(embed)
  })


//===========================================================================================================//
//======== Bot Guild add =========
  client.on('guildCreate',async guild => {
   const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    const inviteCH = client.channels.cache.get(guild.rulesChannelID);
        let invite = await inviteCH.createInvite({
            maxAge: 0, 
            maxUses: 5
        }, )
  const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.tag,client.user.displayAvatarURL())
    .setDescription(` Man Be Servere **${guild.name}** Add Shodam Va Tedad Server Hayi Ke Joinam Be Tedad: \`${client.guilds.cache.size}\` Ast`)
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .addField(`👑| Ownere Server: ` ,` tage owner: \` ${guild.owner.tag}\``,true)
    .addField(`📬| Invite Server: ` ,` linke invite server:  **${invite}**`,true)
    .addField(`🗿| ID Server: ` ,` id server: \` ${guild.id}\``,true)
    .setColor("#2F3136")
    .setTimestamp(Date.now())

    channel.send(embed)
  })


//===========================================================================================================//
//======== Bot Prefix ========
client.on('message', async message => {
if(!message.guild || message.author.bot) return;
if (message.content === `${prefix}prefix`) {
 var prf = await require('quick.db').fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
 let errorprefixEmbed = new Discord.MessageEmbed()
         .setColor("#2F3136")
         .setThumbnail(client.user.displayAvatarURL())
         .setTimestamp(Date.now())
         .setAuthor(`prefix of ${client.user.tag} shows👌🏻`,client.user.displayAvatarURL())
         .setFooter(`prefix shows to ${message.author.tag} |`,message.author.displayAvatarURL())
         .setDescription(`Prefix Dar In Server **${prf}** ASt`)
  message.channel.send(errorprefixEmbed)
    }

//======== Change Nickname ========
let NicknameChannel = await db.fetch(`NicknameChannel_${message.guild.id}`);
if(NicknameChannel){
if (message.channel.id === NicknameChannel.id){
  if(message.content.length > 32){
    return message.channel.send(new Discord.MessageEmbed()
               .setColor(client.colors.red)
               .setTitle(`${client.emotes.error}| Nickname Morede Nazar Tolani Ast`)
               .setDescription(`Nickname Shoma Nabayad Bishtar Az \`32\` Carecter Bashad.`)).then(msg=> msg.delete({timeout: "7000"})).then(message.delete())
  }else{
  message.member.setNickname(message.content)
         const messageEmbed = new Discord.MessageEmbed()
               .setColor(client.colors.none)
               .setTitle(`${client.emotes.success}|Nickname Shoma Ba Movafagiat Avaz Shod:)`)
               .setDescription(`Nickname Shom Be \`${message.content}\` Taghir Yaft`) 
  message.channel.send(messageEmbed).then(msg=> msg.delete({timeout: "7000"})).then(message.delete())
     }
   }
}
//======== New YT Video News ========
client.db = require("quick.db");
client.request = new (require("rss-parser"))();
client.youtube = {
channel: client.db.fetch(`DsicordYTNews_${message.guild.id}`),
channel_id: client.db.fetch(`YoutubeChannelID_${message.guild.id}`),
watchInterval: 30000,
messageTemplate: client.db.fetch(`YTNewsMessage_${message.guild.id}`)
  /**
  like this => **{author}** video jadid darim yo bodoyid biayid🗣  
Link:   \n{url}  
Mention: @everyone
*/
};
if(client.db.fetch(`YoutubeChannelID_${message.guild.id}`)){
function handleUploads() {
    if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
    setInterval(() => {
        client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.youtube.channel_id}`)
        .then(data => {
            if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
                client.db.set(`videoData`, data.items[0]);
                client.db.push("postedVideos", data.items[0].link);
                let parsed = client.db.fetch(`videoData`);
                let channel = client.channels.cache.get(client.youtube.channel);
                if (!channel) return;
                let message = client.youtube.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
                channel.send(message);
            }
        });
    }, client.youtube.watchInterval);
}
client.on("ready", () => {
  handleUploads();
})
}
})
