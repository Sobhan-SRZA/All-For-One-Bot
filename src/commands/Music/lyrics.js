const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player");
const error = require("../../functions/error");
const response = require("../../functions/response");
module.exports = {
  name: "lyrics",
  description: "Get lyrics for a track.",
  category: "music",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks", "Connect", "Speak"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: true,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "query",
      description: "The track title to search lyrics",
      required: false
    }
  ],

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {Array<string>} args 
   * @returns 
   */
  run: async (client, interaction, args) => {
    const player = useMainPlayer();
    const queue = useQueue(interaction.guild.id);
    let query = interaction.user ? interaction.options.getString("query") : args.join(" ");
    if (!query) {
      if (!queue)
        return await response(interaction, {
          content: "I’m currently not playing in this server.",
          ephemeral: true
        });

      const memberChannelId = interaction.member?.voice?.channelId;
      const queueChannelId = queue?.channel.id;
      if (!memberChannelId)
        return await response(interaction, {
          content: "You need to join a voice channel first!",
          ephemeral: true
        });

      if (memberChannelId !== queueChannelId)
        return await response(interaction, {
          content: "You must be in the same voice channel as me!",
          ephemeral: true
        });

      query = queue?.currentTrack?.title;
    }

    if (!query)
      return await response(interaction, "You forgot to provide the track name.");

    const queryFormated = query
      .toLowerCase()
      .replace(
        /\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g,
        ""
      );

    const result = (await player.lyrics.search({ q: queryFormated }).catch(() => null))[0];
    if (!result || !result.syncedLyrics)
      return await response(interaction, "No lyrics were found for this track.");

    const lyrics =
      result.plainLyrics.length > 4096 ? `${result.plainLyrics.slice(0, 4090)} ...` : result.plainLyrics;

    const embed = new EmbedBuilder()
      .setTitle(result.trackName)
      .setAuthor({
        name: result.artistName
      })
      .setDescription(lyrics);

    return await response(interaction, { embeds: [embed] }).catch(error);
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