const {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder
} = require("discord.js");
const {
  useQueue,
  QueueRepeatMode,
  useHistory
} = require("discord-player");
const error = require("../../functions/error");
const playerDescription = require("../../functions/playerDescription");
const editButtonIdEmote = require("../../functions/editButtonIdEmote");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").ButtonInteraction} interaction 
 * @returns 
 */
module.exports = async (client, interaction) => {
  try {
    const db = client.db;
    if (!interaction.isButton()) return;

    const [prefix, id] = interaction.customId.split("-");
    if (prefix !== "music") return;

    const queue = useQueue(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    if (!channel) {
      await interaction.deferReply({ ephemeral: true });
      return await interaction.editReply(`Please join voice channel OwO`);
    };

    switch (id) {
      case "volumDown": {
        await interaction.deferUpdate({ fetchReply: true });
        if (queue.node.volume <= 1);
        else {
          const volume = queue.node.volume - 5;
          queue.node.setVolume(volume);
          const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
          return await interaction.editReply({
            embeds: [embed]
          });
        }
        break;
      }

      case "lastTrack": {
        const history = useHistory(interaction.guildId);
        history.previous().catch(async () => {
          await interaction.deferReply({
            ephemeral: true
          });
          return await interaction.editReply({
            content: "No track to back to it."
          })
        });
        await interaction.deferUpdate({ fetchReply: true });
        const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
        return await interaction.editReply({
          embeds: [embed]
        });
        break;
      }

      case "play": {
        const newActionRowEmbeds = await editButtonIdEmote(interaction, "music-pause", "⏸️");
        queue.node.resume();
        await interaction.deferUpdate({ fetchReply: true });
        const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
        return await interaction.editReply({
          embeds: [embed],
          components: newActionRowEmbeds
        });
        break;
      }

      case "pause": {
        const newActionRowEmbeds = await editButtonIdEmote(interaction, "music-play", "▶️");
        queue.node.pause();
        await interaction.deferUpdate({ fetchReply: true });
        const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
        return await interaction.editReply({
          embeds: [embed],
          components: newActionRowEmbeds
        });
        break;
      }

      case "nextTrack": {
        queue.node.skip();
        await interaction.deferUpdate({ fetchReply: true });
        const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
        return await interaction.editReply({
          embeds: [embed]
        });
        break;
      }

      case "volumUp": {
        await interaction.deferUpdate({ fetchReply: true });
        if (queue.node.volume >= 100);
        else {
          const volume = queue.node.volume + 5;
          queue.node.setVolume(volume);
          const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
          return await interaction.editReply({
            embeds: [embed]
          });
        }
        break;
      }

      case "shuffle": {
        if (queue.isShuffling) queue.disableShuffle();
        else queue.enableShuffle();
        await interaction.deferUpdate({ fetchReply: true });
        const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
        return await interaction.editReply({
          embeds: [embed]
        });
        break;
      }

      case "seekBack": {
        queue.node.seek(queue.node.streamTime - 5000);
        await interaction.deferUpdate({ fetchReply: true });
        const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
        return await interaction.editReply({
          embeds: [embed]
        });
        break;
      }

      case "stop": {
        queue.node.stop();
        await interaction.deferUpdate({ fetchReply: true });
        return await interaction.editReply({
          components: []
        });
        break;
      }

      case "seekNext": {
        queue.node.seek(queue.node.streamTime + 5000);
        await interaction.deferUpdate({ fetchReply: true });
        const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
        return await interaction.editReply({
          embeds: [embed]
        });
        break;
      }

      case "loop": {
        await interaction.deferUpdate({ fetchReply: true });
        if (queue.repeatMode === QueueRepeatMode.QUEUE)
          queue.setRepeatMode(QueueRepeatMode.TRACK);

        else if (queue.repeatMode === QueueRepeatMode.TRACK)
          queue.setRepeatMode(QueueRepeatMode.OFF);
        else
          queue.setRepeatMode(QueueRepeatMode.QUEUE);

        const embed = new EmbedBuilder(interaction.message.embeds[0]).setDescription(await playerDescription(queue));
        return await interaction.editReply({
          embeds: [embed]
        });
        break;
      }
    }
  } catch (e) {
    error(e);
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