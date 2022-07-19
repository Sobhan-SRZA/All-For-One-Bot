const { 
  MessageEmbed
 } = require('discord.js');
const {
   MessageButton,
   MessageActionRow,
   MessageMenu,
   MessageMenuOption,
       } = require("discord-buttons");
const db = require("quick.db");
module.exports = {
    name: 'help',
    aliases: ['h','help me','komak'],
    category: 'Help 🆘',
    utilisation: '{prefix}help',
    description:'this shows you bot commands and categorys to help you.',

  async execute(client, message, args) { 

var prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
 let commands = message.client.commands.array();
if (args[0]) {
      const cmd = client.commands.get(args[0].toLowerCase());
      if (!cmd || !cmd.name||!cmd.aliases) {
        return message.channel.send(`**${client.emotes.error}| It seems like \`${args[0].toLowerCase()}\` is not a valid command! Please try Again!**`)
      }

      const embed = new MessageEmbed()
      .setColor(client.colors.none)
      .addField('Name', cmd.name)
      .addField('Description', cmd.description || 'No Description provided!')
      .addField('Aliase(s)', cmd.aliases.map((a) => `**\`${a}\`**`).join(", ") || 'No Aliases provided!')
    .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
    .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
    .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support}||https://discord.gg/5GYNec4urW)**`)
      if (cmd.cooldown) embed.addField('Cooldown', `**\`${cmd.cooldown} Seconds\`**`)
      if (cmd.utilisation) {
        var usage = cmd.utilisation.split('\n').map(i => { return client.prefix + i})
        embed.addField('Usage', `**\`${usage.join('` \n`')}\`**`)
      }
    return message.channel.send(embed,{ components: [Links()] })
      
    }else
if (!args[0]) {
    let help = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Help Commands :)`)
      .setURL(client.config.discord.server_support)
      .setFooter(`Message Guild ${message.guild.name} | Created By Mr.SIN RE#1528 :)`, `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
      .setDescription(`**this embed show you bot commands and categorys.**`)
      .addField("🧰| Commands Count", `<:reply_desgine:950701730675445790>\`${message.client.commands.size + 1}\``,true)
      .addField('Help 🆘', commandsData(client.commands.filter(c => c.category === 'Help 🆘')))
      .addField('Infos 📊', commandsData(client.commands.filter(c => c.category === 'Infos 📊')))
      .addField('Member 👻', commandsData(client.commands.filter(c => c.category === 'Member 👻')))
      .addField('Setup 💻', commandsData(client.commands.filter(c => c.category === 'Setup 💻')))
      .addField('Moderation 🗿', commandsData(client.commands.filter(c => c.category === 'Moderation 🗿')))
      .addField('Ticket 🎫', commandsData(client.commands.filter(c => c.category === 'Ticket 🎫')))
      .addField('Giveaway 🎁', commandsData(client.commands.filter(c => c.category === 'Giveaway 🎁')))
      .addField('Music 🎶', commandsData(client.commands.filter(c => c.category === 'Music 🎶')))
      .addField('Fun 🎭', commandsData(client.commands.filter(c => c.category === 'Fun 🎭')))
      .addField('Nsfw 🔞', commandsData(client.commands.filter(c => c.category === 'Nsfw 🔞')))
      .addField('VIP 💎', commandsData(client.commands.filter(c => c.category === 'VIP 💎')))
      .addField('Owner 👑', commandsData(client.commands.filter(c => c.category === 'Owner 👑')))
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"})**`)

 message.channel.send({ embed: help, components: [NeedHelpButtons()]})//, button: [Links()] })

let musicEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Music🎶 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Music 🎶').forEach((cmd) => {
      musicEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let funEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Fun🎭 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Fun 🎭').forEach((cmd) => {
      funEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let moderateEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Moderation🗿 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Moderation 🗿').forEach((cmd) => {
      moderateEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let infoEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Infos📊 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Infos 📊').forEach((cmd) => {
      infoEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let nsfwEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Nsfw🔞 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Nsfw 🔞').forEach((cmd) => {
      nsfwEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let ownerEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Owner👑 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Owner 👑').forEach((cmd) => {
      ownerEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let memberEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Member👻 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Member 👻').forEach((cmd) => {
      memberEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let vipEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} VIP💎 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'VIP 💎').forEach((cmd) => {
      vipEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let giveawayEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Giveaway🎁 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Giveaway 🎁').forEach((cmd) => {
      giveawayEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let ticketEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Ticket🎫 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Ticket 🎫').forEach((cmd) => {
      ticketEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
let setupEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} Setup💻 Help Commands :)`)
      .setDescription(``)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      .setColor("#2F3136")
commands.filter(c => c.category === 'Setup 💻').forEach((cmd) => {
      setupEmbed.addField(`**${prefix}${cmd.name}**`,`**Description: \`${cmd.description}\`\nAliases: \`${cmd.aliases}\`\nUsage: \`${prefix}${cmd.utilisation}\`**`,true)
})
//========= Clients
client.on("clickMenu", (menu) => {
  if(menu.values[0] === "inf"){
  menu.reply.send(infoEmbed,true)
}
  if(menu.values[0] === "muc"){
  menu.reply.send(musicEmbed,true)
}
  if(menu.values[0] === "mod"){
  menu.reply.send(moderateEmbed,true)
}
  if(menu.values[0] === "nsw"){
  menu.reply.send(nsfwEmbed,true)
} 
  if(menu.values[0] === "owr"){
  menu.reply.send(ownerEmbed,true)
}
  if(menu.values[0] === "meb"){
  menu.reply.send(memberEmbed,true)
} 
  if(menu.values[0] === "fun"){
  menu.reply.send(funEmbed,true)
} 
  if(menu.values[0] === "vip"){
  menu.reply.send(vipEmbed,true) 
} 
  if(menu.values[0] === "tic"){
  menu.reply.send(ticketEmbed,true)
}
  if(menu.values[0] === "stp"){
  menu.reply.send(setupEmbed,true)
} 
  if(menu.values[0] === "giv"){
  menu.reply.send(giveawayEmbed,true)
}
      if (!menu.clicker.user.id === messsage.author.id){
     menu.reply.send(`${client.emotes.error}| this menu for <@${menu.clicker.user.id}>, you can't used this!!\nfor use this menu you can send a this \`${prefix}help\` command to get a help.`, true)
    }
})
}
//========= Functions
function commandsData(commands) {
  const content = commands.map(i => '`' + prefix + i.name + '`').join(' , ')
  return '**' + content + '**';
}
function Links(){
  const btn1 = new MessageButton()
  .setStyle('url')
  .setLabel('Invite Me')
  .setEmoji('🤖')
  .setURL(client.config.discord.invite)

const btn2 = new MessageButton()
  .setStyle('url')
  .setLabel('Support Server!')
  .setEmoji('🧰')
  .setURL(`${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`)

const row = new MessageActionRow()
  .addComponents(btn1, btn2)
  
  return row;
}
  
