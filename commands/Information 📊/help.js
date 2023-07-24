const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  PermissionsBitField,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require('discord.js');
const {
  HelpCategoryEmbed,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'help',
  description: 'Show to you about bot info and commands.',
  category: 'Information 📊',
  aliases: ["help me", "h"],
  usage: "[command-name]",
  type: ApplicationCommandType.ChatInput,
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  options: [{
    name: "command",
    description: "Write bot command name to show info about it.",
    type: ApplicationCommandOptionType.String,
  }, {
    name: "ephemeral",
    description: "Hide this message from everyone.",
    type: ApplicationCommandOptionType.String,
    choices: [{
      name: 'Enable',
      value: 'true'
    }, {
      name: 'Disable',
      value: 'false'
    }],
    required: false
  }],
  interactionRun: async (client, interaction, args, lang, prefix) => {
    let command_name = interaction.options.getString("command");
    let db = client.db;
    let mes = client.languages[lang].commands.help;
    let help = new EmbedBuilder()
      .setAuthor({
        name: `${mes.embed1.author.replaceAll("{username}", client.user.username)}`
      })
      .setFooter({
        text: `${mes.embed1.footer.replaceAll("{user}", interaction.user.tag)}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setColor(client.colors.theme)
      .addFields([{
        name: `${mes.embed1.field1.name}`,
        value: `${mes.embed1.field1.value.replaceAll("{username}", client.user.username).replaceAll("{invite}", client.config.discord.invite).replaceAll("{ticket_emote}", client.emotes.tickets).replaceAll("{system_emote}", client.emotes.system).replaceAll("{learn_emote}", client.emotes.learn)}`,
        inline: false
      }, {
        name: `${mes.embed1.field2.name}`,
        value: `${mes.embed1.field2.value.replaceAll("{prefix}", prefix).replaceAll("{cmd}", `</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`)}`,
        inline: false
      }, {
        name: `${mes.embed1.field3.name}`,
        value: `${mes.embed1.field3.value}`,
        inline: false
      }])
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

    if (command_name) {
      const cmd = client.slashCommands.get(command_name.toLowerCase()) || client.messageCommands.get(command_name.toLowerCase());
      if (!cmd || !cmd.name) {
        return interaction.reply({ content: `${mes.error1.replaceAll("{error_emote}", client.emotes.error).replaceAll("{command_name}", command_name.toLowerCase())}`, ephemeral: true })
      }
      if (cmd.category === "Owner 👑" && !client.config.owner.some(r => r.includes(interaction.user.id))) return errorMessage(client, interaction, `${mes.error1.replaceAll("{owners}", client.config.owner.map(id => `<@${id}>`))}`)
      let embed = new EmbedBuilder()
        .setColor(client.colors.theme)
        .setAuthor({
          name: `${mes.embed1.author.replaceAll("{username}", client.user.username)}`
        })
        .setFooter({
          text: `${mes.embed2.footer.replaceAll("{prefix}", prefix).replaceAll("{user}", interaction.user.tag)}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

      let component = [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
      let cmds = client.application.commands.cache.find(c => c.name === cmd.name);
      embed.setTitle(`</${cmds.name}:${cmds.id}>`)
      let fields = [{
        name: `${mes.embed2.field1}`,
        value: `${cmd.name}`
      }, {
        name: `${mes.embed2.field2.name}`,
        value: `${cmd.description || mes.embed2.field2.value}`
      }, {
        name: `${mes.embed2.field3}`,
        value: `${cmd.category}`
      }]
      if (cmd.cooldown) {
        fields.push({
          name: `${mes.embed2.field4}`,
          value: `**\`${cmd.cooldown} Seconds\`**`
        })
      }
      if (cmd.options && cmd.options.some(op => op.type === ApplicationCommandOptionType.Subcommand)) {
        let name = [];
        await cmds.options ? cmds.options.some(op => op.type === ApplicationCommandOptionType.Subcommand) ? cmds.options.map((option) => { name.push(cmds.name + " " + option.name) }) : name.push(`${cmds.name}`) : name.push(`${cmds.name}`)
        fields.push({
          name: `${mes.embed2.field5}`,
          value: `**${name.map(n => `</${n}:${cmds.id}>`).join(' , ')}**`
        })
      }
      if (cmd.userPermissions) {
        fields.push({
          name: `${mes.embed2.field6}`,
          value: `**[ ${cmd.userPermissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
      }
      if (cmd.botPermissions) {
        fields.push({
          name: `${mes.embed2.field7}`,
          value: `**[ ${cmd.botPermissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
      }
      embed.addFields(fields)
      return interaction.followUp({
        embeds: [embed],
        components: component
      })
    } else {
      let menu_options = [{
        label: `${mes.menu.option1}`,
        value: 'Information 📊',
        emoji: '📊',
      }, {
        label: `${mes.menu.option3}`,
        value: 'Ticket 🎫',
        emoji: '🎫',
      }, {
        label: `${mes.menu.option4}`,
        value: 'Admin 👨🏻‍💼',
        emoji: '👨🏻‍💼',
      }, {
        label: `${mes.menu.option6}`,
        value: 'Fun 🎭',
        emoji: '🎭',
      }]
      if (client.config.owner.some(r => r.includes(interaction.user.id))) {
        menu_options.push({
          label: `${mes.menu.option5}`,
          value: 'Owner 👑',
          emoji: '👑',
        })
      }
      let help_menu = new StringSelectMenuBuilder()
        .setCustomId("help_menu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder(`${mes.menu.placehoder}`)
        .addOptions(menu_options)

      let home_btn = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel(mes.btn4)
        .setEmoji(client.emotes.home)
        .setCustomId("home_page")

      let component_1 = [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)), new ActionRowBuilder().addComponents(home_btn.setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])];

      await interaction.followUp({
        embeds: [help],
        components: component_1
      })
      const embedMessage = await interaction.fetchReply()
      const collector = embedMessage.createMessageComponentCollector({ time: 70000 });
      collector.on('collect', async (m) => {
        if (m.user.id === interaction.user.id) {
          if (m.isButton()) {
            if (m.customId === "home_page") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [help],
                components: component_1
              })
            }
          }
          if (m.isStringSelectMenu()) {
            if (m.customId === "help_menu") {
              m.values.forEach((value) => {
                return HelpCategoryEmbed(prefix, value, client, m, [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)), new ActionRowBuilder().addComponents(home_btn.setDisabled(false), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])])
              })
            }
          }
        } else {
          return errorMessage(client, m, `${mes.error3.replace("{user}", interaction.user).replace("{cmd}", `</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`)}`)
        }
      })
      setTimeout(() => { interaction.editReply({ components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel(mes.btn6).setStyle(ButtonStyle.Primary).setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])] }) }, 70000)
    }
  },
  messageRun: async (client, message, args, lang, prefix) => {
    let command_name = args.slice(0).join(" ");
    let db = client.db;
    let mes = client.languages[lang].commands.help;
    let help = new EmbedBuilder()
      .setAuthor({
        name: `${mes.embed1.author.replaceAll("{username}", client.user.username)}`
      })
      .setFooter({
        text: `${mes.embed1.footer.replaceAll("{user}", message.author.tag)}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setColor(client.colors.theme)
      .addFields([{
        name: `${mes.embed1.field1.name}`,
        value: `${mes.embed1.field1.value.replaceAll("{username}", client.user.username).replaceAll("{invite}", client.config.discord.invite).replaceAll("{ticket_emote}", client.emotes.tickets).replaceAll("{system_emote}", client.emotes.system).replaceAll("{learn_emote}", client.emotes.learn)}`,
        inline: false
      }, {
        name: `${mes.embed1.field2.name}`,
        value: `${mes.embed1.field2.value.replaceAll("{prefix}", prefix).replaceAll("{cmd}", `</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`)}`,
        inline: false
      }, {
        name: `${mes.embed1.field3.name}`,
        value: `${mes.embed1.field3.value}`,
        inline: false
      }])
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

    if (command_name) {
      const cmd = client.slashCommands.get(command_name.toLowerCase()) || client.messageCommands.get(command_name.toLowerCase());
      if (!cmd || !cmd.name) {
        return message.reply({ content: `${mes.error1.replaceAll("{error_emote}", client.emotes.error).replaceAll("{command_name}", command_name.toLowerCase())}`, ephemeral: true })
      }
      if (cmd.category === "Owner 👑" && !client.config.owner.some(r => r.includes(message.author.id))) return errorMessage(client, message, `${mes.error1.replaceAll("{owners}", client.config.owner.map(id => `<@${id}>`))}`)
      let embed = new EmbedBuilder()
        .setColor(client.colors.theme)
        .setAuthor({
          name: `${mes.embed1.author.replaceAll("{username}", client.user.username)}`
        })
        .setFooter({
          text: `${mes.embed2.footer.replaceAll("{prefix}", prefix).replaceAll("{user}", message.author.tag)}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

      let component = [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
      let cmds = client.application.commands.cache.find(c => c.name === cmd.name);
      embed.setTitle(`</${cmds.name}:${cmds.id}>`)
      let fields = [{
        name: `${mes.embed2.field1}`,
        value: `${cmd.name}`
      }, {
        name: `${mes.embed2.field2.name}`,
        value: `${cmd.description || mes.embed2.field2.value}`
      }, {
        name: `${mes.embed2.field3}`,
        value: `${cmd.category}`
      }]
      if (cmd.cooldown) {
        fields.push({
          name: `${mes.embed2.field4}`,
          value: `**\`${cmd.cooldown} Seconds\`**`
        })
      }
      if (cmd.options && cmd.options.some(op => op.type === ApplicationCommandOptionType.Subcommand)) {
        let name = [];
        await cmds.options ? cmds.options.some(op => op.type === ApplicationCommandOptionType.Subcommand) ? cmds.options.map((option) => { name.push(cmds.name + " " + option.name) }) : name.push(`${cmds.name}`) : name.push(`${cmds.name}`)
        fields.push({
          name: `${mes.embed2.field5}`,
          value: `**${name.map(n => `</${n}:${cmds.id}>`).join(' , ')}**`
        })
      }
      if (cmd.userPermissions) {
        fields.push({
          name: `${mes.embed2.field6}`,
          value: `**[ ${cmd.userPermissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
      }
      if (cmd.botPermissions) {
        fields.push({
          name: `${mes.embed2.field7}`,
          value: `**[ ${cmd.botPermissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
      }
      embed.addFields(fields)
      return message.reply({
        embeds: [embed],
        components: component
      })
    } else {
      let menu_options = [{
        label: `${mes.menu.option1}`,
        value: 'Information 📊',
        emoji: '📊',
      }, {
        label: `${mes.menu.option3}`,
        value: 'Ticket 🎫',
        emoji: '🎫',
      }, {
        label: `${mes.menu.option4}`,
        value: 'Admin 👨🏻‍💼',
        emoji: '👨🏻‍💼',
      }]
      if (client.config.owner.some(r => r.includes(message.author.id))) {
        menu_options.push({
          label: `${mes.menu.option5}`,
          value: 'Owner 👑',
          emoji: '👑',
        })
      }
      let help_menu = new StringSelectMenuBuilder()
        .setCustomId("help_menu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder(`${mes.menu.placehoder}`)
        .addOptions(menu_options)

      let home_btn = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel(mes.btn4)
        .setEmoji(client.emotes.home)
        .setCustomId("home_page")

      let component_1 = [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)), new ActionRowBuilder().addComponents(home_btn.setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])];
      const embedMessage = await message.reply({
        embeds: [help],
        components: component_1
      })
      const collector = embedMessage.createMessageComponentCollector({ time: 70000 });
      collector.on('collect', async (m) => {
        if (m.user.id === message.author.id) {
          if (m.isButton()) {
            if (m.customId === "home_page") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [help],
                components: component_1
              })
            }
          }
          if (m.isStringSelectMenu()) {
            if (m.customId === "help_menu") {
              m.values.forEach((value) => {
                return HelpCategoryEmbed(prefix, value, client, m, [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)), new ActionRowBuilder().addComponents(home_btn.setDisabled(false), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])])
              })
            }
          }
        } else {
          return errorMessage(client, m, `${mes.error3.replace("{user}", m.user).replace("{cmd}", `</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`)}`)
        }
      })
      setTimeout(() => { embedMessage.edit({ components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel(mes.btn6).setStyle(ButtonStyle.Primary).setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])] }) }, 70000)
    }
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