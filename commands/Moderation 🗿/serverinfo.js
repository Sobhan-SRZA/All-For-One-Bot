const Discord = require('discord.js');
module.exports = {
    name: 'serverinfo',
    description: "this is a command",
    aliases: ['sinfo','server'],
    category: 'Moderation 🗿',
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
    .addField(`🎫 Name of Server:`, `<:reply_desgine:950701730675445790>**${message.guild.name}**`, true)
    .addField(`🆔 ID of Server:`, `<:reply_desgine:950701730675445790>**${message.guild.id}**`, true)
    .addField(`📅 Created at:`, `<:reply_desgine:950701730675445790>**<t:${ServerCreatedAt}:R>**`, true)
    .addField(`👑 Owner of Server:`,`<:reply_desgine:950701730675445790>${message.guild.owner}`, true)  
    .addField(`🗺 Region of Server:`, `<:reply_desgine:950701730675445790>${message.guild.region}`, true)
    .addField(`👥 Member total:`, `<:reply_desgine:950701730675445790>${message.guild.members.cache.size}`, true)
    .addField(`🤖 Bots:`, `<:reply_desgine:950701730675445790>${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
    .addField(`🚶 Humans:`, `<:reply_desgine:950701730675445790>${message.guild.members.cache.filter(member => !member.user.bot).size}`, true)
    .addField(`😗 Emojis:`, `<:reply_desgine:950701730675445790>${message.guild.emojis.cache.size}`, true)
    .addField(`👻 Emojis Animated:`,`<:reply_desgine:950701730675445790>${message.guild.emojis.cache.filter(emoji => emoji.animated).size}`,true )
    .addField(`💬 Channel of text:`, `<:reply_desgine:950701730675445790>${message.guild.channels.cache.filter(channel => channel.type === 'text').size}`, true)
    .addField(`🎤 Channel of voice:`, `<:reply_desgine:950701730675445790>${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`, true)
    .addField(`✨ Verification Level:`, `<:reply_desgine:950701730675445790>${verification}` , true)
    .addField(`🎊 Server Boosts:`, `<:reply_desgine:950701730675445790>${message.guild.premiumTier}`, true)
    .addField(`🎤 Voice Joined Count:`, `<:reply_desgine:950701730675445790>${message.guild.voiceStates.cache.size}`, true)    
    .addField(`👔 Roles:`, `<:reply_desgine:950701730675445790>${message.guild.roles.cache.size}`, true)
    .addField(`🗿 Spaictiol Channel: `,`<:reply_desgine:950701730675445790>Rules: ${rulesChannelID} | AFK Channel: ${afkChannelID}`)
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, format: 'png'}))
        message.channel.send(embed);    
    }
}