function NeedHelpButtons() {
  let option1 = new MessageMenuOption()
  .setLabel("Infos Help")
  .setValue("inf")
  .setDescription("send commands of Infos📊 Category")
  .setDefault()
  .setEmoji("📊")
let option2 = new MessageMenuOption()
  .setLabel("Member Help")
  .setValue("meb")
  .setDescription("send commands of Member👻 Category")
  .setDefault()
  .setEmoji("👻")
let option3 = new MessageMenuOption()
  .setLabel("Setup Help")
  .setValue("stp")
  .setDescription("send commands of Setup💻 Category")
  .setDefault()
  .setEmoji("💻")
let option4 = new MessageMenuOption()
  .setLabel("Moderation Help")
  .setValue("mod")
  .setDescription("send commands of Moderation🗿 Category")
  .setDefault()
  .setEmoji("🗿")
let option5 = new MessageMenuOption()
  .setLabel("Ticket Help")
  .setValue("tic")
  .setDescription("send commands of Ticket🎫 Category")
  .setDefault()
  .setEmoji("🎫") 
let option6 = new MessageMenuOption()
  .setLabel("Giveaway Help")
  .setValue("giv")
  .setDescription("send commands of Giveaway🎁 Category")
  .setDefault()
  .setEmoji("🎁")
let option7 = new MessageMenuOption()
  .setLabel("Music Help")
  .setValue("mus")
  .setDescription("send commands of Music🎶 Category")
  .setDefault()
  .setEmoji("🎶")
let option8 = new MessageMenuOption()
  .setLabel("Fun Help")
  .setValue("fun")
  .setDescription("send commands of Fun🎭 Category")
  .setDefault()
  .setEmoji("🎭")
let option9 = new MessageMenuOption()
  .setLabel("Nsfw Help")
  .setValue("nsw")
  .setDescription("send commands of Nsfw🔞 Category")
  .setDefault()
  .setEmoji("🔞")
let option10 = new MessageMenuOption()
  .setLabel("VIP Help")
  .setValue("vip")
  .setDescription("send commands of VIP💎 Category")
  .setDefault()
  .setEmoji("💎")
let option11 = new MessageMenuOption()
  .setLabel("Owner Help")
  .setValue("owr")
  .setDescription("send commands of Owner👑 Category")
  .setDefault()
  .setEmoji("👑")

let selection = new MessageMenu()
  .setID("selection")
  .setMaxValues(1)
  .setMinValues(1)
  .setPlaceholder("🆘| Click me to show bot commands !!")
  .addOption(option1)
  .addOption(option2)
  .addOption(option3)
  .addOption(option4)
  .addOption(option5)
  .addOption(option6)
  .addOption(option7)
  .addOption(option8)
  .addOption(option9)
  .addOption(option10)
  .addOption(option11)

const row = new MessageActionRow()
  .addComponents(selection)

  return row;
}
      

    


