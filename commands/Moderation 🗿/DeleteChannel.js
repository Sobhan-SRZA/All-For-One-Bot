module.exports = {
    name: 'deletechannel',
    description: 'Deletes the chnanel in which the command ha Been ran',
    aliases: ['delchannel','delc'],
    category: 'Moderation 🗿',
    cooldown: 5,
    utilisation: '{prefix}deletechannel',
  async execute(client, message, args) { 

//Defining
const { MessageActionRow, MessageButton } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')
const time = 15000;

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
.setColor('RED')
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
.setID('yes')
.setStyle('red')
.setLabel('Yes')
)
.addComponents(
new MessageButton()
.setID('no')
.setStyle('green')
.setLabel('No')
)
const disabledRow = new MessageActionRow()
.addComponents(
new MessageButton()
.setID('yep')
.setStyle('red')
.setLabel('Yes')
.setDisabled(true)
)
.addComponents(
new MessageButton()
.setID('nope')
.setStyle('green')
.setLabel('No')
.setDisabled(true)
)

//Checking Perms
if(!message.member.hasPermission("MANAGE_CHANNELS")){return message.reply({embeds: [MemberPerms]})} 
if(!message.guild.me.hasPermission("MANAGE_CHANNELS")){return message.reply({embeds: [ClientPerms]})}

//Sending the main embed
const m = await message.reply(confirmation,{components: [row]})//.then(x => x.delete({ timeout: time }))
/*
//Making filter to ensure safety
const filter = i => i.user.id === message.author.id;

//Defining collector
const collector = i => i.createButtonCollector({ filter, time: time })

//Collecting buttons
collector.on('collect', async i => {
if(i.id === 'yes') {
await message.author.send(deleted) && message.channel.delete()
}

if(i.id === 'no') {
await i.update(safe,{components: [disabledRow]})
}
})
*/
 }
}
