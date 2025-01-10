const {
  MessageAttachment,
  MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'petpat',
    aliases: ['pep','petpat','pet'],
    category: 'Fun 🎭 | Image',
    description: "set user avatar to pet meme.",
    usage: "[name | nickname | mention | ID]",
  async execute(client, message, args) { 
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        try {
      if(client.user.id === Member.id){
  return message.reply('Hoi Man Petet Nistam😡')

}else
  if(message.author.id === Member.id){
  return message.reply('Mikhai Khodeto Pet Koni?! 😂')

}else
            return message.channel.send(new MessageAttachment(encodeURI(`https://api.monkedev.com/canvas/petpet?imgUrl=${Member.user.displayAvatarURL({ format: "png" })}`), "Petpat.gif"));
        } catch (_) {
            console.log(_);
            return message.channel.send("Unable To Generate Petpat Or Something Went Wrong!");
 
    }
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