/*
    if (args[0]) {
      const cmd = client.commands.get(args[0].toLowerCase());
      if (!cmd || !cmd.name||!cmd.aliases) {
        return message.channel.send(`**<:error:862374824482963476> It seems like \`${args[0].toLowerCase()}\` is not a valid command! Please try Again!**`)
      }

      const embed = new MessageEmbed()
      .setColor(client.colors.none)
      .addField('Name', cmd.name)
      .addField('Description', cmd.description || 'No Description provided!')
      .addField('Aliase(s)', cmd.aliases.map((a) => `**\`${a}\`**`).join(", ") || 'No Aliases provided!')
    .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
    .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
    .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support}||https://discord.gg/5GYNec4urW)**`)


      if (cmd.cooldown) embed.addField('Cooldown', `**\`${cmd.cooldown} Seconds\`**`)
      if (cmd.usage) {
        var usage = cmd.usage.split('\n').map(i => { return client.prefix + i})
        embed.addField('Usage', `**\`${usage.join('` \n`')}\`**`)
      }

    return message.channel.send(embed,{ components: [buttons()] })
      
    }else

    if (!args[0]) {
      
    let embed2 = new MessageEmbed()
    .setTitle(`${client.user.username} Help`)
    .setColor(client.colors.none)
    .addField('Help 🆘', commandsData(client.commands.filter(c => c.category === 'Help 🆘')))
    .addField('Infos 📊', commandsData(client.commands.filter(c => c.category === 'Infos 📊')))
    .addField('Member 👻', commandsData(client.commands.filter(c => c.category === 'Member 👻')))
    .addField('Setup 💻', commandsData(client.commands.filter(c => c.category === 'Setup 💻')))
    .addField('Moderation 🗿', commandsData(client.commands.filter(c => c.category === 'Moderation 🗿')))
    .addField('Ticket 🎫', commandsData(client.commands.filter(c => c.category === 'Ticket 🎫')))
    .addField('Giveaway 🎁', commandsData(client.commands.filter(c => c.category === 'Giveaway 🎁')))
    .addField('Music 🎶', commandsData(client.commands.filter(c => c.category === 'Music 🎶')))
    .addField('Fun 🎭', commandsData(client.commands.filter(c => c.category === 'Fun 🎭')))
    .addField('Nsfw 🔞', commandsData(client.commands.filter(c => c.category === 'Nsfw 🔞')))
    .addField('VIP 💎', commandsData(client.commands.filter(c => c.category === 'VIP 💎')))
    .addField('Owner 👑', commandsData(client.commands.filter(c => c.category === 'Owner 👑')))
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
    .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
    .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"})**`)
    
    return message.channel.send(embed2,{ components: [buttons()] })
    }
function toTitleCase(text) {
  const content = text[0].toUpperCase() + text.slice(1, text.length)
  return content;
}

function commandsData(commands) {
  const content = commands.map(i => '`' + i.name + '`').join(' , ')
  return '**' + content + '**';
}

function buttons() {
  const btn1 = new MessageButton()
  .setStyle('url')
  .setLabel('Invite Me')
  .setEmoji('🤖')
  .setURL(client.config.discord.invite)

  const btn2 = new MessageButton()
  .setStyle('url')
  .setLabel('Support Server!')
  .setEmoji('🧰')
  .setURL(`${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`)


  const row = new MessageActionRow()
  .addComponents(btn1, btn2)

  return row;
}
*/
  
    
  }
};
  