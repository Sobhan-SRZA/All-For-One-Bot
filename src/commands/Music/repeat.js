/* eslint-disable no-case-declarations */
const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { QueueRepeatMode, useQueue } = require("discord-player");
const error = require("../../functions/error");
module.exports = {
  name: "repeat",
  description: "Set repeat mode for the queue",
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
      type: ApplicationCommandOptionType.Subcommand,
      name: "show",
      description: "Show current repeat mode status."
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "off",
      description: "Default mode with no loop active"
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "queue",
      description: "Loop the current queue"
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "track",
      description: "Repeat the current track"
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "autoplay",
      description: "Play related songs automatically based on your existing queue"
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

    let description;
    switch (interaction.options.getSubcommand()) {
      case "off":
        queue.setRepeatMode(QueueRepeatMode.OFF);
        description = "Turned off repeat mode.";
        break;
      case "track":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
        description = "Looping the current track.";
        break;
      case "queue":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        description = "Looing the current queue.";
        break;
      case "autoplay":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
        description = "Autoplay mode activated.";
        break;
      // case "show":
      default:
        let status = "none";
        if (queue.repeatMode === 3) {
          status = "autoplay";
        } else if (queue.repeatMode === 2) {
          status = "queue";
        } else if (queue.repeatMode === 1) {
          status = "track";
        } else if (queue.repeatMode === 0) {
          status = "off";
        }

        const embed = new EmbedBuilder()
          .setDescription(`Playback repeat status: \`${status}\`.`)
          .setFooter({ text: `Use '/repeat <off|track|queue|autoplay>' to change repeat mode.` });

        return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(error);
    }

    return interaction.reply({
      embeds: [new EmbedBuilder().setDescription(description)],
    });
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