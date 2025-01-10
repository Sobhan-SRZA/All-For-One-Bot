const {
  EmbedBuilder,
  ApplicationCommandType
} = require("discord.js");
const response = require("../../functions/response");
const error = require("../../functions/error");
const editResponse = require("../../functions/editResponse");
module.exports = {
  name: "ping",
  description: "پینگ بات",
  category: "misc",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: true,

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {Array} args 
   * @returns 
   */
  run: async (client, interaction, args) => {
    const embed1 = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription("Pinging...");

    const message = await response(interaction, { ephemeral: true, embeds: [embed1] }).catch(error);

    const embed2 = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("🏓 Pong")
      .setDescription(`💓: ${Math.round(client.ws.ping)} ms
⏱️: ${Date.now() - interaction.createdTimestamp} ms`);

    return await editResponse(interaction, message, { embeds: [embed2] });
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