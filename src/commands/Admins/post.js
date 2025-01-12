const {
  EmbedBuilder,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
module.exports = {
  name: "post",
  description: "به هرجایی که خواستی یه مسیج بفرست.",
  category: "admin",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  user_permissions: ["Administrator"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_admin: false,
  only_slash: true,
  only_message: false,
  options: [{
    name: "content",
    type: ApplicationCommandOptionType.String,
    description: "اگر میخواید یه مسیج بنویسید اینجا پر کنید.",
    required: false
  }, {
    name: "file",
    description: "یک فایل آپلود کنید.",
    type: ApplicationCommandOptionType.Attachment,
    required: false,
  }, {
    name: "thumbnail",
    type: ApplicationCommandOptionType.Attachment,
    description: "فقط عکس یا گیف میتوانید آپلود کنید.",
    required: false
  }, {
    name: "image",
    type: ApplicationCommandOptionType.Attachment,
    description: "فقط عکس یا گیف میتوانید آپلود کنید..",
    required: false
  }, {
    name: "description",
    type: ApplicationCommandOptionType.String,
    description: "بخش description امبد را پر کنید.",
    required: false
  }, {
    name: "footer_text",
    type: ApplicationCommandOptionType.String,
    description: "بخش فوتر را پر کنید.",
    required: false
  }, {
    name: "footer_icon",
    type: ApplicationCommandOptionType.Attachment,
    description: "برای بخش فوتیر عکس یا گیف آپلود کنید.",
    required: false
  }, {
    name: "author_text",
    type: ApplicationCommandOptionType.String,
    description: "پخش بالای امبد را پر کنید.",
    required: false
  }, {
    name: "author_icon",
    type: ApplicationCommandOptionType.Attachment,
    description: "برای بخش بالای امبد عکس یا گیف آپلود کنید.",
    required: false
  }, {
    name: "title",
    type: ApplicationCommandOptionType.String,
    description: "تایتل را پر کنید.",
    required: false
  }, {
    name: "timestamp",
    type: ApplicationCommandOptionType.Boolean,
    description: "آیا میخواهید تاریخ روز را در زیر امبد نشان دهد؟",
    required: false
  }, {
    name: "color",
    type: ApplicationCommandOptionType.String,
    description: "رنگ امبد را لطفا با قرار دادن هکس کد تعیین کنید.",
    required: false
  }, {
    name: "channel",
    description: "چنلی که میخواهید مسیج در آنجا فرستاده سود.",
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
  run: async (client, interaction, args) => {
    try {
      const content = interaction.options.getString("content");
      const channel = interaction.options.getChannel("channel") || interaction.channel;
      const description = interaction.options.getString("description");
      const color = interaction.options.getString("color");
      const title = interaction.options.getString("title");
      const image = interaction.options.getAttachment("image");
      const footer_text = interaction.options.getString("footer_text");
      const footer_icon = interaction.options.getAttachment("footer_icon");
      const author_text = interaction.options.getString("author_text");
      const author_icon = interaction.options.getAttachment("author_icon");
      const timestamp = interaction.options.getBoolean("timestamp");
      const thumbnail = interaction.options.getAttachment("thumbnail");
      const file = interaction.options.getAttachment("file");
      const embed = new EmbedBuilder();
      if (color) {
        embed.setColor(`${color}`);
      };
      if (description) {
        embed.setDescription(`${description.replaceAll("{next}", "\n")}`)
      };
      if (thumbnail) {
        embed.setThumbnail(`${thumbnail.url}`)
      };
      if (image) {
        embed.setImage(`${image.url}`)
      };
      if (timestamp === true) {
        embed.setTimestamp(new Date())
      };
      if (title) {
        embed.setTitle(`${title.replaceAll("{next}", "\n")}`)
      };
      if (!author_icon && author_text) {
        embed.setAuthor({
          name: `${author_text.replaceAll("{next}", "\n")}`
        })
      };
      if (author_icon && !author_text) {
        return await interaction.reply({
          content: `شما نمیتوانید یک آثور فقط با عکس داشته باشید دوباره تلاش کنید.\nدفه ی بعد بخش author_text رو پر کن.`,
          ephemeral: true
        })
      };
      if (author_icon && author_text) {
        embed.setAuthor({
          name: `${author_text.replaceAll("{next}", "\n")}`,
          iconURL: `${author_icon.url}`
        });
      };
      if (!footer_icon && footer_text) {
        embed.setFooter({
          text: `${footer_text.replaceAll("{next}", "\n")}`
        });
      };
      if (footer_icon && !footer_text) {
        return await interaction.reply({
          content: `شما نمیتوانید یک فوتر فقط با عکس داشته باشید دوباره تلاش کنید.\nدفه ی بعد بخش footer_text رو پر کن.`,
          ephemeral: true
        })
      };
      if (footer_icon && footer_text) {
        embed.setFooter({
          text: `${footer_text.replaceAll("{next}", "\n")}`,
          iconURL: `${footer_icon.url}`
        })
      };
      const embeds = embed.data.description || embed.data.title || embed.data.author || embed.data.footer || embed.data.image || embed.data.thumbnail;
      if (embeds || content || file) {
        await interaction.reply({
          content: `مسیج شما با موفقیت در چنل ${channel} ارسال شد.`,
          ephemeral: true
        });
        return await channel.send({
          content: content ? content.replaceAll("{next}", "\n") : " ",
          embeds: embeds ? [embed] : [],
          files: file ? [file] : []
        });
      } else if (!embeds && !content && !file) {
        return await interaction.reply({
          content: `شما نمیتوانید بدون هیچ محتوایی یه مسیج در چنل بفرستید.`,
          ephemeral: true
        });
      }
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