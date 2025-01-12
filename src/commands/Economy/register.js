const {
  EmbedBuilder,
  ApplicationCommandType
} = require("discord.js");
const error = require("../../functions/error");
const economy = require("../../storage/economy.json");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
  name: "register",
  description: "ثبت نام و ساخت پروفایل در سیستم اکونومی بات.",
  category: "economy",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10,
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
      await interaction.deferReply({ ephemeral: false });
      if (await db.has(`users.${interaction.user.id}`)) {
        const profile = await db.get(`users.${interaction.user.id}`);
        const embed = new EmbedBuilder()
          .setColor("Orange")
          .setTitle("Economy | Register")
          .setDescription("شما از قبل پروفایل داشتید.")
          .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
          .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
          .addFields([{
            name: "کیف پول:",
            value: `${profile.wallet.toLocaleString()} 🪙`,
            inline: true
          }, {
            name: "سطح کار:",
            value: `${profile.work} Level 💼`,
            inline: true
          }, {
            name: "سطح دزدی:",
            value: `${profile.rob} Level 🔦`,
            inline: true
          }, {
            name: "سطح خانه:",
            value: `${profile.home} Level 🏡`,
            inline: true
          }, {
            name: "سطح ماینر:",
            value: `${profile.miner} Level ⛏`,
            inline: true
          }])
          .setTimestamp();

        return await interaction.editReply({
          embeds: [embed]
        });
      };

      const data = {
        name: interaction.user.tag,
        wallet: economy.default_coin,
        miner: 0,
        home: 0,
        work: 0,
        rob: 0
      };
      await db.set(`users.${interaction.user.id}`, data);
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Economy | Register")
        .setDescription("پروفایل شما با موفقیت ساخته شد.")
        .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
        .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
        .addFields([{
          name: "کیف پول:",
          value: `${data.wallet.toLocaleString()} 🪙`,
          inline: true
        }, {
          name: "سطح کار:",
          value: `${data.work} Level 💼`,
          inline: true
        }, {
          name: "سطح دزدی:",
          value: `${data.rob} Level 🔦`,
          inline: true
        }, {
          name: "سطح خانه:",
          value: `${data.home} Level 🏡`,
          inline: true
        }, {
          name: "سطح ماینر:",
          value: `${data.miner} Level ⛏`,
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