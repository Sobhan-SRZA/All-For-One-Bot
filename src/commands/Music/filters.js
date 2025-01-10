/* eslint-disable no-case-declarations */
const { useQueue } = require("discord-player");
const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } = require("discord.js");
const avlFilters = [
  "Bassboost",
  "Chorus",
  "Compressor",
  "Dim",
  "Earrape",
  "Expander",
  "Fadein",
  "Flanger",
  "Gate",
  "Haas",
  "Karaoke",
  "Lofi",
  "Mcompand",
  "Mono",
  "Nightcore",
  "Normalizer",
  "Phaser",
  "Pulsator",
  "Reverse",
  "Softlimiter",
  "Subboost",
  "Surrounding",
  "Treble",
  "Vaporwave",
  "Vibrato",
];
module.exports = {
  name: "filters",
  description: "Audio filters commands",
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
      name: "clear",
      description: "Clear all applied filters."
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "show",
      description: "Show all filters."
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "toggle",
      description: "Toggle a audio filter.",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "name",
          description: "The name of the filter",
          required: true,
          choices: avlFilters.map((f) => ({
            name: `${f}`,
            value: `${f.toLowerCase()}`
          }))
        }
      ]
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

    const filters = queue.filters.ffmpeg.getFiltersEnabled();
    switch (interaction.options.getSubcommand()) {
      case "clear":
        if (!filters.length)
          return interaction.reply("No audio filter is applied currently.");

        queue.filters.ffmpeg.setFilters(false);
        await interaction.reply("Cleared all audio filters.");
        break;

      case "toggle":
        const filterName = interaction.options.getString("name", true);
        queue.filters.ffmpeg.toggle(filterName);
        await interaction.reply(`Toggle the ${filterName} audio filter`);
        break;

      default:
        const enabledFilters = queue.filters.ffmpeg.getFiltersEnabled();
        const disabledFilters = queue.filters.ffmpeg.getFiltersDisabled();
        const enFDes = enabledFilters.map((f) => `${f} --> ✅`).join("\n");
        const disFDes = disabledFilters.map((f) => `${f} --> ❌`).join("\n");
        const embed = new EmbedBuilder()
          .setTitle("All Audio Filters")
          .setDescription(`${enFDes}\n\n${disFDes}`);

        await interaction.reply({ ephemeral: true, embeds: [embed] });
        break;
    }
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