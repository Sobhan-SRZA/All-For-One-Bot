const {
    MessageEmbed
} = require('discord.js');
var clc = require("cli-color");
module.exports = async (client, guild) => {
    const channel = client.channels.cache.get(client.config.discord.server_channel_status);
    const inviteCH = client.channels.cache.get(guild.rulesChannelID);
        let invite = await inviteCH.createInvite({
            maxAge: 0, 
            maxUses: 5
        }, )
    const embed = new MessageEmbed()
    .setAuthor({name:client.user.tag,iconURL:client.user.displayAvatarURL()})
    .setDescription(` Man Az Servere **${guild.name}** Kick Shodam Va Tedad Server Hayi Ke Joinam Be Tedad: \`${client.guilds.cache.size}\` Ast`)
    .addField(`👑| Ownere Server: ` ,` tage owner: \` ${guild.owner.tag}\``,true)
    .addField(`📬| Invite Server: ` ,` linke invite server:  **${invite}**`,true)
    .addField(`🗿| ID Server: ` ,` id server: \` ${guild.id}\``,true)
    .setColor("#2F3136")
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setTimestamp(Date.now())

    channel.send({embeds:[embed]})
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */