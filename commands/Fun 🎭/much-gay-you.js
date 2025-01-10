const Discord = require('discord.js')
module.exports = {
    name: 'muchgayyou',
    aliases: ['gs','gaysanj'],
    category: 'Fun 🎭 | Minigame',
    usage: "[name | nickname | mention | ID]",
    description:'send how gay are you in channel',

  async execute(client, message, args) { 
   //     message.channel.startTyping();
  const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const alpha = Math.floor(Math.random() * 100) + 1 ;
      if (Number(alpha) > 1) sanjesh = "(1/10) ▰▱▱▱▱▱▱▱▱▱";
      if (Number(alpha) > 9) sanjesh = "(1/10) ▰▱▱▱▱▱▱▱▱▱";
      if (Number(alpha) > 19) sanjesh = "(2/10) ▰▰▱▱▱▱▱▱▱▱";
      if (Number(alpha) > 29) sanjesh = "(3/10) ▰▰▰▱▱▱▱▱▱▱";
      if (Number(alpha) > 39) sanjesh = "(4/10) ▰▰▰▰▱▱▱▱▱▱";
      if (Number(alpha) > 49) sanjesh = "(5/10) ▰▰▰▰▰▱▱▱▱▱";
      if (Number(alpha) > 59) sanjesh = "(6/10) ▰▰▰▰▰▰▱▱▱▱";
      if (Number(alpha) > 69) sanjesh = "(7/10) ▰▰▰▰▰▰▰▱▱▱";
      if (Number(alpha) > 79) sanjesh = "(8/10) ▰▰▰▰▰▰▰▰▱▱";
      if (Number(alpha) > 89) sanjesh = "(9/10) ▰▰▰▰▰▰▰▰▰▱";
      if (Number(alpha) > 99) sanjesh = "(10/10) ▰▰▰▰▰▰▰▰▰▰";
      if (message.author.bot) return;
  const gayembed = new Discord.MessageEmbed()
     .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
     .setThumbnail(`https://some-random-api.ml/canvas/gay?avatar=${Member.user.displayAvatarURL({ format: "png" , size: 1024 })}`)
      .setTimestamp()
      .setColor('RANDOM')   
      .addField(` میزان گی بودن شما  **${alpha}%** <a:qer:914468879546347541>است <a:hehe:914470000092414012>`,`[${sanjesh}](${"https://discord.gg/5GYNec4urW"})`)   
return message.channel.send(gayembed)/*.then(embedMessage => { 
    message.channel.stopTyping(); 
   }) */
      message.react('🌈')
  }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */