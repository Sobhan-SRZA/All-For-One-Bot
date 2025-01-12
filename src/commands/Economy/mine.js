const {
  EmbedBuilder,
  ApplicationCommandType
} = require("discord.js");
const copyRight = require("../../storage/copyRight.json");
const mineLevel = require("../../storage/economy.json").miner;
const error = require("../../functions/error");
module.exports = {
  name: "mine",
  description: "ماین بیت کوین برای دریافت پول.",
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
      let db = client.db;
      if (!await db.has(`users.${interaction.user.id}`)) {
        await interaction.deferReply({ ephemeral: true });
        let cmd = client.application.commands.cache.find(c => c.name === "register");
        return await interaction.editReply({
          content: `❌| شما هیچ پروفایلی در بات ندارید.\n(با استفاده از کامند </${cmd.name}:${cmd.id}> برای خود پروفایل بسازید.)`
        });
      };

      let profile = await db.get(`users.${interaction.user.id}`);
      let cmd = client.application.commands.cache.find(c => c.name === "upgrade");
      if (profile.home <= 0) {
        await interaction.deferReply({ ephemeral: true });
        return await interaction.editReply({
          content: `❌| شما نمیتوانید ماین کنید زیرا که خانه ای ندارید.\n(برای خرید خانه از کامند </${cmd.name} home:${cmd.id}> استفاده کنید.)`
        });
      };

      if (profile.miner <= 0) {
        await interaction.deferReply({ ephemeral: true });
        return await interaction.editReply({
          content: `❌| شما هیچ ماینری برای ماین کردن ندارید.\n(برای خرید ماینر از کامند </${cmd.name} miners:${cmd.id}> استفاده کنید.)`
        });
      };

      await interaction.deferReply({ ephemeral: false });
      await db.add(`users.${interaction.user.id}.wallet`, mineLevel[profile.miner]);
      let embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Economy | Mine")
        .setDescription("با موفقیت همه ی بیت کوین هایی که ماین شدند فرخته شدن.")
        .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
        .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
        .addFields([{
          name: "مبلغ واریزی:",
          value: `${mineLevel[profile.miner].toLocaleString()} 🪙`,
          inline: true
        }, {
          name: "سطح ماینر:",
          value: `${profile.miner} Level ⛏`,
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