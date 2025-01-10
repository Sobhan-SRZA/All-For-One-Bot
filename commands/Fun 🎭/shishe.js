const Discord = require("discord.js");
module.exports = {
    name: 'shishe',
    aliases: ['poshte-shishe','glass'],
    category: 'Fun 🎭 | Image',
    description: "set user avatar to glass meme.",
    usage: "[name | nickname | mention | ID]",  

  async execute(client, message, args) { 
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let Data = new Discord.MessageEmbed()
      .setImage(`https://some-random-api.ml/canvas/glass?avatar=${Member.user.displayAvatarURL({ format: "png" , size: 4096 })}`)
      .setColor("RANDOM")
      .setTitle(`Glass 👻`)
      .setAuthor(`This Human Onder Glass ${Member.user.tag}👻`,Member.user.displayAvatarURL())
      .setFooter(`Requested  By ${message.author.tag} | Created By Mr.SIN RE#1528 `,message.author.displayAvatarURL())
      .setTimestamp()
    
    message.channel.send(Data);
  
 }
};