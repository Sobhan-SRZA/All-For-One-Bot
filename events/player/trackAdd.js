const Discord = require('discord.js');
module.exports = (client, message, queue, track) => {
  let embed = new Discord.MessageEmbed()
    .setImage(track.thumbnail)
    .setTitle(`🎙| Your Music Added To The Queue`)
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL({ size: 4096, dynamic: true }))
    .setDescription(`${client.emotes.music}| **${track.title}** ♻ has been added to the queue :)`)
    .setColor("#2F3136")
    .setFooter(`Requsted By ${message.author.tag}`, message.author.displayAvatarURL({ size: 4096, dynamic: true }))
  message.channel.send(embed)
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */