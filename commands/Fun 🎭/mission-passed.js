const Discord = require("discord.js");
module.exports = {
    name: 'missionpassed',
    aliases: ['passed','misp'],
    category: 'Fun 🎭 | Image',
    description: "set user avatar to Mission Passed meme.",
    usage: "[name | nickname | mention | ID]",  

  async execute(client, message, args) { 
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let Data = new Discord.MessageEmbed()
      .setImage(`https://some-random-api.ml/canvas/passed?avatar=${Member.user.displayAvatarURL({ format: "png" , size: 4096 })}`)
      .setColor("RANDOM")
      .setTitle(`Mission Passed ${client.emotes.success}`)
      .setAuthor(`This Human ${Member.user.tag} Is Mission Passed ${client.emotes.success}`,Member.user.displayAvatarURL())
      .setFooter(`Requested  By ${message.author.tag} | Created By Mr.SIN RE#1528 `,message.author.displayAvatarURL())
      .setTimestamp()
/*
if(client.user.id === Member.id){
  return message.reply('Mano Mikhai Bokoshi😑 ?!')
}else
if(Member.id === message.author.id){
  return message.reply('Hoi Mikhai Khodeto Bokoshi😳 ?!')
}else
*/
     message.channel.send(Data);
  
 }
};

