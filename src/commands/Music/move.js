const { ApplicationCommandOptionType, ApplicationCommandType } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  name: "move",
  description: "Move a track in the queue",
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
      name: "from",
      description: "The track to move.",
      type: ApplicationCommandOptionType.Number,
      required: true
    },
    {
      name: "to",
      description: "The position to move to.",
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

    const from = interaction.options.getNumber("from", true);
    const to = interaction.options.getNumber("to", true);

    if (from < 1 || from >= queue.size)
      return interaction.reply("Provided `from` index is not valid.");

    if (to < 1 || to >= queue.size)
      return interaction.reply("Provided `to` position is not valid.");

    if (from === to)
      return interaction.reply("The track is already in this position.");

    queue.node.move(from, to);

    return interaction.reply(`The track is moved to the position ${to}.`);
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