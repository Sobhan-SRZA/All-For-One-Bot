const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SelectMenuBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require("discord.js");
const {
  logMessage,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = async (client, interaction) => {
  let db = client.db;
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId === "ticket_menu") {
    let cmd = client.application.commands.cache.find(c => c.name === "close");
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = data?.find(t => t.user === interaction.user.id || t.channelId === interaction.channel.id);
    let userTicketChannel = await interaction.guild.channels.cache.find(c => c.id === ticket?.channelId);
    let ticket_close = ticket?.closed;
    let claim_has = await db.get(`guild_${interaction.guild.id}.ticket_claim`);
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find(c => c.id === log);
    let check_admin_roles = await db.has(`guild_${interaction.guild.id}.admin_roles`);
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    let openCategoryHas = await db.has(`guild_${interaction.guild.id}.categories.open`);
    let openCategory = await db.get(`guild_${interaction.guild.id}.categories.open`);
    let channel_perm = {
      create: [{
        id: interaction.user.id,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      }, {
        id: interaction.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel]
      }]
    };
    if (check_admin_roles) {
      admin_roles.forEach(role => {
        channel_perm.create.push({
          id: role,
          allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
        })
      })
    }
    if (!ticket_close && userTicketChannel) return errorMessage(client, interaction, `️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${userTicketChannel}**`);
    interaction.values.forEach(async (value) => {
      interaction.guild.channels.create({
        name: `ticket-${interaction.user.tag}`,
        type: ChannelType.GuildText,
        reason: `create a ${value} ticket`,
        topic: `\n**ID:** ${interaction.user.id} \n**Tag:** ${interaction.user.tag} \n**Reason:** __${value}__\n**Use It For Close Ticket:** __</${cmd.name}:${cmd.id}>__`

      }).then(async (channel) => {
        if (openCategoryHas) {
          channel.setParent(openCategory)
        }
        channel.permissionOverwrites.set(channel_perm.create)
        await db.push(`guild_${interaction.guild.id}.tickets`, {
          channelId: channel.id,
          channelName: channel.name,
          user: interaction.user.id,
          newUser: null,
          closed: false,
          claimed: null
        })
        let row = new ActionRowBuilder();
        if (claim_has) {
          row.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Claim Ticket").setEmoji(client.emotes.claim).setCustomId("claim"))
        }
        channel.send({
          content: `<@${interaction.user.id}>`,
          embeds: [new EmbedBuilder().setFooter({ text: `Ticket Information • Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setDescription(`Welcome to the ticket channel. please explain briefly the reason for opening your ticket so that the server admins can handle your ticket as soon as possible. (please refrain from mentioning admins)\n\n**The Ticket Reason: \n${client.emotes.reply} \`${value}\`**`).setTitle(`${client.emotes.success}| Successfully Ticket Created`).setColor(client.colors.theme).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
          components: [row.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("close"))]
        }).then(async (msg) => {
          channel.messages.pin(msg.id)
        })
        await interaction.deferUpdate()
        await interaction.editReply({
          content: ` `,
          components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Ticket Created").setEmoji(client.emotes.mail).setCustomId("create_need_help_ticket").setDisabled(true))],
          embeds: [new EmbedBuilder().setTitle(`${client.emotes.success}| **Your Ticket Is Ready**`).setColor(client.colors.theme).setThumbnail(interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp().setDescription(`your ticket channel have bin created and please wait the moderators or admins to speek there.\n\n**The Channel: ${channel} | ${channel.name} | ${channel.id}\n\nYour Ticket Reason:  \n${client.emotes.reply} \`${value}\`**`).setFooter({ text: `Requested by ${interaction.user.tag} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })]
        })
        if (logsChannel) logMessage(client, interaction, logsChannel, `**Ticket Channel:**\n**${channel} | ${channel.name} | ${channel.id}**`, `Create ${value} Ticket`, client.emotes.ticket)
      })
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