const Discord = require('discord.js');
module.exports = {
    name: '8ball',
    aliases: ['8b','ball'],
    category: 'Fun',
    utilisation: '{prefix}8ball',
  async execute(client, message, args) { 
      const replies = ["آره", "نه.", "اصلا", "حتما"];
      const  answer = Math.floor((Math.random() * replies.length));
      const question = args;
        let Embed = new Discord.MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`8ball :)`)
      .setTimestamp()
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter(`${message.author.tag} || Created By Mr.SIN RE#1528 :) |`, `${message.author.displayAvatarURL()}`)
      .setColor("RANDOM")
      .addField('Question',`*${question}*`,true)
      .addField('Answer',`**${replies[answer]}**`,true)
    
const choice = args[0];
  if (!choice){
 message.channel.send("عزیزم برای استفاده از کامند باید سوال بپرسی ازم")
} else
message.channel.send(Embed)
  }
}