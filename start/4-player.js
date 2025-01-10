const fs = require('fs');
const Discord = require('discord.js');
var clc = require("cli-color");
module.exports = async (client) => {
client.player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    let embed = new Discord.MessageEmbed()
  .setImage(track.thumbnail)
  .setTitle(`🎵| Playing Your Music`)
  .setTimestamp()
  .setThumbnail(client.user.displayAvatarURL({ size:4096 , dynamic: true }))
  .setDescription(`**${client.emotes.music}**| Now playing \`${track.title}\`**\n Channel: **<#${queue.connection.channel.id}>** 🎧`)
  .setColor("#2F3136")
  .setFooter({text:`Requsted By ${queue.author.tag}`,iconURL:queue.author.displayAvatarURL({ size:4096 , dynamic: true })})
  queue.metadata.send({embeds:[embed]})
});
client.player.on('trackAdd', (queue, track) => {
    let embed = new Discord.MessageEmbed()
    .setImage(track.thumbnail)
    .setTitle(`🎙| Your Music Added To The Queue`)
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL({ size:4096 , dynamic: true }))
    .setDescription(`${client.emotes.music}| **\`${track.title}\` ♻ has been added to the queue :)**`)
    .setColor("#2F3136")
    .setFooter({text:`Requsted By ${queue.author.tag}`,iconURL:queue.author.displayAvatarURL({ size:4096 , dynamic: true })})
    queue.metadata.send({embeds:[embed]})
});
client.player.on('botDisconnect', (queue) => {
    queue.metadata.send({ content: 'Someone from the audio channel Im connected to kicked me out, the whole playlist has been cleared! ❌' });
});
client.player.on('channelEmpty', (queue) => {
    queue.metadata.send({ content: 'I left the audio channel because there is no one on my audio channel. ❌' });
});
client.player.on('queueEnd', (queue) => {
    queue.metadata.send({ content: 'All play queue finished, I think you can listen to some more music. ✅' });
});
try {
    const stringlength = 69;
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                    Player Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                    Player Is Loaded!!`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/