const {
    MessageEmbed
} = require('discord.js');
var clc = require("cli-color");
module.exports = async (client) => {
client.on("guildDelete",async guild => {
    const channel = client.channels.cache.get(client.config.discord.server_channel_status);
    const inviteCH = client.channels.cache.get(guild.rulesChannelID);
        let invite = await inviteCH.createInvite({
            maxAge: 0, 
            maxUses: 5
        }, )
    const embed = new MessageEmbed()
    .setAuthor(client.user.tag,client.user.displayAvatarURL())
    .setDescription(` Man Az Servere **${guild.name}** Kick Shodam Va Tedad Server Hayi Ke Joinam Be Tedad: \`${client.guilds.cache.size}\` Ast`)
    .addField(`👑| Ownere Server: ` ,` tage owner: \` ${guild.owner.tag}\``,true)
    .addField(`📬| Invite Server: ` ,` linke invite server:  **${invite}**`,true)
    .addField(`🗿| ID Server: ` ,` id server: \` ${guild.id}\``,true)
    .setColor("#2F3136")
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setTimestamp(Date.now())

    channel.send(embed)
  })
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