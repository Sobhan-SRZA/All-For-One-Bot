module.exports = {
    name: 'deletechannel',
    description: 'Deletes the chnanel in which the command ha Been ran',
    aliases: ['delchannel','delc'],
    category: 'Moderation 🗿',
    cooldown: 5,
    utilisation: '{prefix}deletechannel',
  async execute(client, message, args) { 

//Defining
const time = 15000;
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js')
const TargetChannel = message.mentions.channel.first()||message.channel;
//Embeds
const MemberPerms = new MessageEmbed()
.setTitle('Missing Perms')
.setDescription('You need `MANAGE_CHANNEL` Permission to use this!')
.setColor('RED')
.setTimestamp()

const ClientPerms = new MessageEmbed()
.setTitle('Missing Perms')
.setDescription('I need `MANAGE_CHANNEL` Permission to do that!')
.setColor('RED')
.setTimestamp()

const confirmation = new MessageEmbed()
.setTitle('Are You sure?')
.setDescription('Are you sure that you want to delete this channel permanently?')
.setColor('YELLOW')

const deleted = new MessageEmbed()
.setTitle('Channel Deleted')
.setDescription ('Successfully deleted the channel')
.setColor('GREEN')
.setTimestamp()

const safe = new MessageEmbed()
.setTitle('Channel is safe')
.setDescription('Ok, so u chose no, now I will not delete this channel :)')
.setColor('GREEN')
.setTimestamp()

//Buttons
const row = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId('yes')
.setStyle('DANGER')
.setLabel('Yes')
)
.addComponents(
new MessageButton()
.setCustomId('no')
.setStyle('SUCCESS')
.setLabel('No')
)

const disabledRow = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId('yep')
.setStyle('DANGER')
.setLabel('Yes')
.sstDisabled(true)
)
.addComponents(
new MessageButton()
.setCustomId('nope')
.setStyle('SUCCESS')
.setLabel('No')
.setDisabled(true)
)

//Checking Perms
if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({embeds: [MemberPerms]})
if(!guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({embeds: [ClientPerms]})

//Sending the main embed
const m = await message.reply({embed: confirmation, components: [row]}).setTimeout((m) => {
  m.delete()
}, time);

//Making filter to ensure safety
const filter = i => i.user.id === message.author.id;

//Defining collector
const collector = message.channel.createMessageComponentCollector({ filter, time: time })

//Collecting buttons
collector.on('collect', async i => {
if(i.customId === 'yes') {
await message.author.send({embed: deleted}) && TargetChannel.delete()
}

if(i.customId === 'no') {
await i.update({embed: safe, components: [disabledRow]})
}
})
 }
}
