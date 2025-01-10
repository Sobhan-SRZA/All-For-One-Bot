const Discord = require("discord.js");
module.exports = {
    name: 'rafigh',
    aliases: ['dost','comrade'],
    category: 'Fun 🎭 | Image',
    description: "set user avatar to comrade meme.",
    usage: "[name | nickname | mention | ID]",  

  async execute(client, message, args) { 
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let Data = new Discord.MessageEmbed()
      .setImage(`https://some-random-api.ml/canvas/comrade?avatar=${Member.user.displayAvatarURL({ format: "png" , size: 4096 })}`)
      .setColor("RANDOM")
      .setTitle(`Comrade 🫂`)
      .setAuthor(`This Human ${Member.user.tag} Is Comrade With **${message.author.tag}** 🫂`,Member.user.displayAvatarURL())
      .setFooter(`Requested  By ${message.author.tag} | Created By Mr.SIN RE#1528 `,message.author.displayAvatarURL())
      .setTimestamp()
    
    let DataAuthor = new Discord.MessageEmbed()
      .setImage(`https://some-random-api.ml/canvas/comrade?avatar=${Member.user.displayAvatarURL({ format: "png" , size: 4096 })}`)
      .setColor("RANDOM")
      .setTitle(`Comrade 🫂`)
      .setAuthor(`This Human ${Member.user.tag} Is Comrade With **Him Self** 🫂`,Member.user.displayAvatarURL())
      .setFooter(`Requested  By ${message.author.tag} | Created By Mr.SIN RE#1528 `,message.author.displayAvatarURL())
      .setTimestamp()

  if(Member === message.author) return message.channel.send(DataAuthor)
  if(!Member){
    return message.channel.send(`${client.emotes.error} | Please Mention Someone!`)
  }else
    message.channel.send(Data);
  
 }
};

