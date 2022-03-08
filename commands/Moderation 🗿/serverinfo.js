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

let embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle("**Server Information**")
    .setColor('RANDOM')
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField(`🎫 Name of Server:`, `**${message.guild.name}**`, true)
    .addField(`🆔 ID of Server:`, `**${message.guild.id}**`, true)
    .addField(`📅 Created at:`, `${message.guild.joinedAt}`, true)
    .addField(`👑 Owner of Server:`,message.guild.owner, true)  
    .addField(`🗺 Region of Server:`, message.guild.region, true)
    .addField(`👥 Member total:`, message.guild.members.cache.size, true)
    .addField(`🤖 Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
    .addField(`🚶 Humans:`, message.guild.members.cache.filter(member => !member.user.bot).size, true)
    .addField(`😗 Emojis:`, message.guild.emojis.cache.size, true)
    .addField(`👻 Emojis Animated:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size,true )
    .addField(`💬 Channel of text:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
    .addField(`🎤 Channel of voice:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
    .addField(`✨ Verification Level:`, verification , true)
    .addField(`🎊 Server Boosts:`, message.guild.premiumTier, true)
    .addField(`🎤 Voice Joined Count:`, message.guild.voiceStates.cache.size, true)    
    .addField(`👔 Roles:`, message.guild.roles.cache.size, true)
    .addField(`🗿 Spaictiol Channel: `,`Rules: ${rulesChannelID} | AFK Channel: ${afkChannelID}`)
    .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png'}))
        message.channel.send(embed);    
    }
}