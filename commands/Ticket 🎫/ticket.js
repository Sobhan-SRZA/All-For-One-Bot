const db = require("quick.db");
const {MessageEmbed,MessageButton,MessageActionRow} = require("discord.js");

module.exports = {
    name: 'ticket',
    aliases: ['t'],
    category: 'Ticket 🎫',
    usage: '{prefix}ticket',

  async execute(client, message, args) { 
let args1 = args[0];
let time = 10000;
let ticketCreate = ['new','create','add','enable'];
let ticketClose = ['remove','disable','close'];
var prefix = await db.fetch(`prefix_${message.guild.id}`)||client.prefix;
if (!args1){
  let ticketEmbed = new MessageEmbed()
     .setColor(client.colors.none)
     .setTitle(`Ticket System`)
     .setDescription('**Lotfan Dar Sorat Zarorat Ticket Besazid😀**')
     .setThumbnail('https://cdn.discordapp.com/attachments/902034619791196221/905040476355330068/8b7193b2110a034a2fe037437afc80b3.gif')
     .addField(`Az Command Haie Robero Estefade kkonid :) | ${prefix}ticket create <Baraie Sakhte Ticket :)> | ${prefix}ticket close <Baraie Bastan Ticket>`,'Ba Sakhte Shodane Channele Gadid Bama Mitavanid Sohbat Konid📩')
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter({text:`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, iconURL:`${message.author.displayAvatarURL()}`})
     .setTimestamp(Date.now())
message.channel.send(ticketEmbed);
   }
//Create Ticket
let ticketName = db.get(`ticketName_${message.author.id}_${message.guild.id}`);
let ticketID = db.get(`ticketID_${message.author.id}_${message.guild.id}`);
if (ticketCreate.some(x => x.includes(args1.toLowerCase()))) {
if (message.channel.id === ticketID){
   message.delete().catch(() => { return });
   message.channel.send(`shotor nemitoni ke to channel ticket ticket baz koni :/  ${message.author}`).then(x => x.delete({ timeout: time })).catch(() => { return })
    } else {
  if (!message.guild.channels.cache.find(x => x.name === ticketName)){
    let buttonYes = new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("bale")
        .setLabel("Bale")
        .setEmoji("✔")
    let buttonNo = new MessageButton()
        .setStyle("DANGER")
        .setCustomId("kheir")
        .setLabel("Kheir")
        .setEmoji("❌")
    let row = new MessageActionRow()
     .addComponents(buttonYes, buttonNo)
    let ticketCreateEmbed = new MessageEmbed()
     .setColor(client.colors.none)
     .setTitle(`Create Ticket`)
     .setDescription('**Aya Motmaen Hastid Ke Mikhahid Ticket Ra Bazconid?**')
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter({text:`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, iconURL:`${message.author.displayAvatarURL()}`})
     .setTimestamp(Date.now())
message.channel.send(ticketCreateEmbed, { components: row}).then((msg) => {
  const filter = (button1) => button1.clicker.user.id === message.author.id;
  let collect = msg.createButtonCollector(filter, { time: 500000 });
  collect.on('collect', async(x) => {
    x.reply.defer()
    if(x.id === "bale") {
      message.guild.channels.create(`ticket-${message.author.tag}`).then((channel) => {
        db.set(`ticketName_${message.author.id}_${message.guild.id}`, channel.name);
        db.set(`ticketID_${message.author.id}_${message.guild.id}`, channel.id);
        channel.updateOverwrite(message.author.id,{
          SEND_MESSAGE: true,
          VIEW_CHANNEL: true
        })
        channel.updateOverwrite(message.guild.id,{
          SEND_MESSAGE: false,
          VIEW_CHANNEL: false
        })
   let btn = new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Bastan Ticket")
                .setEmoji("🔒")
                .setCustomId("configTicket");
    let row = new MessageActionRow()
                .addComponent(btn);
    let ticketChannelEmbed = new MessageEmbed()
                .setDescription(`Lotfan Montazer **Staff** Bashid Ta Be Shoma Pashokh Bedahand!!
Bareie Baz Kardan Ticket Roie **"🔒"** Click Konid`)
                .setColor(client.colors.none) 
   channel.send(`Ticket Tavasote ${message.author} Baz Shod🙃`,{ embed: ticketChannelEmbed , component: row }).catch(() => { return });

    let yesEmbed = new MessageEmbed()
     .setColor(client.colors.none)
     .setTitle(`Ticket Shoma Sakhte Shod`)
     .setDescription(`**Ticket Shoma Sakhte Shod Va Ba Raftan Be Channel ${channel} Darkhasteton Ra Befarmayid :)**`)
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter({text:`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, iconURL:`${message.author.displayAvatarURL()}`})
     .setTimestamp(Date.now())
     msg.delete().catch(() => { return });
     message.channel.send(yesEmbed, null).catch(() => { return });
      })
    }else if (x.id === "kheir"){
    let noEmbed = new MessageEmbed()
     .setColor(client.colors.none)
     .setTitle(`Darkhast Shoma Cancel Shod`)
     .setDescription(`**Darkhast Baraie Sakht Ticket Cancel Shod**`)
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter({text:`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, iconURL:`${message.author.displayAvatarURL()}`})
     .setTimestamp(Date.now())
     msg.edit(noEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
    }
  })
  setTimeout(() => {
    let timeoutEmbed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`**Darkhast Shoma Anjam Nashod😕 | Lotfan Pas Az Chand Sanie Dobare Darkhast Konid😊**`)
    .setTimestamp(Date.now())
    msg.edit(timeoutEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
         }, 30000)
       })
      } else {
        message.channel.send("Sharmande Shoma Az Gabl Tiket Baz Karde Id 🙂")
      }
    }
   }

//Close Ticket
if (ticketClose.some(x => x.includes(args1.toLowerCase()))) {
if (message.channel.id === ticketID){
    let buttonClose = new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("close")
        .setLabel("Bale")
        .setEmoji("✔")
    let buttonCancel = new MessageButton()
        .setStyle("DANGER")
        .setCustomId("cancel")
        .setLabel("Kheir")
        .setEmoji("❌")
    let row = new MessageActionRow()
     .addComponents(buttonClose, buttonCancel)
    let ticketCloseEmbed = new MessageEmbed()
     .setColor(client.colors.none)
     .setTitle(`Close Ticket`)
     .setDescription('**Aya Motmaen Hastid Ke Mikhahid Ticket Ra Bebandid?**')
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter({text:`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, iconURL:`${message.author.displayAvatarURL()}`})
     .setTimestamp()
message.channel.send(ticketCloseEmbed, { components: [row]}).then((msg) => {
  const filter1 = (button1) => button1.clicker.user.id === message.author.id;
  let collect1 = msg.createButtonCollector(filter1, { time: 500000 });
  collect1.on('collect', async(x) => {
    x.reply.defer()
    if(x.id === "close") {
      x.message.edit('Pak Kardan Channel Bade **3 Saniye**').then(() => {
        setTimeout(() => {
        db.delete(`ticketName_${message.author.id}_${message.guild.id}`);
        db.delete(`ticketID_${message.author.id}_${message.guild.id}`);
          x.message.channel.delete().catch(() => { return });

        }, 3000)
      })
         } else if (x.id === "cancel"){
    let cancelEmbed = new MessageEmbed()
     .setColor(client.colors.none)
     .setTitle(`Darkhast Shoma Cancel Shod`)
     .setDescription(`**Darkhast Shoma Baraie Bastan Ticket Cancel Shod**`)
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter({text:`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, iconURL:`${message.author.displayAvatarURL()}`})
     .setTimestamp(Date.now())
     msg.edit(cancelEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
             }
           setTimeout(() => {
    let timeoutEmbed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`**Darkhast Shoma Anjam Nashod😕 | Lotfan Pas Az Chand Sanie Dobare Darkhast Konid😊**`)
    .setTimestamp(Date.now())
    msg.edit(timeoutEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
           }, 30000) 
        })
       })
      } else {
        message.delete().catch(() => { return });
       return message.channel.send(`shotor nemitoni az in command to in channel estefade koni :/  ${message.author} faghat channel ticket mishe :|`).then(x => x.delete({ timeout: time })).catch(() => { return });
      }
    }  
 
  }
}