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
  name: "close",
  description: "Close the ticket channel.",
  category: 'Ticket 🎫',
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks", "ManageChannels", "ViewChannel", "ReadMessageHistory"],
  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {
    let db = client.db;
    let ticketChannel = (await db.get(`guild_${interaction.guild.id}.tickets`)).find(c=> c.channelId === interaction.channel.id);
    let ticketControl = ticketChannel?.user;
    if(interaction.channel.name !== ticketChannel?.channelName) return errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel.**`);
    await interaction.followUp({
      embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.close}| Close Ticket`).setDescription(`Dear friend, you requested for closing ${interaction.guild.members.cache.find(c => c.id === ticketControl)} ticket, are you sure for close here??`)],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Close"), new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("configTicket").setEmoji(client.emotes.close).setLabel("Close It"))]
    })
    setTimeout(() => {
      interaction.editReply({
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