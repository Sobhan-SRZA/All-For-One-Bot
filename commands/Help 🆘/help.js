module.exports = {
    name: 'help',
    aliases: ['h','help me','komak'],
    category: 'Help 🆘',
    utilisation: '{prefix}help',
  async execute(client, message, args) { 
const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require("discord-buttons");
    if (args[0]) {
      const cmd = client.commands.get(args[0].toLowerCase());
      if (!cmd || !cmd.name||!cmd.aliases) {
        return message.channel.send(`**<:error:862374824482963476> It seems like \`${args[0].toLowerCase()}\` is not a valid command! Please try Again!**`)
      }

      const embed = new MessageEmbed()
      .setColor('RANDOM')
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
    .setColor('RANDOM')
    .addField('Help 🆘', commandsData(client.commands.filter(c => c.category === 'Help 🆘')))
    .addField('Infos 📊', commandsData(client.commands.filter(c => c.category === 'Infos 📊')))
    .addField('Moderation 🗿', commandsData(client.commands.filter(c => c.category === 'Moderation 🗿')))
    .addField('Ticket 🎫', commandsData(client.commands.filter(c => c.category === 'Ticket 🎫')))
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

    
  }
};


/*
const Discord = require("discord.js");
var prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
const db = require("quick.db");
const btn = require("discord-buttons");
    
        if (args[0]) {
      const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
      if (!cmd || !cmd.name) {
        return message.channel.send(`**<:error:862374824482963476> It seems like \`${args[0].toLowerCase()}\` is not a valid command! Please try Again!**`)
      }
    }

const { MessageMenu , MessageMenuOption , MessageButton } = require("discord-buttons"); 
   let option1 = new MessageMenuOption()
    .setLabel("Music Help")
    .setValue("Music")
    .setDescription("Neshan Dadane Music Command Haie Bot")
    .setDefault()
    .setEmoji("🎶")
    
   let option2 = new MessageMenuOption()
    .setLabel("Filters Help")
    .setValue("Filters")
    .setDescription("Neshan Dadane Filter Command Haie Bot")
    .setDefault()
    .setEmoji("📂")

   let option3 = new MessageMenuOption()
    .setLabel("Self Help")
    .setValue("Self")
    .setDescription("Neshan Dadane Self Command Haie Bot")
    .setDefault()
    .setEmoji("📫")
    

   let selection = new MessageMenu()
    .setID("selection")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("Roie Man Click Konid !!")
    .addOption(option1)
    .addOption(option2)
    .addOption(option3)
  

    let help = new Discord.MessageEmbed()
      help.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      help.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      help.setTitle(`${client.user.username} Help Commands :)`)
      help.setDescription(``)
      help.setURL('https://discord.gg/vgnhGXabNw')
      help.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      help.setColor("RANDOM")
      .addField('Name', cmd.name)
      .addField('Description', cmd.description || 'No Description provided!')
      .addField('Aliase(s)', cmd.aliases.map((a) => `**\`${a}\`**`).join(", ") || 'No Aliases provided!')
      help.addField(`**Links**`, `**[Support Server](${"https://discord.gg/5GYNec4urW"}) • [Invite](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=137775017040&scope=bot)**`)
      if (cmd.usage) {
        var usage = cmd.usage.split('\n').map(i => { return client.prefix + i})
        help.addField('Usage', `**\`${usage.join('` \n`')}\`**`)
      }
        

          


   let menumsg = await message.channel.send(help,selection)

let music = new Discord.MessageEmbed()
      music.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      music.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      music.setTitle(`${client.user.username} Music Help Commands :)`)
      music.setDescription(``)
      music.setURL('https://discord.gg/vgnhGXabNw')
      music.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      music.setColor("RANDOM")
      music.addField(`**${prefix}play**`,'`Plays audio from YouTube or Soundcloud | Aliases: (p)`' , true)
      music.addField(`**${prefix}disconnect**`,'`disconnect at the voice | Aliases: (dc)`' , true)
      music.addField(`**${prefix}invite**`,'`Send bot invite link | Aliases: ()`' , true)
      music.addField(`**${prefix}loop**`,'`Toggle music loop | Aliases: (l)`' , true)
      music.addField(`**${prefix}lyrics**`,'`Get lyrics for the currently playing song | Aliases: (ly)`' , true)
      music.addField(`**${prefix}np**`,'`Show now playing song | Aliases: ()`' , true)
      music.addField(`**${prefix}pause**`,'`Pause the currently playing music | Aliases: ()`' , true)
      music.addField(`**${prefix}playlist**`,'`Play a playlist from youtube | Aliases: (pl)`' , true)
      music.addField(`**${prefix}search**`,'`Search and select videos to play | Aliases: ()`' , true)
      music.addField(`**${prefix}skip**`,'`Skip the currently playing song | Aliases: (s)`' , true)
      music.addField(`**${prefix}shuffle**`,'`Shuffle queue | Aliases: ()`' , true)
      music.addField(`**${prefix}stop**`,'`Stops the music | Aliases: ()`' , true)
      music.addField(`**${prefix}resume**`,'`Resume currently playing music | Aliases: (r)`' , true)
      music.addField(`**${prefix}queue**`,'`show what music playing in the queue | Aliases: (q)`' , true)
      music.addField(`**${prefix}clearqueue**`,'`request to clear queue | Aliases: (cq)`' , true)
      music.addField(`**${prefix}join**`,'`join bot on voice | Aliases: ()`' , true)
      music.addField(`**${prefix}filter**`,'`Change the sound quality and make it multidimensional|Aliases: ()`' , true)


    let filters = new Discord.MessageEmbed()
     filters.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      filters.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      filters.setTitle(`${client.user.username}Filter Help Commands :)`)
      filters.setURL('https://discord.gg/vgnhGXabNw')
      filters.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      filters.setColor("RANDOM")
      filters.addField(`**${prefix}filter 8d**`,'`get filter= 8D`' , true)
      filters.addField(`**${prefix}filter gate**`,'`get filter= gate`' , true)
      filters.addField(`**${prefix}filter haas**`,'`get filter= haas`' , true)
      filters.addField(`**${prefix}filter phaser**`,'`get filter= phaser`' , true)
      filters.addField(`**${prefix}filter treble**`,'`get filter= treble`' , true)
      filters.addField(`**${prefix}filter tremolo**`,'`get filter= tremolo`' , true)
      filters.addField(`**${prefix}filter vibrato**`,'`get filter= vibrato`' , true)
      filters.addField(`**${prefix}filter reverse**`,'`get filter= reverse`' , true)
      filters.addField(`**${prefix}filter karaoke**`,'`get filter= karaoke`' , true)
      filters.addField(`**${prefix}filter flanger**`,'`get filter= flanger`' , true)
      filters.addField(`**${prefix}filter mcompand**`,'`get filter= mcompand`' , true)
      filters.addField(`**${prefix}filter surrounding**`,'`get filter= surrounding`' , true)
      filters.addField(`**${prefix}filter normalizer**`,'`get filter= normalizer`' , true)
      filters.addField(`**${prefix}filter nightcore**`,'`get filter= nightcore`' , true)
      filters.addField(`**${prefix}filter vaporwave**`,'`get filter= vaporwave`' , true)
      filters.addField(`**${prefix}filter bassboost**`,'`get filter= bassboost`' , true)
      filters.addField(`**${prefix}filter pulsator**`,'`get filter= pulsator`' , true)
      filters.addField(`**${prefix}filter subboost**`,'`get filter= subboost`' , true)

  let self = new Discord.MessageEmbed()
     self.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      self.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      self.setTitle(`${client.user.username}Self Help Commands :)`)
      self.setDescription(``)
      self.setURL('https://discord.gg/vgnhGXabNw')
      self.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      self.setColor("RANDOM")
      self.addField(`**${prefix}ping**`, '`Show the bot is average ping | Aliases: ()`', false)
      self.addField(`**${prefix}debug**`, '`Shows the position of the robot | Aliases: ()`', false)
      self.addField(`**${prefix}serverlist**`, '`Indicates which servers Bot is a member of | Aliases: ()`', false)


function menuselection(menu) {
  switch(menu.values[0]) {
    case "Music":
          menu.reply.send(music, true)
    break;
    case "Filters":
          menu.reply.send(filters, true)
    break;
    case "Self":
          menu.reply.send(self, true)
    break;
/** 
 *  
default:
          menu.reply.send(":x: Shoma Dastresi Baraie Entekhab Kardan Nadarid", true)
    break;
   
 * 

   
  }
}

client.on("clickMenu", (menu) => {
  if (menu.message.id == menumsg.id){
    if (menu.clicker.user.id) menuselection(menu)
  }
})
*/
  