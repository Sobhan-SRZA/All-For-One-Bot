module.exports = {
      name: "pvideo",
      description: "This command will return porn in gif form.",
    aliases: ['pvid','pv'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}pvideo',
  async execute(client, message, args) { 

    let loadingMessage = await message.channel.send(`**Loading <a:loading_message:939869115143819265>**`)

    const blacklist = ["loli", "shota", "cub", "young", "child", "baby", "guro", "gore", "vore"];

    if (args.length !== 0) {
      if (args.some(t => blacklist.includes(t.toLowerCase()))) return loadingMessage.edit(`${message.author} \`|📛|\` Blacklisted word found, aborting...`);
    }
    const pSearch = require("pornsearch");
    const search = new pSearch(args.join(" "));
    const videos = await search.videos();
    const video = videos.random();
    const Discord = require('discord.js')
    let pornEmbed = new Discord.MessageEmbed()
       .setTitle(video.title)
       .setURL(video.url)
       .setColor("RANDOM")
       .setImage(video.thumb)
       .setFooter(`Length: ${video.duration} | Requested by ${message.author.tag}`,message.author.displayAvatarURL({ format: "png" }))
    await loadingMessage.edit(pornEmbed);
    
  }
}