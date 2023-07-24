const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require('discord.js');
const {
  wait,
  checkPing
} = require(`${process.cwd()}/functions/functions.js`);
module.exports = {
  name: 'ping',
  description: 'Get bot latency and ping.',
  category: 'Information 📊',
  type: ApplicationCommandType.ChatInput,
  cooldown: 2,
  aliases: ['pong'],
  usage: "",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  options: [{
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
    let mes = client.languages[lang].commands.ping;
    await interaction.followUp({
      embeds: [new EmbedBuilder().setColor(client.colors.theme).setDescription(mes.embed1.description).setTimestamp()],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setDisabled(true).setStyle(ButtonStyle.Primary).setCustomId("loading").setEmoji("🔃").setLabel(mes.button.btn1))]
    }).then(async (m) => {
      wait(200)
      await interaction.editReply({
        embeds: [new EmbedBuilder().setThumbnail(client.user.displayAvatarURL()).setColor(client.colors.theme).setDescription(mes.embed2.description.replaceAll("{emote_ping}", client.emotes.ping)).addFields([{ name: mes.embed2.field1.name, value: mes.embed2.field1.value.replaceAll("{ping}", Date.now() - interaction.createdTimestamp).replaceAll("{checkping}", await checkPing(`${Date.now() - interaction.createdTimestamp}`)), inline: false }, { name: mes.embed2.field2.name, value: mes.embed2.field2.value.replaceAll("{ping}", Math.round(client.ws.ping)).replaceAll("{checkping}", await checkPing(`${Math.round(client.ws.ping)}`)), inline: false }]).setTimestamp().setFooter({ text: mes.embed2.footer.replaceAll("{user}", interaction.user.tag), iconURL: `${interaction.user.displayAvatarURL()}` })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setDisabled(true).setStyle(ButtonStyle.Success).setCustomId("pong").setEmoji(client.emotes.ping).setLabel(mes.button.btn2))]
      })
    })
  },
  messageRun: async (client, message, args, lang, prefix) => {
    let mes = client.languages[lang].commands.ping;
    message.reply({
      embeds: [new EmbedBuilder().setColor(client.colors.theme).setDescription(mes.embed1.description).setTimestamp()],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setDisabled(true).setStyle(ButtonStyle.Primary).setCustomId("loading").setEmoji("🔃").setLabel(mes.button.btn1))]
    }).then(async (m) => {
      wait(200)
      m.edit({ embeds: [new EmbedBuilder().setThumbnail(client.user.displayAvatarURL()).setColor(client.colors.theme).setDescription(mes.embed2.description.replaceAll("{emote_ping}", client.emotes.ping)).addFields([{ name: mes.embed2.field1.name, value: mes.embed2.field1.value.replaceAll("{ping}", Date.now() - message.createdTimestamp).replaceAll("{checkping}", await checkPing(`${Date.now() - message.createdTimestamp}`)), inline: false }, { name: mes.embed2.field2.name, value: mes.embed2.field2.value.replaceAll("{ping}", Math.round(client.ws.ping)).replaceAll("{checkping}", await checkPing(`${Math.round(client.ws.ping)}`)), inline: false }]).setTimestamp().setFooter({ text: mes.embed2.footer.replaceAll("{user}", message.author.tag), iconURL: `${message.author.displayAvatarURL()}` })], components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setDisabled(true).setStyle(ButtonStyle.Success).setCustomId("pong").setEmoji(client.emotes.ping).setLabel(mes.button.btn2))] })
    })
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