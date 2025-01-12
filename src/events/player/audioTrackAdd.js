const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord-player").GuildQueue} queue 
 * @param {import("discord-player").Track} track 
 * @returns
 */
module.exports = async (client, queue, track) => {
  try {
    if (!track?.requestedBy) track.requestedBy = queue.metadata.author;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Track queued - Position ${queue.node.getTrackPosition(track) + 1}` })
      .setTitle(`${track.title}`)
      .setURL(`${track.url}`)
      .setColor(queue.guild.members.me.displayHexColor)
      .setFooter({
        text: `Requested by: ${track.requestedBy.tag}`,
        iconURL: track.requestedBy.displayAvatarURL({ dynamic: true }),
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