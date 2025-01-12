const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { lyricsExtractor } = require("@discord-player/extractor");
const lyricsFinder = lyricsExtractor();
const { useQueue } = require("discord-player");
const error = require("../../functions/error");
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
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.reply({
        content: "I’m currently not playing in this server.",
        ephemeral: true
      });

    const memberChannelId = interaction.member?.voice?.channelId;
    const queueChannelId = queue?.channel.id;
    if (!memberChannelId)
      return interaction.reply({
        content: "You need to join a voice channel first!",
        ephemeral: true
      });

    if (memberChannelId !== queueChannelId)
      return interaction.reply({
        content: "You must be in the same voice channel as me!",
        ephemeral: true
      });

    const query = interaction.options.getString("query", false) ?? queue?.currentTrack?.title;

    if (!query) return interaction.reply("You forgot to provide the track name.");

    const queryFormated = query
      .toLowerCase()
      .replace(
        /\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g,
        ""
      );

    const result = await lyricsFinder.search(queryFormated).catch(() => null);

    if (!result || !result.lyrics)
      return interaction.reply("No lyrics were found for this track.");

    const lyrics =
      result.lyrics.length > 4096 ? `${result.lyrics.slice(0, 4090)}...` : result.lyrics;

    const embed = new EmbedBuilder()
      .setTitle(result.title)
      .setURL(result.url)
      .setThumbnail(result.thumbnail)
      .setAuthor({
        name: result.artist.name,
        iconURL: result.artist.image,
        url: result.artist.url
      })
      .setDescription(lyrics);

    return interaction.reply({ embeds: [embed] }).catch(error);
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