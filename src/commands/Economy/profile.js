const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
  name: "profile",
  description: "دیدن پروفایل خود یا دیگران در بات.",
  category: "economy",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: false,
  options: [{
    name: "user",
    type: ApplicationCommandOptionType.User,
    description: "یک یوزر انتخاب کنید."
  }],

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
      const user = interaction.options.getUser("user");

      if (user) {
        if (user.bot) {
          await interaction.deferReply({ ephemeral: true });
          return await interaction.editReply({
            content: `❌| ربات ها نمیتوانند پروفایل داشته باشند.`
          });
        };

        if (!await db.has(`users.${user.id}`)) {
          await interaction.deferReply({ ephemeral: true });
          return await interaction.editReply({
            content: `❌| یوزر مورد نظر پروفایلی در بات ندارد.`
          });
        };

        await interaction.deferReply({ ephemeral: false });
        const profile = await db.get(`users.${user.id}`);
        const embed = new EmbedBuilder()
          .setAuthor({ name: `درخواست شده توسط ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ forceStatic: true }) })
          .setColor("Aqua")
          .setTitle("Economy | Profile")
          .setDescription("پروفایل یوزر مورد نظر با موفقیت یافت شد.")
          .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
          .setThumbnail(user.displayAvatarURL({ forceStatic: true }))
          .addFields([{
            name: "یوزر:",
            value: `${user}`,
            inline: true
          }, {
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
      } else {
        if (!await db.has(`users.${interaction.user.id}`)) {
          await interaction.deferReply({ ephemeral: true });
          const cmd = client.application.commands.cache.find(c => c.name === "register");
          return await interaction.editReply({
            content: `❌| شما هیچ پروفایلی در بات ندارید.\n(با استفاده از کامند </${cmd.name}:${cmd.id}> برای خود پروفایل بسازید.)`
          });
        };


        await interaction.deferReply({ ephemeral: false });
        const profile = await db.get(`users.${interaction.user.id}`);
        const embed = new EmbedBuilder()
          .setColor("Aqua")
          .setTitle("Economy | Profile")
          .setDescription("پروفایل شما با موفقیت یافت شد.")
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