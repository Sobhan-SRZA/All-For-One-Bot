module.exports = {
    name: 'ticketmenu',
    aliases: ['tm'],
    category: 'Ticket 🎫',
    utilisation: '{prefix}ticketmenu',

  async execute(client, message, args) { 
const db = require("quick.db");
const { MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js");

let ticketEmbed = new MessageEmbed()
.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
.setTitle(`${client.user.username} Help Commands :)`)
.setURL(client.config.discord.server_support)
.setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
.setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
.setColor("#2F3136")
.setDescription(`**this embed show you bot commands and categorys.**`)
.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"})**`)

let menuHelp = await message.channel.send({ embed: ticketEmbed, components: [TicketMenu()] })

//========= Functions
function TicketMenu() {
let selection = new MessageSelectMenu()
  .setCustomId("ticketMenu")
  .setMaxValues(1)
  .setMinValues(1)
  .setPlaceholder("🎫| Click me to creat ticket for you !!")
  .addOptions(
    {
      label: 'Need Help',
      value: 'neehelp',
      description: 'creat ticket with reason of Need Help',
      emoji: {
        name: '🆘',
      },
  },
  {
      label: 'Exchange',
      value: 'exchange',
      description: 'creat ticket with reason of Exchange',
      emoji: {
        name: '💱',
      },
  },
  {
      label: 'Report Member',
      value: 'rpmember',
      description: 'creat ticket with reason of Report Member',
      emoji: {
        name: '☎',
      },
  },
  {
      label: 'Report',
      value: 'rp',
      description: 'creat ticket with reason of Report',
      emoji: {
        name: '📞',
      },
  },
  {
      label: 'Admin',
      value: 'adm',
      description: 'creat ticket with reason of Admin',
      emoji: {
        name: '🦺',
      },
  },
  {
      label: 'Owner',
      value: 'own',
      description: 'creat ticket with reason of Owner',
      emoji: {
        name: '👑',
      },
  },
  )
const row = new MessageActionRow()
  .addComponents(selection)

  return row;
}
  }
}