const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
  name: "transfer",
  description: "انتقال پول به دیگران.",
  category: "economy",
  type: ApplicationCommandType.ChatInput,
  cooldown: 60,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: false,
  options: [{
    name: "cash",
    type: ApplicationCommandOptionType.Number,
    description: "مبلغ پول واریزی را بنویسید.",
    required: true
  }, {
    name: "user",
    type: ApplicationCommandOptionType.User,
    description: "به کی میخواهید واریز کنید؟",
    required: true
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
      let db = client.db;
      let user = interaction.options.getUser("user");
      let cash = interaction.options.getNumber("cash");
      if (!await db.has(`users.${interaction.user.id}`)) {
        await interaction.deferReply({ ephemeral: true });
        let cmd = client.application.commands.cache.find(c => c.name === "register");
        return await interaction.editReply({
          content: `❌| شما هیچ پروفایلی در بات ندارید.\n(با استفاده از کامند </${cmd.name}:${cmd.id}> برای خود پروفایل بسازید.)`
        });
      };

      if (interaction.user.equals(user)) {
        await interaction.deferReply({ ephemeral: true });
        return await interaction.editReply({
          content: `❌| شما نمیتوانید به خودتان پول واریز کنید.`
        });
      };

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

      const profile = await db.get(`users.${interaction.user.id}`);
      if (profile.wallet < cash) {
        await interaction.deferReply({ ephemeral: true });
        return await interaction.editReply({
          content: `❌| شما پول کافی برای واریز به حساب ${user} را ندارید.\n(شما فقط \`${profile.wallet.toLocaleString()}\`🪙 دارید.)`
        });
      };

      await interaction.deferReply({ ephemeral: false });
      await db.sub(`users.${interaction.user.id}.wallet`, cash);
      await db.add(`users.${user.id}.wallet`, cash);
      const embed = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("Economy | Transfer")
        .setDescription("باموفقیت پول از حساب شما برداشت و به حساب یوزر مورد نظر واریز شد.")
        .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
        .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
        .addFields([{
          name: "مبلغ برداشتی:",
          value: `${cash.toLocaleString()} 🪙`,
          inline: true
        }, {
          name: "یوزر:",
          value: `${user}`,
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