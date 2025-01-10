const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord-player").GuildQueue} queue 
 * @param {Error} e 
 * @returns
 */
module.exports = async (client, queue, e) => {
  try {
    if (!track?.requestedBy) track.requestedBy = queue.metadata.author;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setColor(queue.guild.members.me.displayHexColor)
      .setTitle("An error occured while playing")
      .setFooter({
        text: `Requested by: ${track.requestedBy.tag}`,
        iconURL: track.requestedBy.displayAvatarURL({ dynamic: true }),
      });

    error(e);
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