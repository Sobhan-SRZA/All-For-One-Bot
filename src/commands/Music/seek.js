const { ApplicationCommandOptionType, ApplicationCommandType } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  name: "seek",
  description: "Seek the player",
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
      name: "duration",
      description: "The duration to seek to <mm:ss>",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
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

    let timeString = interaction.options.getString("duration");

    if (isNaN(timeString) && !timeString.includes(":"))
      return interaction.reply("Provide a valid duration to seek.");

    if (!isNaN(timeString)) timeString = `00:${timeString}`;

    /**
     * convert formatted duration to milliseconds
     * @param {string} formatted duration input
     * @returns {number}
     */
    function toMilliseconds(input) {
      if (!input) return 0;
      if (typeof input !== "string") return Number(input) || 0;
      if (input.match(/:/g)) {
        const time = input.split(":").reverse();
        let s = 0;
        for (let i = 0; i < 3; i++)
          if (time[i]) s += Number(time[i].replace(/[^\d.]+/g, "")) * Math.pow(60, i);
        if (time.length > 3) s += Number(time[3].replace(/[^\d.]+/g, "")) * 24 * 60 * 60;
        return Number(s * 1000);
      }
      return Number(input.replace(/[^\d.]+/g, "") * 1000) || 0;
    }
    const time = toMilliseconds(timeString);

    if (!time || isNaN(time) || time > queue.currentTrack.durationMS || time < 0)
      return interaction.reply("Provide a valid duration to seek.");

    queue.node.seek(time);

    return interaction.reply(`Seeked to \`${timeString}\`.`);
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