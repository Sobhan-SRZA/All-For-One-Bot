const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const error = require("../../functions/error");
module.exports = {
  name: "nowplaying",
  description: "Show the currently playing track.",
  category: "music",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks", "Connect", "Speak"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: true,

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

    const track = queue.currentTrack;

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Now playing" })
      .setTitle(`${track.title}`)
      .setURL(`${track.url}`)
      .setThumbnail(`${track.thumbnail}`)
      .setImage('https://message.style/cdn/images/e86348384e1e3d4bb9018573a6573c8eea1fd665a88128725d051a51ee358904.png')
      .setDescription(`Played by: ${track.requestedBy.toString()}\n
${queue.node.createProgressBar()}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(error);
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