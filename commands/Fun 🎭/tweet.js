const {
   MessageEmbed, 
   MessageAttachment 
} = require("discord.js");

module.exports = {
    name: 'tweet',
    aliases: ['tw','twe'],
    category: 'Fun 🎭 | Image',
    description: "tweet your text.",
    usage: "[text]",  
  async execute(client, message, args) { 
        try {
    if (!args[0]) return message.reply("لطفا متن مورد نظر خودتون رو بنویسید");
     let comment = args.slice().join(" ");
            return message.channel.send(new MessageAttachment(encodeURI(`https://some-random-api.ml/canvas/tweet?username=${message.author.username}&comment=${comment}&avatar=${message.author.displayAvatarURL({ format: "png" })}&displayname=${message.member.displayName}`),"tweet-SizarTeam.png"));
          
        } catch (_) {
            console.log(_);
            return message.channel.send("Nashod commente youtubet ro ok konam🙁");
 
    }
  
      
  }
}
