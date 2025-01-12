const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord-player").GuildQueue} queue 
 * @param {Array<import("discord-player").Track>} tracks 
 * @returns
 */
module.exports = async (client, queue, tracks) => {
  try {
    if (!tracks[0]?.requestedBy) tracks[0].requestedBy = queue.metadata.author;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setTitle(`${tracks.length} tracks queued.`)
      .setColor(queue.guild.members.me.displayHexColor)
      .setFooter({
        text: `Requested by: ${tracks[0].requestedBy.tag}`,
        iconURL: tracks[0].requestedBy.displayAvatarURL({ dynamic: true }),
      });

    return await queue.metadata.channel.send({ embeds: [embed] }).catch(error);
  } catch (e) {
    error(e)
  }
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