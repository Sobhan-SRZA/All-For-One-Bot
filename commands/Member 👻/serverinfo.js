const Discord = require('discord.js');
module.exports = {
    name: 'serverinfo',
    description: "send a info about server.",
    aliases: ['sinfo','server'],
    category: 'Member 👻',
    cooldown: 5,
    utilisation: '{prefix}serverinfo',
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
var rulesChannelID = "**nadarid :)**";
}else{
var rulesChannelID = `<#${message.guild.rulesChannelID}>`; 
}
var afkChannelID;
if(message.guild.afkChannelID === null){
var afkChannelID = "**nadarid :)**";
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
let embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle("**Server Information**")
    .setColor('RANDOM')
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField(`🎫| Name of Server:`, `<:reply_desgine:950701730675445790>**${message.guild.name}**`, true)
    .addField(`🆔| ID of Server:`, `<:reply_desgine:950701730675445790>**${message.guild.id}**`, true)
    .addField(`📅| Created at:`, `<:reply_desgine:950701730675445790>**<t:${ServerCreatedAt}:R>**`, true)
    .addField(`👑| Owner of Server:`,`<:reply_desgine:950701730675445790>${message.guild.owner}`, true)  
    .addField(`🗺| Region of Server:`, `<:reply_desgine:950701730675445790>${message.guild.region}`, true)
    .addField(`👥| Total Members:`, `<:reply_desgine:950701730675445790>${message.guild.members.cache.size}`, true)
    .addField(`🤖| Total Bots:`, `<:reply_desgine:950701730675445790>${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
    .addField(`🚶| Total Humans:`, `<:reply_desgine:950701730675445790>${message.guild.members.cache.filter(member => !member.user.bot).size}`, true)
    .addField("🟢| ONLINE Users", "<:reply_desgine:950701730675445790>\`"+ message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
    .addField("⚫| OFFLINE Users", "<:reply_desgine:950701730675445790>\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)
    .addField(`😗| [${message.guild.emojis.cache.size}] Emojis:`, "<:reply_desgine:950701730675445790>"+message.guild.emojis.cache.size < 20 ? message.guild.emojis.cache.map(emoji => `${emoji}`).join(", ") : message.guild.emojis.cache.size > 20 ? emojitrimarray(message.guild.emojis.cache.map(emoji => `${emoji}`)).substr(0, 1024) : 'No Emojis',true)
    .addField(`👻| Emojis Animated:`,`<:reply_desgine:950701730675445790>${message.guild.emojis.cache.filter(emoji => emoji.animated).size}`,true )
    .addField(`📖| All Channel:`, `<:reply_desgine:950701730675445790>${message.guild.channels.cache.size}`, true)
    .addField(`💬| Channel of text:`, `<:reply_desgine:950701730675445790>${message.guild.channels.cache.filter(channel => channel.type === 'text').size}`, true)
    .addField(`🔊| Channel of voice:`, `<:reply_desgine:950701730675445790>${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`, true)
    .addField(`🎤| Voice Joined Count:`, `<:reply_desgine:950701730675445790>${message.guild.voiceStates.cache.size}`, true)    
    .addField(`💻| Verification Level:`, `<:reply_desgine:950701730675445790>${verification}` , true)
    .addField(`✨| Server Total Boosts:`, `<:reply_desgine:950701730675445790>${boosts}`, true)
    .addField(`🎊| Server Boosts Level:`, `<:reply_desgine:950701730675445790>${boostlevel}`, true)
    .addField(`🎚| Max Talk Bitrate:`, `<:reply_desgine:950701730675445790>${maxbitrate} kbps`, true)    
    .addField(`👔| [${message.guild.roles.cache.size}] Roles: `, "<:reply_desgine:950701730675445790>"+message.guild.roles.cache.size < 25 ? message.guild.roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : message.guild.roles.cache.size > 25 ? trimArray(message.guild.roles.cache) : 'None', true)
    .addField(`🗿| Spaictiol Channel: `,`<:reply_desgine:950701730675445790>Rules: ${rulesChannelID} | AFK Channel: ${afkChannelID}`)
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, format: 'png'}))
        message.channel.send(embed);    
    }
}