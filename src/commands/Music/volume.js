const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  name: "volume",
  description: "Check or change the volume",
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
      name: "amount",
      description: "Volume amount to set",
      type: ApplicationCommandOptionType.Number,
      required: false,
      minValue: 1,
      maxValue: 200
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

    const newVol = interaction.options.getNumber("amount", false);

    if (!newVol) {
      const embed = new EmbedBuilder()
        .setDescription(`Current volume is \`${queue.node.volume}%\`.`)
        .setFooter({ text: "Use '/volume <1-100>' to change the volume." });

      return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(error);
    }

    queue.node.setVolume(newVol);

    return interaction.reply(`Volume is updated to ${newVol}.`);
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