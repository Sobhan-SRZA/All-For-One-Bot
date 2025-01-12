const {
  EmbedBuilder,
  ApplicationCommandType
} = require("discord.js");
const workLevel = require("../../storage/economy.json").work;
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
  name: "work",
  description: "انجام کار و دریافت حقوق.",
  category: "economy",
  type: ApplicationCommandType.ChatInput,
  cooldown: 60 * 60,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: false,

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {Array<string>} args 
   * @returns 
   */
  run: async (client, interaction, args) => {
    try {
      const db = client.db;
      if (!await db.has(`users.${interaction.user.id}`)) {
        await interaction.deferReply({ ephemeral: true });
        const cmd = client.application.commands.cache.find(c => c.name === "register");
        return await interaction.editReply({
          content: `❌| شما هیچ پروفایلی در بات ندارید.\n(با استفاده از کامند </${cmd.name}:${cmd.id}> برای خود پروفایل بسازید.)`
        });
      };

      await interaction.deferReply({ ephemeral: false });
      const profile = await db.get(`users.${interaction.user.id}`);
      const deposit = profile.work <= 0 ? 200 : workLevel[profile.work];
      await db.add(`users.${interaction.user.id}.wallet`, deposit);
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Economy | Work")
        .setDescription("شما با موفقیت تایم کاری خود را انجام دادید!!")
        .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
        .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
        .addFields([{
          name: "مبلغ واریزی:",
          value: `${deposit.toLocaleString()} 🪙`,
          inline: true
        }, {
          name: "سطح کار:",
          value: `${profile.work} Level 💼`,
          inline: true
        }, {
          name: "کیف پول:",
          value: `${profile.wallet.toLocaleString()} 🪙`,
          inline: true
        }])
        .setTimestamp();

      return await interaction.editReply({
        embeds: [embed]
      });
    } catch (e) {
      error(e);
    }
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