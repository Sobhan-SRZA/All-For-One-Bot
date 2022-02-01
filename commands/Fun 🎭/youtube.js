const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'youtube',
    aliases: ['yt'],
    category: 'Fun',
    description: "IMAGE CMD",
    utilisation: '{prefix}youtube @User [ Text ]',


  async execute(client, message, args) { 
    
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        try {
      if(client.user.id === Member.id){
  return message.reply('Hoi Man Petet Nistam😡')

}else
  if(message.author.id === Member.id){
  return message.reply('Mikhai Khodeto Pet Koni?! 😂')

}else
            return message.channel.send(new (require("discord.js")).MessageAttachment(encodeURI(`https://api.monkedev.com/canvas/petpet?imgUrl=${Member.user.displayAvatarURL({ format: "png" })}`), "Petpat.gif"));
        } catch (_) {
            console.log(_);
            return message.channel.send("Unable To Generate Petpat Or Something Went Wrong!");
 
    }
      
  }
}
