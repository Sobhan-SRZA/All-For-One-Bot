const {
  SelectMenuBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle
} = require("discord.js");
const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = async (client, interaction) => {
  try {
    let db = client.db;
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "reporting") {
      let choice = interaction.fields.getTextInputValue('report');
      let guild = client.guilds.cache.get(client.config.discord.server_id);
      let channel = guild.channels.cache.get(client.config.discord.server_channel_report);
      if ([" ", "  "].includes(choice)) return errorMessage(client, interaction, `please write full content for reporting.`)

      let invite = await interaction.channel.createInvite({
        maxAge: 0,
        maxUses: 5
      })
      const embed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setTitle(`Report Message From \`${interaction.guild.name}\``)
        .setColor(client.colors.none)
        .addFields([{
          name: `${client.emotes.reply} **Guild:**`,
          value: `**${interaction.guild.name} | ${interaction.guild.id} | ${invite.url ? invite.url : "Cant' create invite :("}**`,
          inline: false
        }, {
          name: `${client.emotes.reply} **User:**`,
          value: `**${interaction.user} | ${interaction.user.tag} | ${interaction.user.id}**`,
          inline: false
        }, {
          name: `${client.emotes.reply} **Date:**`,
          value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`,
          inline: false
        }, {
          name: `${client.emotes.reply} **Message:**`,
          value: `${choice}`,
          inline: false
        }])
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))


      await channel.send({
        embeds: [embed]
      }).then((msg) => {
        msg.react(client.emotes.report)
      })
      await interaction.deferReply({ ephemeral: true })
      await interaction.editReply({
        embeds: [new EmbedBuilder().setColor(client.colors.none).setTimestamp().setTitle(`${client.emotes.success}| Successfully Sent`).setDescription(`Successfuly your report or bug message send to My Developers ${client.emotes.hurt} **thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`)],
      })
    }
    if (interaction.customId === "panel_message_modal") {
      let channel_id = await db.get(`guild_${interaction.guild.id}.panel.channel`);
      let channel = await interaction.guild.channels.cache.find(c => c.id === channel_id);
      let title = interaction.fields.getTextInputValue('ticket_title')
      let description = interaction.fields.getTextInputValue('ticket_description')
      let color = interaction.fields.getTextInputValue('ticket_color')
      let button_name = interaction.fields.getTextInputValue('ticket_button_name')
      let button_emoji = interaction.fields.getTextInputValue('ticket_button_emoji')
      let embed = new EmbedBuilder()
      let button = new ButtonBuilder().setCustomId('create_ticket').setStyle(ButtonStyle.Success)
      button.setLabel(`${button_name ? button_name : "Create Ticket"}`)
      button.setEmoji(`${button_emoji ? button_emoji : client.emotes.ticket}`)
      embed.setColor(`${color ? color.startsWith("#") ? color : `#${color}` : client.colors.theme}`)

      if (description) {
        embed.setDescription(description)
      }
      if (title) {
        embed.setTitle(title)
      }
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [new EmbedBuilder().setTitle(client.emotes.success + '| **Ticket Is Successfuly Setuped To Customize**').setColor(client.colors.theme).setDescription(`**setup server ticket system in ${channel} to custom type is successfully.**`).setFooter({ text: `Setting • Requested By ${interaction.user.tag} `, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
        components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId('ticket_setup_custom').setEmoji(client.emotes.system).setLabel("Ticket Setup To Customize").setStyle(ButtonStyle.Success).setDisabled(true)]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
      })
      await channel.send({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(button)]
      })
    }
    if (interaction.customId === "menu_option_modal") {
      let name = await interaction.fields.getTextInputValue('name');
      let emoji = await interaction.fields.getTextInputValue('emoji');
      let option = await db.get(`guild_${interaction.guild.id}.panel.menu_options`);
      if (await db.has(`guild_${interaction.guild.id}.panel.menu_options`)) {
        if (option.find((o) => o.label === name)) {
          return errorMessage(client, interaction, `Please choose another name for the option because this name already exists in the options.`)
        }
      }
      if (emoji) await db.push(`guild_${interaction.guild.id}.panel.menu_options`, {
        data: {
          label: name,
          value: name,
          emoji: emoji.replace(" ", "")
        }
      })
      else await db.push(`guild_${interaction.guild.id}.panel.menu_options`, {
        data: {
          label: name,
          value: name
        }
      })
      await interaction.deferUpdate()
      return interaction.editReply({
        embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Setuped`).setColor(client.colors.theme).setDescription(`guild **menu option** successfully setuped.\n**Name:** \`${name}\` ${emoji ? `| **Emoji:** ${emoji}` : ""}.`).setFooter({ text: `Setting • Requested By ${interaction.user.tag} `, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Menu Option Setuped').setEmoji(client.emotes.option).setCustomId(`menu_option_setuped`).setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Next Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_options`).setDisabled(false)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
      })
    }
  } catch (e) {
    console.log(e)
    errorMessage(client, interaction, '```js\n' + e + '```')
  }
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */