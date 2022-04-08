const Discord = require('discord.js');
module.exports = (client, message, track) => {
let embed = new Discord.MessageEmbed()
  .setImage(track.thumbnail)
  .setTitle(`🎵| Playing Your Music`)
  .setTimestamp()
  .setThumbnail(client.user.displayAvatarURL({ size:4096 , dynamic: true }))
  .setDescription(`**${client.emotes.music}**| Now playing **${track.title}**`)
  .setColor("#2F3136")
  .setFooter(`Requsted By ${message.author.tag}`,message.author.displayAvatarURL({ size:4096 , dynamic: true }))
  message.channel.send(embed)
}