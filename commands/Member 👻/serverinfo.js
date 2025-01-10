const {
  MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'serverinfo',
    description: "send a info about server.",
    aliases: ['sinfo','server'],
    category: 'Member 👻',
    cooldown: 5,
    usage: '',
  async execute(client, message, args) { 

  if (message.guild.verificationLevel === "NONE"){
    verification = "0";
  }else if (message.guild.verificationLevel === "LOW"){ 
    verification = "1";
  }else if (message.guild.verificationLevel === "MEDIUM"){
    verification = "2";
   }else if (message.guild.verificationLevel === "HIGH"){
    verification = "3";
    }else if (message.guild.verificationLevel === "VERY_HIGH"){
      verification = "4";
      }

var rulesChannelID;    
if(message.guild.rulesChannelID === null){
var rulesChannelID = "**Don't Have Rules Channel :)**";
}else{
var rulesChannelID = `<#${message.guild.rulesChannelID}>`; 
}
var afkChannelID;
if(message.guild.afkChannelID === null){
var afkChannelID = "**Don't Have AFK Voice Channel :)**";
}else{
var afkChannelID = `<#${message.guild.afkChannelID}>`;
}
let boosts = message.guild.premiumSubscriptionCount;
var boostlevel = 0;
if (boosts >= 2) boostlevel = "1";
if (boosts >= 15) boostlevel = "2";
if (boosts >= 30) boostlevel = "3 / ∞";
let maxbitrate = 96000;
if (boosts >= 2) maxbitrate = 128000;
if (boosts >= 15) maxbitrate = 256000;
if (boosts >= 30) maxbitrate = 384000;
function epoch (date) {
  return Date.parse(date)
}
const dateToday = message.guild.createdAt; 
const ServerCreatedAt = epoch(dateToday) / 1000;
let embed = new MessageEmbed()
    .setTimestamp()
    .setTitle(client.emotes.info + "| **Server Information**")
    .setColor(client.colors.none)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField(`🎫| Name of Server:`, `${client.emotes.reply}**${message.guild.name}**`, true)
    .addField(`🆔| ID of Server:`, `${client.emotes.reply}**${message.guild.id}**`, true)
    .addField(`📅| Created at:`, `${client.emotes.reply}**<t:${ServerCreatedAt}:R>**`, true)
    .addField(`👑| Owner of Server:`,`${client.emotes.reply}${message.guild.owner}`, true)  
    .addField(`🗺| Region of Server:`, `${client.emotes.reply}${message.guild.region}`, true)
    .addField(`👥| Total Members:`, `${client.emotes.reply}${message.guild.members.cache.size}`, true)
    .addField(`🤖| Total Bots:`, `${client.emotes.reply}${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
    .addField(`🚶| Total Humans:`, `${client.emotes.reply}${message.guild.members.cache.filter(member => !member.user.bot).size}`, true)
    .addField("🟢| ONLINE Users", `${client.emotes.reply}\``+ message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
    .addField("⚫| OFFLINE Users", `${client.emotes.reply}\`` + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)
    .addField(`😗| [${message.guild.emojis.cache.size}] Emojis:`, `${client.emotes.reply}\`` + message.guild.emojis.cache.size < 20 ? message.guild.emojis.cache.map(emoji => `${emoji}`).join(", ") : message.guild.emojis.cache.size > 20 ? emojitrimarray(message.guild.emojis.cache.map(emoji => `${emoji}`)).substr(0, 1024) : 'No Emojis',true)
    .addField(`👻| Emojis Animated:`,`${client.emotes.reply}${message.guild.emojis.cache.filter(emoji => emoji.animated).size}`,true )
    .addField(`📖| All Channel:`, `${client.emotes.reply}${message.guild.channels.cache.size}`, true)
    .addField(`💬| Channel of text:`, `${client.emotes.reply}${message.guild.channels.cache.filter(channel => channel.type === 'text').size}`, true)
    .addField(`🔊| Channel of voice:`, `${client.emotes.reply}${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`, true)
    .addField(`🎤| Voice Joined Count:`, `${client.emotes.reply}${message.guild.voiceStates.cache.size}`, true)    
    .addField(`💻| Verification Level:`, `${client.emotes.reply}${verification}` , true)
    .addField(`✨| Server Total Boosts:`, `${client.emotes.reply}${boosts}`, true)
    .addField(`🎊| Server Boosts Level:`, `${client.emotes.reply}${boostlevel}`, true)
    .addField(`🎚| Max Talk Bitrate:`, `${client.emotes.reply}${maxbitrate} kbps`, true)    
    .addField(`👔| [${message.guild.roles.cache.size}] Roles: `, `${client.emotes.reply}` + message.guild.roles.cache.size < 25 ? message.guild.roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : message.guild.roles.cache.size > 25 ? trimArray(message.guild.roles.cache) : 'None', true)
    .addField(`🗿| Spaictiol Channel: `,`${client.emotes.reply}Rules: ${rulesChannelID} | AFK Channel: ${afkChannelID}`)
    .setAuthor({
      name: message.author.username, 
      iconURL: message.author.displayAvatarURL({dynamic: true, format: 'png'})
    })
        message.reply({
            embeds: [embed]
        });    
  }
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