const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed
 } = require('discord.js');
const db = require("quick.db");
const { 
  commandsData, 
  NeedHelpButtons, 
  NeedHelpMenu 
} = require('../../functions/help_functions.js');
module.exports = {
  name: 'help',
  description: 'this shows you bot commands and categorys to help you.',
  category: 'Help 🆘',
  cooldown: 1,
  userPermissions: [""],
  botPermissions: [""],
  options: [{
    name: "report_message",
    description: "for report bot bugs to developers. | please provide the report message.",
    type: "STRING",
    required: false
},
{
  name: "command_name",
  description: "this help you to show more information any command you need. | please provide the command name.",
  type: "STRING",
  required: false,
}],

  run: async (client, interaction, args) => {
var prefix = await db.fetch(`prefix_${interaction.guild.id}`)||client.prefix;
//======== Embeds
  let help = new MessageEmbed()
   .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
   .setTitle(`${client.user.username} Help Commands :)`)
   .setURL(client.config.discord.server_support)
   .setFooter({ text: `Message Guild ${interaction.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
   .setAuthor({ name: `Requested by ${interaction.member.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
   .setColor(client.colors.none)
   .setDescription(`**this embed show you bot commands and categorys.\n🧰| Commands Count: \n${client.emotes.reply}\`${client.commands.size}\`\n🧮| Category Count: \n${client.emotes.reply}\`${client.categories.size}\`**`)
   .addField(
         'Help 🆘', 
         `${commandsData(client.commands.filter(c => c.category === 'Help 🆘'), prefix)}`,
         false
   )
   .addField(
         'Infos 📊', 
         `${commandsData(client.commands.filter(c => c.category === 'Infos 📊'), prefix)}`,
         false
   )
   .addField(
         'Member 👻', 
         `${commandsData(client.commands.filter(c => c.category === 'Member 👻'), prefix)}`,
         false
   )
   .addField(
         'Setup 💻', 
         `${commandsData(client.commands.filter(c => c.category === 'Setup 💻'), prefix)}`,
         false
   )
   .addField(
         'Moderation 🗿', 
         `${commandsData(client.commands.filter(c => c.category === 'Moderation 🗿'), prefix)}`,
         false
   )
   .addField(
         'Ticket 🎫', 
         `${commandsData(client.commands.filter(c => c.category === 'Ticket 🎫'), prefix)}`,
         false
   )
   .addField(
         'Giveaway 🎁', 
         `${commandsData(client.commands.filter(c => c.category === 'Giveaway 🎁'), prefix)}`,
         false
   )
   .addField(
         'Music 🎶', 
         `${commandsData(client.commands.filter(c => c.category === 'Music 🎶'), prefix)}`,
         false
   )
   .addField(
         'Fun 🎭', 
         `${commandsData(client.commands.filter(c => c.category === 'Fun 🎭'), prefix)}`,
         false
   )
   .addField(
         'Nsfw 🔞', 
         `${commandsData(client.commands.filter(c => c.category === 'Nsfw 🔞'), prefix)}`,
         false
   )
   .addField(
         'VIP 💎', 
         `${commandsData(client.commands.filter(c => c.category === 'VIP 💎'), prefix)}`,
         false
   )
   .addField(
         'Owner 👑', 
         `${commandsData(client.commands.filter(c => c.category === 'Owner 👑'), prefix)}`,
         false
   )
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
   .setTimestamp()
   .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"})**`,false)

const choice = interaction.options.getString("report_message");
try {
  const sizarTMserver = client.guilds.cache.get(client.config.discord.server_id);
  const channelbug = sizarTMserver.channels.cache.get(client.config.discord.server_channel_report);
  let invite = await interaction.channel.createInvite({
      maxAge: 0, 
      maxUses: 5
  })
  const report = new MessageEmbed()
   .setAuthor({name:`${interaction.member.username}`,iconURL:interaction.member.displayAvatarURL({ dynamic: true })})
   .setTimestamp()
   .setTitle(`This Guy Have a Report, User ID: "${interaction.member.id}"`)
   .setColor('#2F3136')
   .addField(`> **User :**`,`${client.emotes.reply}${interaction.member}`,true)
   .addField(`> **Send :**` ,`${client.emotes.reply}${choice}`,true) 
   .addField(`> **Server :**`, `${client.emotes.reply}${invite.url}`,true)
   .setURL(invite.url)
   .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
   .setFooter({text:`Requested By ${interaction.member.tag}`,iconURL:client.user.displayAvatarURL({ dynamic: true })})
   channelbug.send({ 
     embeds: [report] 
   }).then((msg)=> {
    msg.react(client.emotes.report)
   })
   interaction.reply({
    ephemeral: true,
    content: client.emotes.success + `| \`\`\`js\n ${client.emotes.report}| Successfuly your report or bug message send to My Developers ${client.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
    components: [null] 
   })
 }catch{
 }
 const command_name = interaction.options.getString("command_name");
 if (command_name) { 
   const cmd = client.commands.get(command_name.toLowerCase());
       if (!cmd || !cmd.name||!cmd.aliases) {
         return interaction.reply({
                 content: `**${client.emotes.error}| It seems like \`${command_name.toLowerCase()}\` is not a valid command! Please try Again!**`, 
                 ephemeral: true,
                 components: [null]
                })
       }
 const embed = new MessageEmbed()
    .setColor(client.colors.none)
    .addField('Name', cmd.name)
    .addField('Description', cmd.description || 'No Description provided!')
    .addField('Aliase(s)', cmd.aliases.map((a) => `**\`${a}\`**`).join(", ") || 'No Aliases provided!')
    .setFooter({ text: `${client.user.username} Help || more info ${prefix}help || Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
    .setAuthor({ name: `Requested by ${interaction.member.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
    .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support}||https://discord.gg/5GYNec4urW)**`)
       if (cmd.utilisation) {
         var usage = cmd.utilisation.split('\n').map(i => { return client.prefix + i})
         if (cmd.cooldown) embed.addField('Cooldown', `**\`${cmd.cooldown} Seconds\`**`)
         embed.addField('Usage', `**\`${usage.join('` \n`')}\`**`)
       }
     return interaction.reply({
             embeds:[embed],
             components: [NeedHelpButtons(client)],
             ephemeral: true,
            })
     }
     if (!interaction.options.getString("report_message"||"command_name")){
     return interaction.reply({
              embeds: [help], 
              ephemeral: true,
              components: [[NeedHelpMenu(client)]]
            })
     }
   }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */