const {
  EmbedBuilder,
  ChannelType,
  WebhookClient
} = require('discord.js');
const error = require('../../functions/error');

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Guild} guild 
 * @returns 
 */
module.exports = async (client, guild) => {
  try {
    const webhook = new WebhookClient({ url: client.config.webhook.url });
    const invite = await guild.channels.cache.filter(x => x.type === ChannelType.GuildText && x.viewable).random(1)[0].createInvite({
      maxAge: 0
    });
    const owner = await guild.fetchOwner();
    const embed = new EmbedBuilder()
      .setAuthor({
        name: owner.user.tag,
        iconURL: owner.user.displayAvatarURL({ dynamic: true })
      })
      .setDescription(`New guild added - Total guilds number is \`${client.guilds.cache.size}\``)
      .addFields([{
        name: `👑| Owner: `,
        value: `<:reply:1099703652333142088> **\`${owner.user}\` | \`${owner.user.tag}\` | \`${owner.user.id}\`**`,
        inline: false
      }, {
        name: `📬| Guild: `,
        value: `<:reply:1099703652333142088> **${invite ? `[${guild.name}](${invite.url})` : `${guild.name}`} | \`${guild.id}\` | \`${guild.memberCount}\` Members**`,
        inline: false
      }, {
        name: `📅| Created at:`,
        value: `<:reply:1099703652333142088> **<t:${Date.parse(guild.createdAt) / 1000}:D> | <t:${Date.parse(guild.createdAt) / 1000}:R>**`,
        inline: false
      }])
      .setColor("DarkAqua")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setFooter({
        text: client.user.tag,
        iconURL: client.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp(Date.now());

    return webhook.send({
      embeds: [embed],
      username: client.config.webhook.username,
      avatarURL: client.config.webhook.avatar
    });
  } catch (e) {
    error(e)
  }
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