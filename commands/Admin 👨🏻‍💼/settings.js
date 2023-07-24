const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ChannelSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  PermissionsBitField,
  TextInputStyle
} = require('discord.js');
const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'settings',
  category: 'Admin 👨🏻‍💼',
  type: ApplicationCommandType.ChatInput,
  aliases: ['setup', 'set', 'st'],
  usage: "",
  cooldown: 10,
  description: "Show a dashboard of guild setting for you.",
  userPermissions: ["ManageChannels", "ManageGuild", "SendMessages"],
  botPermissions: ["ManageChannels", "SendMessages", "EmbedLinks"],
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
  interactionRun: async (client, interaction, args, lang) => {
    let db = client.db;
    try {
      let time = 120000;
      let menu = new StringSelectMenuBuilder().setCustomId("setup_menu").setMaxValues(1).setMinValues(1).setPlaceholder(`Click me to setup !!`).addOptions([{ label: `Setup Bot Language`, value: `stlanguage`, emoji: `${client.emotes.language}` }, { label: `Setup Ticket Panel`, value: `stpanel`, emoji: `${client.emotes.ticket}` }, { label: `Setup Admin Role`, value: `stadmin`, emoji: `${client.emotes.admin}` }, { label: `Setup Ticket Category`, value: `stcategory`, emoji: `${client.emotes.category}` }, { label: `Setup Ticket Log`, value: `stlog`, emoji: `${client.emotes.log}` }, { label: `Setup Ticket Type`, value: `sttype`, emoji: `${client.emotes.type}` }, { label: `Setup Ticket Menu Option`, value: `stoption`, emoji: `${client.emotes.option}` }, { label: `Setup Ticket Claim`, value: `stclaim`, emoji: `${client.emotes.claim}` }])

      let msg = await interaction.followUp({
        embeds: [new EmbedBuilder().setTitle(`${client.emotes.setting}| Welcome to the setting`).setColor(client.colors.theme).setDescription(`This is __${client.user.username}__ setting from **${interaction.guild.name}** and you can setup all things you need for setting up your guild.`).addFields([{ name: `${client.emotes.down}Bot Language:`, value: `${client.emotes.reply} ${client.emotes[lang]}|${client.findlang[lang]}`, inline: false }, { name: `${client.emotes.down}Guild Ticket Type:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket_type`) ? `${client.emotes.reply} \`${await db.get(`guild_${interaction.guild.id}.ticket_type`)}\`` : `${client.emotes.reply} \`Reason - Menu - UserTag (Default)\``}`, inline: false }, { name: `${client.emotes.down}Ticket Claim:`, value: `${await db.get(`guild_${interaction.guild.id}.ticket_claim`) === true ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Admin Role:`, value: `${await db.has(`guild_${interaction.guild.id}.admin_roles`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${interaction.guild.id}.admin_roles`)).map(r => `<@&${r}>`).join(', ')}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Mod Log:`, value: `${await db.has(`guild_${interaction.guild.id}.modlog`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${interaction.guild.id}.modlog`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Parent Channel:`, value: `${await db.has(`guild_${interaction.guild.id}.categories`) ? `${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Open Channel:\n${await db.has(`guild_${interaction.guild.id}.categories.open`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${interaction.guild.id}.categories.open`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}\n\n${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Close Channel:\n${await db.has(`guild_${interaction.guild.id}.categories.close`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${interaction.guild.id}.categories.close`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Ticket Menu Option:`, value: `${await db.has(`guild_${interaction.guild.id}.panel.menu_options`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${interaction.guild.id}.panel.menu_options`)).map(o => `**Name:** \`${o.data.value}\` ${o.data.emoji ? `| **Emoji:** ${o.data.emoji}` : ""}`).join(`\n${client.emotes.reply}`)}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }]).setFooter({ text: `Setting • Requested By ${interaction.user.tag} `, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(interaction.guild.iconURL({ dynamic: true })).setTimestamp()],
        components: [new ActionRowBuilder().addComponents(menu), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setDisabled(true).setEmoji(client.emotes.home).setCustomId("home_page"))],
        fetchReply: true
      })

      let collector = await msg.createMessageComponentCollector({ time: time })
      collector.on('collect', async (m) => {
        if (m.user.id === interaction.user.id) {
          if (m.isButton()) {
            if (m.customId === "home_page") {
              await m.update({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.setting}| Welcome to the setting`).setColor(client.colors.theme).setDescription(`This is __${client.user.username}__ setting from **${m.guild.name}** and you can setup all things you need for setting up your guild.`).addFields([{ name: `${client.emotes.down}Bot Language:`, value: `${client.emotes.reply} ${client.emotes[lang]}|${client.findlang[lang]}`, inline: false }, { name: `${client.emotes.down}Guild Ticket Type:`, value: `${await db.has(`guild_${m.guild.id}.ticket_type`) ? `${client.emotes.reply} \`${await db.get(`guild_${m.guild.id}.ticket_type`)}\`` : `${client.emotes.reply} \`Reason - Menu - UserTag (Default)\``}`, inline: false }, { name: `${client.emotes.down}Ticket Claim:`, value: `${await db.get(`guild_${m.guild.id}.ticket_claim`) === true ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Admin Role:`, value: `${await db.has(`guild_${m.guild.id}.admin_roles`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${m.guild.id}.admin_roles`)).map(r => `<@&${r}>`).join(', ')}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Mod Log:`, value: `${await db.has(`guild_${m.guild.id}.modlog`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${m.guild.id}.modlog`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Parent Channel:`, value: `${await db.has(`guild_${m.guild.id}.categories`) ? `${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Open Channel:\n${await db.has(`guild_${m.guild.id}.categories.open`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${m.guild.id}.categories.open`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}\n\n${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Close Channel:\n${await db.has(`guild_${m.guild.id}.categories.close`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${m.guild.id}.categories.close`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Ticket Menu Option:`, value: `${await db.has(`guild_${m.guild.id}.panel.menu_options`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${m.guild.id}.panel.menu_options`)).map(o => `**Name:** \`${o.data.value}\` ${o.data.emoji ? `| **Emoji:** ${o.data.emoji}` : ""}`).join(`\n${client.emotes.reply}`)}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }]).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true })).setTimestamp()],
                components: [new ActionRowBuilder().addComponents(menu), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(true))],
              })
            }
            if (m.customId === "menu_options") {
              const input_1 = new TextInputBuilder()
                .setCustomId('name')
                .setLabel("What is option name?")
                .setRequired(true)
                .setPlaceholder('Enter some text!')
                .setStyle(TextInputStyle.Short)
              const input_2 = new TextInputBuilder()
                .setCustomId('emoji')
                .setLabel("What is option emoji?")
                .setRequired(false)
                .setPlaceholder('Enter some emoji!')
                .setStyle(TextInputStyle.Short)
              const modal = new ModalBuilder()
                .setCustomId('menu_option_modal')
                .setTitle('Ticket System Menu Option')
                .addComponents(new ActionRowBuilder().addComponents(input_1), new ActionRowBuilder().addComponents(input_2));
              await m.showModal(modal)
            }
            if (m.customId === "panel_message") {
              let channel_id = await db.get(`guild_${m.guild.id}.panel.channel`);
              let channel = await m.guild.channels.cache.find(c => c.id === channel_id)
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`**setup your guild ticket system in ${channel} with default or customize.**`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('panel_message_default').setEmoji(client.emotes.system).setLabel("Setup Panel Message To Default").setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId('panel_message_custom').setEmoji(client.emotes.hamer).setLabel("Setup Panel Message To Customize").setStyle(ButtonStyle.Success)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (m.customId === "panel_message_custom") {
              let ticket_modal = new ModalBuilder()
                .setCustomId("panel_message_modal")
                .setTitle("Setup Ticket")
              ticket_modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_title").setLabel("Embed Title").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Embed Title Here ...").setRequired(false)), new ActionRowBuilder().addComponents([new TextInputBuilder().setCustomId("ticket_description").setLabel("Embed Description").setStyle(TextInputStyle.Paragraph).setPlaceholder("Place Ticket Embed Description Here ...").setRequired(true)]), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_color").setLabel("Embed Color").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Embed Color Hex Code Here ...").setRequired(false)), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_button_name").setLabel("Button Name").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Button Name Here ...").setRequired(false)), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_button_emoji").setLabel("Button Emoji").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Button Emoji Here ...").setRequired(false)))
              await m.showModal(ticket_modal)
            }
            if (m.customId === "panel_message_default") {
              let channel_id = await db.get(`guild_${m.guild.id}.panel.channel`);
              let channel = await m.guild.channels.cache.find(c => c.id === channel_id)
              let embed = new EmbedBuilder().setColor(client.colors.theme)
              embed.setTitle(`${client.emotes.ticket}| Ticket System`)
              embed.setDescription(`To create a ticket channel click to ${client.emotes.mail}`)
              embed.setFooter({
                text: `${client.embed.footerText}`,
                iconURL: m.guild.iconURL({ dynamic: true })
              })
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(client.emotes.success + '| **Panel Message Is Successfuly Setuped To Default**').setColor(client.colors.theme).setDescription(`**setup server ticket system in ${channel} to default type is successfully.**`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Setup Panel Message To Default").setStyle(ButtonStyle.Primary).setDisabled(true)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
              await channel.send({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('create_ticket').setEmoji(client.emotes.mail).setLabel("Create Ticket").setStyle(ButtonStyle.Success))]
              })
            }
            if (m.customId === "claim_off") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`**setup your guild ticket claim to disabled${client.emotes.disable1}${client.emotes.disable2}**`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('claim_off').setEmoji(client.emotes.x).setLabel("Disabled Ticket Claim").setStyle(ButtonStyle.Secondary).setDisabled(true), new ButtonBuilder().setCustomId('claim_on').setEmoji(client.emotes.tick).setLabel("Enable Ticket Claim").setStyle(ButtonStyle.Success)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
              await db.set(`guild_${m.guild.id}.ticket_claim`, false)
            }
            if (m.customId === "claim_on") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`**setup your guild ticket claim to enabled${client.emotes.enable1}${client.emotes.enable2}**`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('claim_off').setEmoji(client.emotes.x).setLabel("Disabled Ticket Claim").setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('claim_on').setEmoji(client.emotes.tick).setLabel("Enable Ticket Claim").setStyle(ButtonStyle.Success).setDisabled(true)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
              await db.set(`guild_${m.guild.id}.ticket_claim`, true)
            }
            if (m.customId === "parent_open") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setting`).setColor(client.colors.theme).setDescription(`Select category channel you need to add on bot **parent open channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_open', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Open Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (m.customId === "parent_close") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setting`).setColor(client.colors.theme).setDescription(`Select category channel you need to add on bot **parent close channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_close', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Close Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_close"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (m.customId === "remove_admin_roles") {
              if (await db.has(`guild_${m.guild.id}.admin_roles`)) {
                await db.delete(`guild_${m.guild.id}.admin_roles`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Disabled`).setColor(client.colors.theme).setDescription(`**admin role** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'theme', placeholder: 'Admin Role Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_roles").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *admin role* setup it:**\n Select  role you need to add on bot **admin role** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'admin_roles', placeholder: 'Select Some Roles!!' })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_roles").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_parent") {
              if (await db.has(`guild_${m.guild.id}.categories`)) {
                await db.delete(`guild_${m.guild.id}.categories`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Open Channel').setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Close Channel').setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent open channel* setup it:**\nSelect module of channel you need to add on bot **parent channel** on button below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Open Channel').setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Close Channel').setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_parent_open") {
              if (await db.has(`guild_${m.guild.id}.categories.open`)) {
                await db.delete(`guild_${m.guild.id}.categories.open`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent open channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_open', placeholder: 'Parent Open Channel Is Disabled!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Open Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_open").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent open channel* setup it:**\nSelect category channel you need to add on bot **parent open channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_open', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Open Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_open").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_parent_close") {
              if (await db.has(`guild_${m.guild.id}.categories.close`)) {
                await db.delete(`guild_${m.guild.id}.categories.close`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent close channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_close', placeholder: 'Parent Close Channel Is Disabled!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Close Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_close").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent close channel* setup it:**\nSelect category channel you need to add on bot **parent close channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_close', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Close Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_close").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_mod_log") {
              if (await db.has(`guild_${m.guild.id}.modlog`)) {
                await db.delete(`guild_${m.guild.id}.modlog`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Disabled`).setColor(client.colors.theme).setDescription(`**mod log** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'theme', placeholder: 'Mod Log Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *mod log* setup it:**\nSelect channel you need to add on bot **mod log** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'mod_log', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_panel_channel") {
              if (await db.has(`guild_${m.guild.id}.ticket.panel`)) {
                await db.delete(`guild_${m.guild.id}.panel.channel`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Disabled`).setColor(client.colors.theme).setDescription(`**mod log** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'theme', placeholder: 'Mod Log Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *panel channel* setup it:**\nSelect you need to add on bot **panel channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'panel_channel', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Panel Channel').setEmoji(client.emotes.trash).setCustomId("remove_panel_channel").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_menu_option") {
              if (await db.has(`guild_${m.guild.id}.panel.menu_options`)) {
                await db.delete(`guild_${m.guild.id}.panel.menu_options`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Disabled`).setColor(client.colors.theme).setDescription(`**menu option** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *menu option* setup it:**\nSelect channel you need to add on bot **menu option** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
          }
          if (m.isStringSelectMenu()) {
            if (m.customId === "setup_menu") {
              if (m.values[0] === "stpanel") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`please select channel you need to add on bot **panel channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'panel_channel', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Panel Channel').setEmoji(client.emotes.trash).setCustomId("remove_panel_channel"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stclaim") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`please click on two button in blew for setup **ticket claim** to ON or OFF.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Disable').setEmoji(client.emotes.x).setCustomId(`claim_off`), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Enabele').setEmoji(client.emotes.tick).setCustomId(`claim_on`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stlanguage") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Bot Language Setting`).setColor(client.colors.theme).setDescription(`please select some languages you need to add on bot **language** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setMaxValues(1).setMinValues(1).setPlaceholder(`In Select!!`).setCustomId(`bot_language`).addOptions([{ label: "English (en-US)", value: "en-US", emoji: client.emotes["en-US"] }, { label: "Persian (per)", value: "per", emoji: client.emotes["per"] }])), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stadmin") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setting`).setColor(client.colors.theme).setDescription(`please select  role you need to add on bot **admin role** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'admin_roles', placeholder: 'Select Some Roles!!', maxValues: 5 })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_roles"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stcategory") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setting`).setColor(client.colors.theme).setDescription(`please select module of channel you need to add on bot **parent channel** on button below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Open Channel').setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Close Channel').setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stlog") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setting`).setColor(client.colors.theme).setDescription(`please select channel you need to add on bot **mod log** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'mod_log', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stoption") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Menu Option Setting`).setColor(client.colors.theme).setDescription(`please click and write option you need to add on bot **menu option** on button below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "sttype") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Type Setting`).setColor(client.colors.theme).setDescription(`In soon...`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "bot_language") {
              m.values.forEach(async (value) => {
                await db.set(`guild_${m.guild.id}.language`, value)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Bot Language Setuped`).setColor(client.colors.theme).setDescription(`bot **language** successfully in guild have setuped to \`${value}\`.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setMaxValues(1).setMinValues(1).setPlaceholder(`In Select!!`).setCustomId(`bot_language`).setDisabled(true).addOptions([{ label: "English (en-US)", value: "en-US", emoji: client.emotes["en-US"] }, { label: "Persian (per)", value: "per", emoji: client.emotes["per"] }])), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
          }
          if (m.isChannelSelectMenu()) {
            if (m.customId === "parent_open") {
              m.values.forEach(async (value) => {
                let channel = m.guild.channels.cache.find(r => r.id === value);
                await db.set(`guild_${m.guild.id}.categories.open`, channel.id)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **parent open channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_open', placeholder: 'Parent Open Channel Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Open Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
            if (m.customId === "parent_close") {
              m.values.forEach(async (value) => {
                let channel = m.guild.channels.cache.find(r => r.id === value);
                await db.set(`guild_${m.guild.id}.categories.close`, channel.id)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **parent close channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_close', placeholder: 'Parent Close Channel Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Close Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_close"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
            if (m.customId === "mod_log") {
              m.values.forEach(async (value) => {
                let channel = m.guild.channels.cache.find(r => r.id === value);
                await db.set(`guild_${m.guild.id}.modlog`, channel.id)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setuped`).setColor(client.colors.theme).setDescription(`guild **mod log** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'theme', placeholder: 'Mod Log Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
            if (m.customId === "panel_channel") {
              m.values.forEach(async (value) => {
                let channel = m.guild.channels.cache.find(r => r.id === value);
                await db.set(`guild_${m.guild.id}.panel.channel`, channel.id)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Panel Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **panel channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'theme', placeholder: 'Panel Channel Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Next Step').setEmoji(client.emotes.next).setCustomId(`panel_message`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Panel Channel').setEmoji(client.emotes.trash).setCustomId("remove_panel_channel"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
          }
          if (m.isRoleSelectMenu()) {
            if (m.customId === "admin_roles") {
              let roles = []
              await m.values.forEach(async (value) => {
                await db.push(`guild_${m.guild.id}.admin_roles`, value)
                roles.push(value)
              })
              //let roles = await db.get(`guild_${m.guild.id}.admin_roles`);
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setuped`).setColor(client.colors.theme).setDescription(`guild **admin role** successfully setuped to ${roles.map(r => `<@&${r}>`).join(', ')}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'theme', placeholder: 'Admin Role Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_roles"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          }
        } else {
          errorMessage(client, m, `This interaction only for ${interaction.user} and you can't use it.`)
        }
      })
      setTimeout(async () => {
        await interaction.editReply({
          components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))]
        })
      }, time)
    } catch (e) {
      console.error(e)
      errorMessage(client, interaction, `\`\`\`js\n${e}\`\`\``)
    }
  },
  messageRun: async (client, message, args, lang, prefix) => {
    let db = client.db;
    try {
      let time = 120000;
      let menu = new StringSelectMenuBuilder().setCustomId("setup_menu").setMaxValues(1).setMinValues(1).setPlaceholder(`Click me to setup !!`).addOptions([{ label: `Setup Bot Language`, value: `stlanguage`, emoji: `${client.emotes.language}` }, { label: `Setup Ticket Panel`, value: `stpanel`, emoji: `${client.emotes.ticket}` }, { label: `Setup Admin Role`, value: `stadmin`, emoji: `${client.emotes.admin}` }, { label: `Setup Ticket Category`, value: `stcategory`, emoji: `${client.emotes.category}` }, { label: `Setup Ticket Log`, value: `stlog`, emoji: `${client.emotes.log}` }, { label: `Setup Ticket Type`, value: `sttype`, emoji: `${client.emotes.type}` }, { label: `Setup Ticket Menu Option`, value: `stoption`, emoji: `${client.emotes.option}` }, { label: `Setup Ticket Claim`, value: `stclaim`, emoji: `${client.emotes.claim}` }])
      let msg = await message.reply({
        embeds: [new EmbedBuilder().setTitle(`${client.emotes.setting}| Welcome to the setting`).setColor(client.colors.theme).setDescription(`This is __${client.user.username}__ setting from **${message.guild.name}** and you can setup all things you need for setting up your guild.`).addFields([{ name: `${client.emotes.down}Bot Language:`, value: `${client.emotes.reply} ${client.emotes[lang]}|${client.findlang[lang]}`, inline: false }, { name: `${client.emotes.down}Guild Ticket Type:`, value: `${await db.has(`guild_${message.guild.id}.ticket_type`) ? `${client.emotes.reply} \`${await db.get(`guild_${message.guild.id}.ticket_type`)}\`` : `${client.emotes.reply} \`Reason - Menu - UserTag (Default)\``}`, inline: false }, { name: `${client.emotes.down}Ticket Claim:`, value: `${await db.get(`guild_${message.guild.id}.ticket_claim`) === true ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Admin Role:`, value: `${await db.has(`guild_${message.guild.id}.admin_roles`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${message.guild.id}.admin_roles`)).map(r => `<@&${r}>`).join(', ')}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Mod Log:`, value: `${await db.has(`guild_${message.guild.id}.modlog`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${message.guild.id}.modlog`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Parent Channel:`, value: `${await db.has(`guild_${message.guild.id}.categories`) ? `${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Open Channel:\n${await db.has(`guild_${message.guild.id}.categories.open`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${message.guild.id}.categories.open`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}\n\n${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Close Channel:\n${await db.has(`guild_${message.guild.id}.categories.close`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${message.guild.id}.categories.close`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Ticket Menu Option:`, value: `${await db.has(`guild_${message.guild.id}.panel.menu_options`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${message.guild.id}.panel.menu_options`)).map(o => `**Name:** \`${o.data.value}\` ${o.data.emoji ? `| **Emoji:** ${o.data.emoji}` : ""}`).join(`\n${client.emotes.reply}`)}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }]).setFooter({ text: `Setting • Requested By ${message.author.tag} `, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setThumbnail(message.guild.iconURL({ dynamic: true })).setTimestamp()],
        components: [new ActionRowBuilder().addComponents(menu), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setDisabled(true).setEmoji(client.emotes.home).setCustomId("home_page"))],
        fetchReply: true
      })

      let collector = await msg.createMessageComponentCollector({ time: time })
      collector.on('collect', async (m) => {
        if (m.user.id === message.author.id) {
          if (m.isButton()) {
            if (m.customId === "home_page") {
              await m.update({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.setting}| Welcome to the setting`).setColor(client.colors.theme).setDescription(`This is __${client.user.username}__ setting from **${m.guild.name}** and you can setup all things you need for setting up your guild.`).addFields([{ name: `${client.emotes.down}Bot Language:`, value: `${client.emotes.reply} ${client.emotes[lang]}|${client.findlang[lang]}`, inline: false }, { name: `${client.emotes.down}Guild Ticket Type:`, value: `${await db.has(`guild_${m.guild.id}.ticket_type`) ? `${client.emotes.reply} \`${await db.get(`guild_${m.guild.id}.ticket_type`)}\`` : `${client.emotes.reply} \`Reason - Menu - UserTag (Default)\``}`, inline: false }, { name: `${client.emotes.down}Ticket Claim:`, value: `${await db.get(`guild_${m.guild.id}.ticket_claim`) === true ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Admin Role:`, value: `${await db.has(`guild_${m.guild.id}.admin_roles`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${m.guild.id}.admin_roles`)).map(r => `<@&${r}>`).join(', ')}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Mod Log:`, value: `${await db.has(`guild_${m.guild.id}.modlog`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${m.guild.id}.modlog`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Parent Channel:`, value: `${await db.has(`guild_${m.guild.id}.categories`) ? `${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Open Channel:\n${await db.has(`guild_${m.guild.id}.categories.open`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${m.guild.id}.categories.open`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}\n\n${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Close Channel:\n${await db.has(`guild_${m.guild.id}.categories.close`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${m.guild.id}.categories.close`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `${client.emotes.down}Guild Ticket Menu Option:`, value: `${await db.has(`guild_${m.guild.id}.panel.menu_options`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${m.guild.id}.panel.menu_options`)).map(o => `**Name:** \`${o.data.value}\` ${o.data.emoji ? `| **Emoji:** ${o.data.emoji}` : ""}`).join(`\n${client.emotes.reply}`)}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }]).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true })).setTimestamp()],
                components: [new ActionRowBuilder().addComponents(menu), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(true))],
              })
            }
            if (m.customId === "menu_options") {
              const input_1 = new TextInputBuilder()
                .setCustomId('name')
                .setLabel("What is option name?")
                .setRequired(true)
                .setPlaceholder('Enter some text!')
                .setStyle(TextInputStyle.Short)
              const input_2 = new TextInputBuilder()
                .setCustomId('emoji')
                .setLabel("What is option emoji?")
                .setRequired(false)
                .setPlaceholder('Enter some emoji!')
                .setStyle(TextInputStyle.Short)
              const modal = new ModalBuilder()
                .setCustomId('menu_option_modal')
                .setTitle('Ticket System Menu Option')
                .addComponents(new ActionRowBuilder().addComponents(input_1), new ActionRowBuilder().addComponents(input_2));
              await m.showModal(modal)
            }
            if (m.customId === "panel_message") {
              let channel_id = await db.get(`guild_${m.guild.id}.panel.channel`);
              let channel = await m.guild.channels.cache.find(c => c.id === channel_id)
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`**setup your guild ticket system in ${channel} with default or customize.**`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('panel_message_default').setEmoji(client.emotes.system).setLabel("Setup Panel Message To Default").setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId('panel_message_custom').setEmoji(client.emotes.hamer).setLabel("Setup Panel Message To Customize").setStyle(ButtonStyle.Success)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (m.customId === "panel_message_custom") {
              let ticket_modal = new ModalBuilder()
                .setCustomId("panel_message_modal")
                .setTitle("Setup Ticket")
              ticket_modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_title").setLabel("Embed Title").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Embed Title Here ...").setRequired(false)), new ActionRowBuilder().addComponents([new TextInputBuilder().setCustomId("ticket_description").setLabel("Embed Description").setStyle(TextInputStyle.Paragraph).setPlaceholder("Place Ticket Embed Description Here ...").setRequired(true)]), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_color").setLabel("Embed Color").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Embed Color Hex Code Here ...").setRequired(false)), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_button_name").setLabel("Button Name").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Button Name Here ...").setRequired(false)), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_button_emoji").setLabel("Button Emoji").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Button Emoji Here ...").setRequired(false)))
              await m.showModal(ticket_modal)
            }
            if (m.customId === "panel_message_default") {
              let channel_id = await db.get(`guild_${m.guild.id}.panel.channel`);
              let channel = await m.guild.channels.cache.find(c => c.id === channel_id)
              let embed = new EmbedBuilder().setColor(client.colors.theme)
              embed.setTitle(`${client.emotes.ticket}| Ticket System`)
              embed.setDescription(`To create a ticket channel click to ${client.emotes.mail}`)
              embed.setFooter({
                text: `${client.embed.footerText}`,
                iconURL: m.guild.iconURL({ dynamic: true })
              })
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(client.emotes.success + '| **Panel Message Is Successfuly Setuped To Default**').setColor(client.colors.theme).setDescription(`**setup server ticket system in ${channel} to default type is successfully.**`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Setup Panel Message To Default").setStyle(ButtonStyle.Primary).setDisabled(true)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
              await channel.send({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('create_ticket').setEmoji(client.emotes.mail).setLabel("Create Ticket").setStyle(ButtonStyle.Success))]
              })
            }
            if (m.customId === "claim_off") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`**setup your guild ticket claim to disabled${client.emotes.disable1}${client.emotes.disable2}**`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('claim_off').setEmoji(client.emotes.x).setLabel("Disabled Ticket Claim").setStyle(ButtonStyle.Secondary).setDisabled(true), new ButtonBuilder().setCustomId('claim_on').setEmoji(client.emotes.tick).setLabel("Enable Ticket Claim").setStyle(ButtonStyle.Success)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
              await db.set(`guild_${m.guild.id}.ticket_claim`, false)
            }
            if (m.customId === "claim_on") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`**setup your guild ticket claim to enabled${client.emotes.enable1}${client.emotes.enable2}**`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('claim_off').setEmoji(client.emotes.x).setLabel("Disabled Ticket Claim").setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('claim_on').setEmoji(client.emotes.tick).setLabel("Enable Ticket Claim").setStyle(ButtonStyle.Success).setDisabled(true)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
              await db.set(`guild_${m.guild.id}.ticket_claim`, true)
            }
            if (m.customId === "parent_open") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setting`).setColor(client.colors.theme).setDescription(`Select category channel you need to add on bot **parent open channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_open', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Open Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (m.customId === "parent_close") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setting`).setColor(client.colors.theme).setDescription(`Select category channel you need to add on bot **parent close channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_close', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Close Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_close"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (m.customId === "remove_admin_roles") {
              if (await db.has(`guild_${m.guild.id}.admin_roles`)) {
                await db.delete(`guild_${m.guild.id}.admin_roles`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Disabled`).setColor(client.colors.theme).setDescription(`**admin role** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'theme', placeholder: 'Admin Role Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_roles").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *admin role* setup it:**\n Select  role you need to add on bot **admin role** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'admin_roles', placeholder: 'Select Some Roles!!' })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_roles").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_parent") {
              if (await db.has(`guild_${m.guild.id}.categories`)) {
                await db.delete(`guild_${m.guild.id}.categories`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Open Channel').setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Close Channel').setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent open channel* setup it:**\nSelect module of channel you need to add on bot **parent channel** on button below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Open Channel').setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Close Channel').setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_parent_open") {
              if (await db.has(`guild_${m.guild.id}.categories.open`)) {
                await db.delete(`guild_${m.guild.id}.categories.open`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent open channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_open', placeholder: 'Parent Open Channel Is Disabled!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Open Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_open").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent open channel* setup it:**\nSelect category channel you need to add on bot **parent open channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_open', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Open Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_open").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_parent_close") {
              if (await db.has(`guild_${m.guild.id}.categories.close`)) {
                await db.delete(`guild_${m.guild.id}.categories.close`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent close channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_close', placeholder: 'Parent Close Channel Is Disabled!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Close Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_close").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent close channel* setup it:**\nSelect category channel you need to add on bot **parent close channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_close', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Close Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_close").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_mod_log") {
              if (await db.has(`guild_${m.guild.id}.modlog`)) {
                await db.delete(`guild_${m.guild.id}.modlog`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Disabled`).setColor(client.colors.theme).setDescription(`**mod log** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'theme', placeholder: 'Mod Log Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *mod log* setup it:**\nSelect channel you need to add on bot **mod log** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'mod_log', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_panel_channel") {
              if (await db.has(`guild_${m.guild.id}.ticket.panel`)) {
                await db.delete(`guild_${m.guild.id}.panel.channel`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Disabled`).setColor(client.colors.theme).setDescription(`**mod log** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'theme', placeholder: 'Mod Log Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *panel channel* setup it:**\nSelect you need to add on bot **panel channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'panel_channel', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Panel Channel').setEmoji(client.emotes.trash).setCustomId("remove_panel_channel").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "remove_menu_option") {
              if (await db.has(`guild_${m.guild.id}.panel.menu_options`)) {
                await db.delete(`guild_${m.guild.id}.panel.menu_options`)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Disabled`).setColor(client.colors.theme).setDescription(`**menu option** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              } else {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *menu option* setup it:**\nSelect channel you need to add on bot **menu option** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
          }
          if (m.isStringSelectMenu()) {
            if (m.customId === "setup_menu") {
              if (m.values[0] === "stpanel") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`please select channel you need to add on bot **panel channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'panel_channel', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Panel Channel').setEmoji(client.emotes.trash).setCustomId("remove_panel_channel"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stclaim") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`please click on two button in blew for setup **ticket claim** to ON or OFF.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Disable').setEmoji(client.emotes.x).setCustomId(`claim_off`), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Enabele').setEmoji(client.emotes.tick).setCustomId(`claim_on`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stlanguage") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Bot Language Setting`).setColor(client.colors.theme).setDescription(`please select some languages you need to add on bot **language** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setMaxValues(1).setMinValues(1).setPlaceholder(`In Select!!`).setCustomId(`bot_language`).addOptions([{ label: "English (en-US)", value: "en-US", emoji: client.emotes["en-US"] }, { label: "Persian (per)", value: "per", emoji: client.emotes["per"] }])), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stadmin") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setting`).setColor(client.colors.theme).setDescription(`please select  role you need to add on bot **admin role** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'admin_roles', placeholder: 'Select Some Roles!!', maxValues: 5 })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_roles"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stcategory") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setting`).setColor(client.colors.theme).setDescription(`please select module of channel you need to add on bot **parent channel** on button below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Open Channel').setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Parent Close Channel').setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stlog") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setting`).setColor(client.colors.theme).setDescription(`please select channel you need to add on bot **mod log** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'mod_log', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "stoption") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Menu Option Setting`).setColor(client.colors.theme).setDescription(`please click and write option you need to add on bot **menu option** on button below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
              if (m.values[0] === "sttype") {
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Type Setting`).setColor(client.colors.theme).setDescription(`In soon...`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              }
            }
            if (m.customId === "bot_language") {
              m.values.forEach(async (value) => {
                await db.set(`guild_${m.guild.id}.language`, value)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Bot Language Setuped`).setColor(client.colors.theme).setDescription(`bot **language** successfully in guild have setuped to \`${value}\`.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setMaxValues(1).setMinValues(1).setPlaceholder(`In Select!!`).setCustomId(`bot_language`).setDisabled(true).addOptions([{ label: "English (en-US)", value: "en-US", emoji: client.emotes["en-US"] }, { label: "Persian (per)", value: "per", emoji: client.emotes["per"] }])), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
          }
          if (m.isChannelSelectMenu()) {
            if (m.customId === "parent_open") {
              m.values.forEach(async (value) => {
                let channel = m.guild.channels.cache.find(r => r.id === value);
                await db.set(`guild_${m.guild.id}.categories.open`, channel.id)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **parent open channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_open', placeholder: 'Parent Open Channel Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Open Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
            if (m.customId === "parent_close") {
              m.values.forEach(async (value) => {
                let channel = m.guild.channels.cache.find(r => r.id === value);
                await db.set(`guild_${m.guild.id}.categories.close`, channel.id)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **parent close channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_close', placeholder: 'Parent Close Channel Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Close Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_close"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
            if (m.customId === "mod_log") {
              m.values.forEach(async (value) => {
                let channel = m.guild.channels.cache.find(r => r.id === value);
                await db.set(`guild_${m.guild.id}.modlog`, channel.id)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setuped`).setColor(client.colors.theme).setDescription(`guild **mod log** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'theme', placeholder: 'Mod Log Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
            if (m.customId === "panel_channel") {
              m.values.forEach(async (value) => {
                let channel = m.guild.channels.cache.find(r => r.id === value);
                await db.set(`guild_${m.guild.id}.panel.channel`, channel.id)
                await m.deferUpdate()
                await m.editReply({
                  embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Panel Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **panel channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                  components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'theme', placeholder: 'Panel Channel Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Next Step').setEmoji(client.emotes.next).setCustomId(`panel_message`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Panel Channel').setEmoji(client.emotes.trash).setCustomId("remove_panel_channel"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
                })
              })
            }
          }
          if (m.isRoleSelectMenu()) {
            if (m.customId === "admin_roles") {
              let roles = []
              await m.values.forEach(async (value) => {
                await db.push(`guild_${m.guild.id}.admin_roles`, value)
                roles.push(value)
              })
              //let roles = await db.get(`guild_${m.guild.id}.admin_roles`);
              await m.deferUpdate()
              await m.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setuped`).setColor(client.colors.theme).setDescription(`guild **admin role** successfully setuped to ${roles.map(r => `<@&${r}>`).join(', ')}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'theme', placeholder: 'Admin Role Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_roles"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          }
        } else {
          return errorMessage(client, m, `This message only for ${message.author} and you can't use it.`)
        }
      })
      setTimeout(async () => {
        await msg.edit({
          components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))]
        })
      }, time)
    } catch (e) {
      console.error(e)
      errorMessage(client, message, `\`\`\`js\n${e}\`\`\``)
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