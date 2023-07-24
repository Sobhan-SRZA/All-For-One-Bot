const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  PermissionsBitField,
  TextInputStyle,
  ButtonStyle,
  ChannelType,
  ComponentType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require('discord.js');
const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: "create",
  description: "Create a ticket channel.",
  category: 'Ticket 🎫',
  cooldown: 1,
  aliases: ['ticket', 'create ticket','t'],
  usage: "",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks", "ManageChannels"],
  run: async (client, message, args, lang, prefix) => {
    message.channel.sendTyping() 
    let db = client.db;
    let ticket = (await db.get(`guild_${message.guild.id}.tickets`)).find(c=> c.channelId === message.channel.id || c.user === message.author.id);
    let userTicketChannel = await message.guild.channels.cache.find(c => c.id === ticket?.channelId);
    let ticket_close = ticket?.closed;
    if (!ticket_close && userTicketChannel) return errorMessage(client, message, `️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${userTicketChannel}**`);
    let msg = await message.reply({
          embeds: [new EmbedBuilder().setTitle(`${client.emotes.ticket}| **Create Ticket**`).setColor(client.colors.theme).setTimestamp().setDescription(`If you want to create a ticket channel for yourself, you have to click to this emoji: "${client.emotes.ticket}" or else click to "${client.emotes.x}"`).setURL(client.config.discord.server_support).setFooter({ text: `Create Ticket • Requested by ${message.author.tag} • ${client.embed.footerText}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setThumbnail(message.guild.iconURL({ dynamic: true }))],
          components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('cmdTicketCreate').setEmoji(client.emotes.ticket).setLabel("Create Ticket").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('dont_do').setEmoji(client.emotes.x).setLabel('Cancel Process').setStyle(ButtonStyle.Danger))]
    })
    setTimeout(() => {
          msg.edit({
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true))]
          })
    }, 60 * 1000)
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