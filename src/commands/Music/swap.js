const { ApplicationCommandOptionType, ApplicationCommandType } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  name: "swap",
  description: "Swap two tracks in the queue",
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
      name: "first",
      description: "The first track to swap",
      type: ApplicationCommandOptionType.Number,
      required: true
    },
    {
      name: "second",
      description: "The second track to swap",
      type: ApplicationCommandOptionType.Number,
      required: true
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

    if (queue.size < 3)
      return interaction.reply("Need at least 3 songs in the queue to use this command.");

    const first = interaction.options.getNumber("first", true);
    const second = interaction.options.getNumber("second", true);

    if (first < 1 || first >= queue.size)
      return interaction.reply("Provided `first` track index is not valid.");

    if (second < 1 || second >= queue.size)
      return interaction.reply("Provided `second` track index is not valid.");

    if (first === second)
      return interaction.reply("The tracks are already in this position.");

    queue.node.swap(first, second);

    return interaction.reply(`Track ${first} & ${second} has been swapped.`);
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