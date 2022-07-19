const Discord = require("discord.js");
module.exports = {
    name: 'triggered',
    aliases: ['jail','baes'],
    category: 'Fun 🎭',
    utilisation: '{prefix}triggered',


  async execute(client, message, args) { 
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let Data = new Discord.MessageEmbed()
      .setImage(`https://some-random-api.ml/canvas/triggered?avatar=${Member.user.displayAvatarURL({ format: "png" , size: 4096 })}`)
      .setColor("RANDOM")
      .setTitle(`Jailed ⚖`)
      .setAuthor(`This Human ${Member.user.tag} Is Jailed ⚖`,Member.user.displayAvatarURL())
      .setFooter(`Requested  By ${message.author.tag} | Created By Mr.SIN RE#1528 `,message.author.displayAvatarURL())
      .setTimestamp()

if(Member.id === client.user.id){
  return message.reply('Mano Mikhai Baes Kar Koni😑 ?!')
}else
if(Member.id === message.author.id){
  return message.reply('Hoi Mikhai Khodeto Baes Kar Koni😳 ?!')
}else
     message.channel.send(Data);
  
 }
};

