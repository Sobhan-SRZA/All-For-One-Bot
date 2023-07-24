const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const axios = require("axios");
module.exports = {
  logMessage: async function(client, interaction, channel, description, reason, emote, has_file, file) {
    let member = interaction.guild.members.cache.find(m => m.id === interaction.member.id);
    if (has_file) {
      return channel.send({
        files: [file],
        embeds: [new EmbedBuilder().setTitle(`${emote}| ${reason}`).setColor(client.colors.none).setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true })).setDescription(`${description}`).setTimestamp().addFields([{ name: `**Requested By:**`, value: `**${member.user} | ${member.user.tag} | ${member.user.id}**`, inline: false }, { name: `**Target Channel:**`, value: `**${interaction.channel} | ${interaction.channel.name} | ${interaction.channel.id}**`, inline: false }, { name: `**Date:**`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`, inline: false }, { name: `**Reason:**`, value: `\`\`\`js\n${reason}\`\`\``, inline: false }]).setFooter({ text: `${interaction.guild.name} • Logs Information`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
    } else {
      return channel.send({
        embeds: [new EmbedBuilder().setTitle(`${emote}| ${reason}`).setColor(client.colors.none).setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true })).setDescription(`${description}`).setTimestamp().addFields([{ name: `**Requested By:**`, value: `**${member.user} | ${member.user.tag} | ${member.user.id}**`, inline: false }, { name: `**Target Channel:**`, value: `**${interaction.channel} | ${interaction.channel.name} | ${interaction.channel.id}**`, inline: false }, { name: `**Date:**`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`, inline: false }, { name: `**Reason:**`, value: `\`\`\`js\n${reason}\`\`\``, inline: false }]).setFooter({ text: `${interaction.guild.name} • Logs Information`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
    }
  },
  errorMessage: async function(client, message, error) {
    let member = message.guild.members.cache.find(m => m.id === message.member.id);
    let mes = {
      embeds: [new EmbedBuilder().setTitle('⛔️| **We Got An Error**').setColor(client.colors.red).setDescription(`${error}`).setFooter({ text: `Requested by ${member.user.tag} • Error • ${client.embed.footerText}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(message.guild.iconURL({ dynamic: true }))],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Error").setEmoji("⚠️").setCustomId("error").setDisabled(true))],
    };
    if (message.user) {
      await message.deferReply({ ephemeral: true })
      return message.followUp(mes)
    } else if (message.author) {
      return message.reply(mes)
    }
  },
  HelpCategoryEmbed: async function(prefix, CategoryName, client, message, component) {
    let db = client.db;
    let lang = await db.has(`guild_${message.guild.id}.language`) ? await db.get(`guild_${message.guild.id}.language`) : client.config.default_language;
    let mes = client.languages[lang].commands.help;
    let member = message.guild.members.cache.find(m => m.id === message.member.id);
    let embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({
        name: `${mes.embed1.author.replace("{username}", client.user.username)}`
      })
      .setTitle(`${CategoryName}`)
      .setFooter({
        text: `${mes.embed1.footer.replace("{user}", member.user.tag)}`,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setColor(client.colors.theme)

    let value_1 = "";
    let value_2 = "";
    client.messageCommands.filter(c => c.category === CategoryName).forEach((cmd) => {
      value_1 += `\n\n**${prefix}${cmd.name} ${cmd.usage ? cmd.usage : ""}**\n${mes.embed3.field1.value.replaceAll("{aliases}", cmd.aliases ? cmd.aliases.map(a => `\`${a}\``).join(', ') : "`no aliases`").replaceAll("{description}", cmd.description)}`
    })
    client.slashCommands.filter(c => c.category === CategoryName).forEach((cmd) => {
      let cm = client.application.commands.cache.find(c => c.name === cmd.name)
      let name = []
      let bb = cm.options ? cm.options.some(op => op.type === ApplicationCommandOptionType.Subcommand) ? cm.options.map((option) => { name.push(cm.name + " " + option.name) }) : name.push(`${cm.name}`) : name.push(`${cm.name}`)
      name.forEach(nm => {
        value_2 += `\n\n**${`</${nm}:${cm.id}>`}**\n${mes.embed3.field2.value.replaceAll("{description}", cm.options.some(op => op.type === ApplicationCommandOptionType.Subcommand) ? cm.options.map(op => op.name === nm.slice(`${cm.name} `.length) ? op.description : "").join("") : `${cm.description}`)}`;
      })
    })
    embed.addFields([{
      name: `${mes.embed3.field1.name}`,
      value: `${value_1 ? value_1 : mes.embed3.field1.value2}`,
      inline: false
    }, {
      name: `${mes.embed3.field2.name}`,
      value: `${value_2 ? value_2 : mes.embed3.field2.value2}`,
      inline: false
    }]);
    return message.update({
      embeds: [embed],
      components: component
    })
  },
  wait: async function(ms) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  },
  checkPing: async function(number) {
    let reaction = "🟢 Excellent";
    if (Number(number) > 70) reaction = "🟢 Good";
    if (Number(number) > 170) reaction = "🟡 Not Bad";
    if (Number(number) > 350) reaction = "🔴 Soo Bad";
    return reaction;
  },
  randomRange: async function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getAPI: async function(url) {
    try {
      let data = await axios.get(url, {
        headers: {
          Authorization: 'Basic MDE1NDQ1NTM1NDU0NDU1MzU0RDY6'
        }
      }).then(res => res.data);
      return data;
    } catch (e) {
      console.error(e)
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