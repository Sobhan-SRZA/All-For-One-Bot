const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord-player").GuildQueue} queue 
 * @returns
 */
module.exports = async (client, queue) => {
  try {
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setColor(queue.guild.members.me.displayHexColor)
      .setDescription(
        "Looks like my job here is done, leaving now."
      );

    return await queue.metadata.channel.send({ embeds: [embed] });
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