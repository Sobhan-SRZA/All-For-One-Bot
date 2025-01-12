const {
  EmbedBuilder,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
module.exports = {
  name: "clear",
  description: "پاک کردن پیام بیشتر از 100 نمیشود",
  category: "admin",
  type: ApplicationCommandType.ChatInput,
  user_permissions: ["ManageMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_admin: false,
  only_slash: true,
  only_message: false,
  options: [{
    name: "amount",
    description: "تعداد پاک کردن ",
    type: ApplicationCommandOptionType.String,
    required: false
  }, {
    name: "channel",
    description: "چنلی ک میخوای پیاماشو پاک کنی ",
    type: ApplicationCommandOptionType.Channel,
    channelTypes: [ChannelType.GuildText],
    required: false
  }],


  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {Array<string>} args 
   * @returns 
   */
  run: async (client, interaction) => {
    let channel = interaction.options.getChannel("channel") || interaction.channel;
    let amount = interaction.options.getString("amount") || 100;
    try {
      if (isNaN(amount)) {
        interaction.reply({
          content: `❌| لطفا تعداد بگو`,
          ephemeral: true,
        })
      }
      const embed = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle(`⚖️| Clear Information`)
        .addFields({
          name: `چنل`,
          value: `${channel}`,
          inline: true
        }, {
          name: `پاک شده توسط`,
          value: `${interaction.user}`,
          inline: true
        })
        .setTimestamp();

      await channel.bulkDelete(amount, true).then(async (msg) => {
        embed.addFields({ name: `تعداد پیام های پاک شده`, value: `${msg.size}`, inline: true })
        if (msg.size === 0) {
          interaction.reply({
            content: `**❌| پیامی برای پاک کردن پیدا نشد**`,
            ephemeral: true
          })
        }
        return await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        })
      })
    } catch (e) {
      error(e)
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