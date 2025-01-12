const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const error = require("../../functions/error");
const playerDescription = require("../../functions/playerDescription");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord-player").GuildQueue} queue 
 * @param {import("discord-player").Track} track 
 * @returns
 */
module.exports = async (client, queue, track) => {
  try {
    await queue.channel.sendTyping();
    if (!track?.requestedBy) track.requestedBy = queue.metadata.author;

    const embed = new EmbedBuilder()
      .setTitle(track.title)
      .setURL(track.url)
      .setFields(
        [
          {
            name: `Music From:`,
            value: `**${track.author}**`
          },
          {
            name: `Duration:`,
            value: `**${track.duration}**`
          }
        ]
      )
      .setColor(queue.guild.members.me.displayHexColor)
      .setDescription(await playerDescription(queue))
      .setTimestamp();

    if (track.thumbnail)
      embed.setThumbnail(track.thumbnail);

    const raw = [
      new ActionRowBuilder()
        .addComponents(
          [
            new ButtonBuilder()
              .setCustomId("music-volumDown")
              .setEmoji("🔈")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("music-lastTrack")
              .setEmoji("⏮️")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("music-pause")
              .setEmoji("⏸️")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("music-nextTrack")
              .setEmoji("⏭️")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("music-volumUp")
              .setEmoji("🔊")
              .setStyle(ButtonStyle.Secondary)
          ]
        ),
      new ActionRowBuilder()
        .addComponents(
          [
            new ButtonBuilder()
              .setCustomId("music-shuffle")
              .setEmoji("🔀")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("music-seekBack")
              .setEmoji("⏪")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("music-stop")
              .setEmoji("❌")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("music-seekNext")
              .setEmoji("⏩")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("music-loop")
              .setEmoji("🔄")
              .setStyle(ButtonStyle.Secondary)
          ]
        )
    ];

    return await queue.metadata.channel.send({ embeds: [embed], components: raw }).then(a => queue.metadata.message = a).catch(error);
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