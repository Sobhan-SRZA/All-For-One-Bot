const {
  EmbedBuilder
} = require("discord.js");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
  name: "add",
  description: "کوین دادن به بقیه.",
  category: "owner",
  cooldown: 5,
  aliases: [],
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: true,
  only_slash: false,
  only_message: true,

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} interaction 
   * @param {Array<string>} args 
   * @returns 
   */
  run: async (client, interaction, args) => {
    try {
      const db = client.db;
      const user = interaction.guild.members.cache.some(a => a.user.equals(args[0]) || a.id === args[0] || a.user.tag === args[0]) || interaction.mentions.users.first();
      const cash = args[1];
      if (!user) {
        return await interaction.reply({
          content: `❌| این یوزر مورد تایید نمیباشد دوباره تلاش کنید.`
        });
      };
      if (user.bot) {
        return await interaction.reply({
          content: `❌| ربات ها مورد تایید نیستند دوباره تلاش کنید.`
        });
      };


      if (!await db.has(`users.${user.id}`)) {
        return await interaction.reply({
          content: `❌| پروفایل یوزر مورد نظر یافت نشد.`
        });
      };

      if (!cash) {
        return await interaction.reply({
          content: `❌| لطفا مبلغ کوین را وارد کنید.`
        });
      };

      if (isNaN(cash)) {
        return await interaction.reply({
          content: `❌| لطفا از اعداد استفاده کنید.`
        });
      };

      const profile = await db.get(`users.${user.id}`);
      await db.add(`users.${user.id}.wallet`, cash);
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Economy | Add")
        .setDescription("به پروفایل یوزر مورد نظر کوین ها واریز شد.")
        .setFooter({ text: `Owner Embed • ${copyRight.footerText}` })
        .setThumbnail(interaction.author.displayAvatarURL({ forceStatic: true }))
        .addFields([{
          name: "مبلغ واریزی:",
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

      return await interaction.reply({
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