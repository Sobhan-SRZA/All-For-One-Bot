const {
  EmbedBuilder,
  ApplicationCommandType,
  ActionRowBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ButtonBuilder
} = require("discord.js");
const copyRight = require("../../storage/copyRight.json");
const { prefix } = require("../../../config");
module.exports = {
  name: "help",
  description: "دستورات بات",
  category: "misc",
  aliases: ["h"],
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
    const timeout = 1000 * 60 * 1;
    const category = new Map();
    client.commands.filter(a => !a.only_owner).forEach(a => category.set(a.category, a.category));
    const menu_options = [];
    const author = interaction.guild.members.cache.get(interaction.member.id);
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${client.user.username} Help`
      })
      .setFooter({
        text: `درخواست شده توسط ${author.user.tag}`,
        iconURL: author.user.displayAvatarURL({ dynamic: true })
      })
      .setColor("#2B2D31")
      .addFields([{
        name: "درباره من:",
        value: `>>> درود من ${client.user.username} هستم.\nمن یک ربات فان و مدیریتی هستم که به ادمین ها کمک میکنم راحت تر سرور رو مدیریت کنند و همچنین به ممبر ها کمک میکنم داخل سرور سرگرم بشوند و در حل مشکلاتشون کمک کنم.`,
        inline: false
      }, {
        name: "دیدن دستورات من:",
        value: ">>> برای دیدن تمام دستورات من میتوانید به منوی زیر این پیام کلیک کنید و بر اساس کتگوری مورد نظر کامند های اون بخش رو ببینید.",
        inline: false
      }])
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

    const formatString = (str) => {
      return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
    };
    category.forEach((ct) => {
      menu_options.push({
        label: `${formatString(ct.toString())}`,
        value: `${ct.toString()}`
      });
    });
    if (client.config.owners.some(r => r.includes(author.user.id))) {
      const [cat] = client.commands.filter(a => a.only_owner).map(a => a.category);
      menu_options.push({
        label: `${formatString(cat.toString())}`,
        value: `${cat.toString()}`
      })
    };

    const helpMenu = new StringSelectMenuBuilder()
      .setCustomId("help_menu")
      .setMaxValues(1)
      .setPlaceholder("رو من کلیک کن!!")
      .addOptions(menu_options);

    const homeButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel("Home Page")
      .setCustomId("home_page");

    const message = await interaction.reply({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(helpMenu.setDisabled(false)), new ActionRowBuilder().addComponents(homeButton.setDisabled(true))],
      fetchReply: true
    });
    const collector = message.createMessageComponentCollector({ time: timeout });
    collector.on("collect", async (int) => {
      if (int.user.id === author.user.id) {
        if (int.isButton()) {
          if (int.customId === "home_page") {
            int.update({
              embeds: [embed],
              components: message.components
            })
          }
        };

        if (int.isStringSelectMenu()) {
          if (int.customId === "help_menu") {
            int.values.forEach((value) => {
              const embed = new EmbedBuilder()
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setAuthor({
                  name: `امبد کمک ${client.user.username}`
                })
                .setTitle(`${value}`)
                .setFooter({
                  text: `درخواست شده توسط ${author.user.tag}`,
                  iconURL: author.user.displayAvatarURL({ dynamic: true })
                })
                .setColor("#2B2D31")

              let description = "";
              client.commands.filter(c => c.category === value).forEach((cmd) => {
                if (cmd.only_slash && cmd.options && cmd.options.some(op => op.type === 1)) {
                  const command = client.application.commands.cache.find(c => c.name === cmd.name);
                  const name = [];
                  command.options ?
                    command.options.some(op => op.type === 1) ?
                      command.options.forEach((option) => {
                        name.push({ name: command.name + " " + option.name, description: option.description })
                      }) : name.push({ name: `${command.name}`, description: command.description }) : name.push({ name: `${command.name}`, description: command.description });
                  name.forEach(element => {
                    description += `\n\n**${cmd.only_slash ?
                      `</${element.name}:${command.id}>` : ""}${cmd.only_message ?
                        `${prefix}${element.name} ${cmd.usage ? cmd.usage : ""}` : ""}${cmd.aliases && cmd.aliases.length > 0 ?
                          `\nنام های مستعار: [${cmd.aliases.map(a => `\`${a}\``).join(", ")}]` : ""}\nتوضیحات: \`${element.description}\`**`;
                  });
                } else {
                  description += `\n\n**${cmd.only_slash ?
                    `</${cmd.name}:${client.application.commands.cache.find(c => c.name === cmd.name).id}>` : ""}${cmd.only_slash && cmd.only_message ? " | " : ""}${cmd.only_message ?
                      `${prefix}${cmd.name} ${cmd.usage ? cmd.usage : ""}` : ""}${cmd.aliases && cmd.aliases.length > 0 ?
                        `\nنام های مستعار: [${cmd.aliases.map(a => `\`${a}\``).join(", ")}]` : ""}\nتوضیحات: \`${cmd.description}\`**`;
                }
              });
              embed.setDescription(`${description ? description : "`بدون دستورات پیام.`"}`);
              return int.update({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(helpMenu.setDisabled(false).setOptions(menu_options.filter(a=> a.value !== value))), new ActionRowBuilder().addComponents(homeButton.setDisabled(false))]
              });
            });
          }
        }
      } else {
        return interaction.reply({
          content: `این دکمه فقط برای ${author.user} میباشد و شما اجازه استفاده از آن را ندارید.\nبرای استفاده از دکمه ها بهتر است کامند رو به رو را فراخوانی کنید: "${`</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`}"`,
          ephemeral: true
        })
      }
    });
    collector.on("end", async () => {
      return await message.edit({
        components: [new ActionRowBuilder().addComponents(helpMenu.setDisabled(true)), new ActionRowBuilder().addComponents(homeButton.setDisabled(true))]
      });
    })
    setTimeout(() => {
      return collector.stop();
    }, timeout);

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