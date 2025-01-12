const {
  EmbedBuilder,
  AttachmentBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
const generate = require("../../functions/generators/generateFilterImage");
const point = require("../../functions/getRange");
module.exports = {
  name: "gaysanj",
  description: "میزان گی بودنت رو میسنجم.",
  category: "fun",
  aliases: ["gay"],
  type: ApplicationCommandType.ChatInput,
  cooldown: 5,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: false,
  options: [{
    name: "user",
    type: ApplicationCommandOptionType.User,
    description: "یک یوزر انتخاب کنید.",
    required: false
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
      const user = interaction.options.getUser("user") || interaction.user;
      const number = Math.floor(Math.random() * 100) + 1;
      const files = [];
      const embed = new EmbedBuilder()
        .setColor("Orange")
        .setDescription(number > 50 ? `به به پرچمت رنگیه مشتی ${user} یا حق.` : `خب داشم ${user} کونی نیستی خداتو شکر کن.`)
        .setAuthor({ name: `درخواست شده توسط ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ forceStatic: true }) })
        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
        .addFields({
          name: "درصد گی بودن:",
          value: `**\`${number}%\`**`
        }, {
          name: "درجه نگار:",
          value: `**${point(number)}**`
        });

      if (number > 50) {
        const image = new generate().setUserAvatar(user.displayAvatarURL({ extension: "png", size: 4096 })).setGay(true);
        embed.setThumbnail("attachment://gay.png");
        files.push(new AttachmentBuilder(await image.generate(), { name: "gay.png" }));
      } else embed.setThumbnail(user.displayAvatarURL({ extension: "png", size: 4096 }));

      return await interaction.reply({
        embeds: [embed],
        files: files
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