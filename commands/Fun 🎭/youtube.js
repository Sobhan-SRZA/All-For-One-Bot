const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'youtube',
    aliases: ['yt'],
    category: 'Fun 🎭',
    description: "IMAGE CMD",
    utilisation: '{prefix}youtube @User [ Text ]',


  async execute(client, message, args) { 

        try {
    if (!args[0]) return message.reply("لطفا متن مورد نظر خودتون رو بنویسید");
          
     let comment = args.slice().join(" ");

            return message.channel.send(new (require("discord.js")).MessageAttachment(encodeURI(`https://some-random-api.ml/canvas/youtube-comment?username=${message.author.username}&comment=${comment}&avatar=${message.author.displayAvatarURL({ format: "png" })}&dark=true%E2%80%8B`),"youtube-comment-SizarTeam.png"));
        } catch (_) {
            console.log(_);
            return message.channel.send("Nashod commente youtubet ro ok konam🙁");
 
    }
      
  }
}
