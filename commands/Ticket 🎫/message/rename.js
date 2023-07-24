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
  name: "rename",
  description: "Rename the ticket channel name.",
  category: 'Ticket 🎫',
  cooldown: 1,
  aliases: ['re','rename ticket'],
  usage: "[put-name]",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks", "ManageChannels"],
  run: async (client, message, args, lang, prefix) => {
    let db = client.db;
    let admin_roles = await db.get(`guild_${message.guild.id}.admin_roles`);
    let ticketChannel = (await db.get(`guild_${message.guild.id}.tickets`)).find(c=> c.channelId === message.channel.id);
    if(message.channel.name !== ticketChannel?.channelName) return errorMessage(client, message, `**My Friend, here is not a ticket channel please use this command in other channel.**`);
    if (!message.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !message.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
    let ticketName = args.join(" ");
    if (!ticketName) return errorMessage(client, message, "Please enter ticket new name.");
    await db.set(`guild_${message.guild.id}.name_${message.channel.id}`, ticketName);
    let msg = await message.reply({
            embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ` + message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.rename + '| **Request To Change Ticket Name**').setColor(client.colors.theme).setDescription("are you sure to change your ticket channel name??").setFooter({ text: "Change Name • " + client.embed.footerText, iconURL: message.guild.iconURL({ dynamic: true }) })],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.rename).setLabel("Change Name").setCustomId("renameTicketTrue"), new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.x).setLabel("Cancel").setCustomId("renameTicketFalse"))]
    })
    setTimeout(async() => {
            await db.delete(`guild_${message.guild.id}.name_${message.channel.id}`)
            await msg.edit({
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