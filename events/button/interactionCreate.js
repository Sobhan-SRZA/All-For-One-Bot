const {
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ModalBuilder,
  ChannelType,
  TextInputStyle,
  TextInputBuilder,
  PermissionsBitField
} = require("discord.js");
const {
  errorMessage,
  logMessage,
  checkPing
} = require(`${process.cwd()}/functions/functions`);
const {
  createTranscript
} = require('discord-html-transcripts');
module.exports = async (client, interaction) => {
  try {
    if (!interaction.isButton()) return;
    //ticket system
    let db = client.db;
    let cmd = client.application.commands.cache.find(c => c.name === "close");
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = data?.find(t => t.channelId == interaction.channel.id || t.user == interaction.user.id);
    let userTicketChannel = await interaction.guild.channels.cache.find(c => c.id === ticket?.channelId);
    let ticketName = ticket?.channelName;
    let ticket_close = ticket?.closed;
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find(c => c.id === log);
    let admin_roles_has = await db.has(`guild_${interaction.guild.id}.admin_roles`);
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    let openCategoryHas = await db.has(`guild_${interaction.guild.id}.categories.open`);
    let openCategory = await db.get(`guild_${interaction.guild.id}.categories.open`);
    let closeCategoryHas = await db.has(`guild_${interaction.guild.id}.categories.close`);
    let closeCategory = await db.get(`guild_${interaction.guild.id}.categories.close`);
    let ticket_menu_option_has = await db.has(`guild_${interaction.guild.id}.panel.menu_options`);
    let ticket_menu_option = (await db.get(`guild_${interaction.guild.id}.panel.menu_options`))?.map(m => m.data);
    let ticket_type = await db.get(`guild_${interaction.guild.id}.ticket_type`) ? await db.get(`guild_${interaction.guild.id}.ticket_type`) : "Reason - Menu - UserTag (Default)";//"NoReason - Button - Counter (Default)";
    let ticket_user = interaction.guild.members.cache.find(m => m.id === ticket?.user);
    let ticket_new_user = interaction.guild.members.cache.find(m => m.id === ticket?.newUser);
    let claimed = ticket?.claimed;
    if (interaction.customId === "premium") {
      await interaction.deferReply({ ephemeral: true })
      await interaction.followUp({
        embeds: [new EmbedBuilder().setTitle(`${client.emotes.premium}| **Premium Info**`).setColor(client.colors.aqua).setDescription(`If you have a VIP role in the [Pc Development](${client.config.discord.server_support}) guild, I must congratulate you. Because with this role you can. Have special bot capabilities.\n\n${client.emotes.down}**What roles?**\n${client.emotes.reply}Have one of vip roles.\n\n${client.emotes.down}**How to have this role?**\n${client.emotes.reply}You just need to open the ticket to purchase the VIP role.\n\n${client.emotes.down}**What features does the VIP role have?**\n${client.emotes.reply}With this roll, you can explain to the bot developer that he will set up the bot for you in a custom and completely unique way.\nWe have other capabilities in mind for the bot, but we have to wait.`)],
        components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.premium).setLabel("Buy Premium").setURL(client.config.discord.server_support)])]
      })
    }
    if (interaction.customId === "update") {
      await interaction.deferReply({ ephemeral: true })
      await interaction.followUp({
        embeds: [new EmbedBuilder().setTitle(`${client.emotes.update}| **Bot New Updates**`).setColor(client.colors.theme).setDescription(`${client.config.newUpdate || "No Updates at yet."}`)],
      })
    }
    if (interaction.customId === "cancel" || interaction.customId === "dont_do") {
      await interaction.deferUpdate()
      await interaction.deleteReply()
    }
    if (interaction.customId === "report") {
      const content = new TextInputBuilder()
        .setCustomId('report')
        .setLabel("What do you want to report?")
        .setRequired(true)
        .setPlaceholder('Enter some text!')
        .setStyle(TextInputStyle.Paragraph)

      const modal = new ModalBuilder()
        .setCustomId('reporting')
        .setTitle('Reporting Bugs or Other Things')
        .addComponents(new ActionRowBuilder().addComponents(content));

      await interaction.showModal(modal);
    }

    //===== Create ticket
    if (interaction.customId == "cmdTicketCreate") {
      if (!ticket_close && userTicketChannel) return errorMessage(client, interaction, `️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${userTicketChannel}**`)
      if (ticket_type === "Reason - Menu - UserTag (Default)") {
        let row = [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`Select!!`).setOptions([{ label: "NoReason", value: "NoReason", emoji: client.emotes.tickets }]).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Cancel").setCustomId("dont_do").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support)])];
        if (ticket_menu_option_has) {
          row = [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`Select!!`).setOptions(ticket_menu_option).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Cancel").setCustomId("dont_do").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support)])];
        }

        await interaction.deferUpdate()
        await interaction.editReply({
          content: ` `,
          embeds: [],
          components: row
        })
      }
    }
    if (interaction.customId == "create_ticket") {
      if (!ticket_close && userTicketChannel) return errorMessage(client, interaction, `️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${userTicketChannel}**`)
      if (ticket_type === "Reason - Menu - UserTag (Default)") {
        let row = [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`Select!!`).setOptions([{ label: "NoReason", value: "NoReason", emoji: client.emotes.tickets }]).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Cancel").setCustomId("dont_do").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support)])];
        if (ticket_menu_option_has) {
          row = [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`Select `).setOptions(ticket_menu_option).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Cancel").setCustomId("dont_do").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support)])];
        }

        await interaction.deferReply({ ephemeral: true })
        await interaction.followUp({
          content: ` `,
          embeds: [],
          components: row
        })
      }
    }

    //Config Ticket Buttons
    //==== close ticket
    if (interaction.customId === "close") {
      await interaction.deferReply()
      await interaction.followUp({
        embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.close}| Close Ticket`).setDescription(`Dear friend, you requested for closing ${ticket_user?.user} ticket, are you sure for close here??`)],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Close"), new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("configTicket").setEmoji(client.emotes.close).setLabel("Close It"))]
      })
    }
    if (interaction.customId == 'configTicket') {
      await interaction.deferUpdate()
      await interaction.editReply({
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("configTicket").setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.open).setLabel("Open Ticket").setCustomId("open")).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("delete"))],
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.close + '| **Ticket Is Successfuly Closed**').setColor(client.colors.theme).setDescription(`**This ticket created by ${ticket_user?.user} now have bin Closed By ${interaction.user}.**`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n close the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })]
      })
      let newName = ticketName?.toString().replace("ticket-", "closed-");
      await interaction.channel.setName(`${newName}`);
      if (closeCategoryHas) {
        await interaction.channel.setParent(closeCategory)
      }
      await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
      await db.push(`guild_${interaction.guild.id}.tickets`, {
        channelId: interaction.channel.id,
        channelName: newName,
        user: ticket_user?.user.id,
        newUser: ticket_new_user?.user.id,
        closed: true,
        claimed: claimed
      });
      interaction.channel.permissionOverwrites.edit(ticket_user?.user.id, { ViewChannel: false });
      if (ticket_new_user?.user.id) interaction.channel.permissionOverwrites.edit(ticket_new_user?.user.id, { ViewChannel: false });
      let file = await createTranscript(interaction.channel, {
        limit: -1,
        returnType: 'attachment',
        filename: `transcript-${interaction.channel.name}.html`,
        saveImages: false,
        footerText: `Exported {number} message{s}.`,
        poweredBy: false
      })
      await ticket_user?.user.send({
        files: [file],
        embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`The \`${interaction.channel.name}\` tikcet channel from **${interaction.guild.name}** have bin closed for you by ${interaction.user}.`).setTitle(`${client.emotes.close}| Ticket Closed`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
      if (logsChannel) logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Closed`, client.emotes.close)
    }
    //==== open ticket
    if (interaction.customId === "open") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
      await interaction.deferReply()
      await interaction.followUp({
        embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.open}| Open Ticket`).setDescription(`Dear friend, you requested for openning ${ticket_user} ticket, are you sure for open here??`)],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId("reopenTicket").setEmoji(client.emotes.open).setLabel("Open It"))]
      })
    }
    if (interaction.customId == "reopenTicket") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.open + '| **Ticket Is Successfuly Open**').setColor(client.colors.theme).setDescription(`**This ticket created by ${ticket_user} now have bin user ticket have bin Opened by ${interaction.user}.**`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n open the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("close")).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.open).setLabel("Open Ticket").setCustomId("reopenTicket").setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("delete"))],
      });
      let newName = ticketName?.toString().replace("closed-", "ticket-");
      await interaction.channel.setName(`${newName}`);
      if (openCategoryHas) {
        await interaction.channel.setParent(openCategory)
      }
      await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
      await db.push(`guild_${interaction.guild.id}.tickets`, {
        channelId: interaction.channel.id,
        channelName: newName,
        user: ticket_user?.user.id,
        newUser: ticket_new_user?.user.id,
        closed: false,
        claimed: claimed
      });
      interaction.channel.permissionOverwrites.edit(ticket_user?.user.id, { ViewChannel: true });
      if (ticket_new_user?.user.id) interaction.channel.permissionOverwrites.edit(ticket_new_user?.user.id, { ViewChannel: true });
      if (logsChannel) logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Opend`, client.emotes.open)
    }
    //==== claim ticket
    if (interaction.customId === "claim") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
      await interaction.deferReply()
      await interaction.followUp({
        embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.claim}| Claim Ticket`).setDescription(`Dear friend, you requested for claim ${ticket_user?.user} ticket, are you sure for claim the ticket??`)],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Claim"), new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId("claimTicket").setEmoji(client.emotes.claim).setLabel("Claim It"))]
      })
    }
    if (interaction.customId == "claimTicket") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
      await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
      await db.push(`guild_${interaction.guild.id}.tickets`, {
        channelId: interaction.channel.id,
        channelName: ticketName,
        user: ticket_user?.user.id,
        newUser: ticket_new_user?.user.id,
        closed: ticket_close,
        claimed: interaction.user.id
      });
      if (admin_roles_has) {
        admin_roles.forEach(role => {
          interaction.channel.permissionOverwrites.edit(role, { ViewChannel: false })
        })
      }
      interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true })
        .then(async () => {
          await interaction.deferUpdate()
          await interaction.editReply({
            embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.claim + '| **Ticket Is Successfuly Claimed**').setColor(client.colors.theme).setDescription(`**This ticket created by ${ticket_user?.user} now have bin Claimed by ${interaction.user} .**`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n claim the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Claim Ticket").setEmoji(client.emotes.claim).setCustomId("claimTicket").setDisabled(true))],
          })
        });
      if (logsChannel) logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Cliamed`, client.emotes.claim)
    }
    //==== reanme ticklet
    if (interaction.customId == "renameTicketTrue") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
      let newName = await db.get(`guild_${interaction.guild.id}.name_${interaction.channel.id}`);
      interaction.channel.setName(newName);
      await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
      await db.push(`guild_${interaction.guild.id}.tickets`, {
        channelId: interaction.channel.id,
        channelName: newName,
        user: ticket_user?.user.id,
        newUser: ticket_new_user?.user.id,
        closed: ticket_close,
        claimed: claimed
      });
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.rename + '| **Ticket Is Successfuly Reanmed**').setColor(client.colors.theme).setDescription(`**this ticket name have bin changed successfuly${client.emotes.success}.\nthis ticket name is changed to: \`${newName}\`**`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n rename the last ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.rename).setLabel("Change Name").setCustomId("renameTicketTrue").setDisabled(true))]
      })

      if (logsChannel) logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Renamed`, client.emotes.rename)
    }
    if (interaction.customId == "renameTicketFalse") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
      await db.delete(`guild_${interaction.guild.id}.name_${interaction.channel.id}`)
      await interaction.deferUpdate()
      await interaction.deleteReply()
    }
    //====== add member
    if (interaction.customId == "addmemberTicket") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
      newUser = await db.get(`guild_${interaction.guild.id}.new_member_${interaction.channel.id}`);
      member = interaction.guild.members.cache.find(m => m.id === newUser);
      await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
      await db.push(`guild_${interaction.guild.id}.tickets`, {
        channelId: interaction.channel.id,
        channelName: ticketName,
        user: ticket_user?.user.id,
        newUser: member?.user.id,
        closed: ticket_close,
        claimed: claimed
      });
      interaction.channel.permissionOverwrites.edit(member?.user.id, { ViewChannel: true, SendMessages: true })
        .then(async () => {
          await interaction.deferUpdate()
          await interaction.editReply({
            embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(`${client.emotes.plus}| **Add People Is Successfuly**`).setColor(client.colors.theme).setDescription(`**I add this people** *${member?.user}* **to your ticket bro.**`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n add people in the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
            components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.plus).setLabel("Add Member").setCustomId("addmemberTicket").setDisabled(true)])]
          })
        })
      if (logsChannel) logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**\n\n**Ticket New User:\n${member?.user ? member?.user : member} | ${member?.user ? member?.user.tag : member?.name} | ${member?.user ? member?.user.id : member?.id}**`, `Ticket Invte People`, client.emotes.plus)

    }
    if (interaction.customId == "canceladdmemberTicket") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
      await db.delete(`guild_${interaction.guild.id}.new_member_${interaction.channel.id}`);
      await interaction.deferUpdate()
      await interaction.deleteReply()
    }
    //==== delete ticket
    if (interaction.customId === "delete") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
      await interaction.deferReply()
      await interaction.followUp({
        embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.trash}| Delete Ticket`).setDescription(`Dear friend, you requested for delete ${ticket_user?.user} ticket, are you sure for delete here??`)],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Delete"), new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("deleteTicket").setEmoji(client.emotes.trash).setLabel("Delete It"))]
      })
    }
    if (interaction.customId == "deleteTicket") {
      if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
      await interaction.deferUpdate()
      await interaction.editReply({
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("deleteTicket").setDisabled(true))],
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.trash + '| **Ticket Is Successfuly Deleted**').setColor(client.colors.theme).setDescription(`this user ${ticket_user?.user} ticket have bin deleted by ${interaction.user} in **<t:${Math.floor((new Date().getTime() + Math.floor(5 * 1000)) / 1000)}:R>**.\nplease wait.`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n delete the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
      let file = await createTranscript(interaction.channel, {
        limit: -1,
        returnType: 'attachment',
        filename: `transcript-${interaction.channel.name}.html`,
        saveImages: false,
        footerText: `Exported {number} message{s}.`,
        poweredBy: false
      })
      await interaction.user.send({
        files: [file],
        embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`The \`${interaction.channel.name}\` tikcet channel of ${ticket_user} from **${interaction.guild.name}** have bin deleted by you.`).setTitle(`${client.emotes.trash}| Successfully Ticket Deleted`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
      if (logsChannel) logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Deleted`, client.emotes.trash, true, file)
      setTimeout(async () => {
        await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
        interaction.channel.delete();
      }, 1000 * 5);
    }
  } catch (e) {
    console.log(e)
    //errorMessage(client, interaction, '```js\n' + e + '```')
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