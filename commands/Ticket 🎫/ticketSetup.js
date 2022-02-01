module.exports = {
    name: "ticketsetup",
    cooldown: 5,
    aliases: ["tic","tsetup","setupt"],
    category: 'Moderation',
    utilisation: '{prefix}ticketsetup',
    description: "Setup ticket channel",
  async execute(client, message, args) {
    const Discord = require('discord.js')
    const db = require('quick.db')
    const disbut = require('discord-buttons')
           
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
            var ticketChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]);
            var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
            var title = message.content.split(' ').slice(3).join(' ') || 'Ticket channel For Getting Help :)';
              let ErrorEmbed = new Discord.MessageEmbed()
                 .setColor("0xFF0000")
                 .setTitle(`❌ | Ekhtar Besorat Zir Setup Konid`,)
                 .setDescription(`⚠ | Bedin Shekl: ${prefix}ticketsetup <Ticket Channel> <Admins Role> <Ticket Message Title>`)


            if (!adminRole) {
                message.channel.send(ErrorEmbed).then(message.react("⚠️"))
            }
             
            let BTN = new disbut.MessageButton()
                .setStyle("green")
                .setLabel("Sakhtan Ticket")
                .setEmoji("🎟")
                .setID("createTicket")
            let row = new disbut.MessageActionRow()
                .addComponent(BTN);
              let TargetEmbed = new Discord.MessageEmbed()
                 .setColor("RANDOM")
                 .setTitle(title)
                 .setDescription('Baraie Sakht Ticket Be Dokme Zir Click Konid🎟')
let ticketName = db.get(`ticketName_${message.author.id}_${message.guild.id}`);
let ticketID = db.get(`ticketID_${message.author.id}_${message.guild.id}`);
    if (!message.guild.channels.cache.find(x => x.name === ticketName)){
  ticketChannel.send({embed: TargetEmbed ,component: row}).then(message.react("📝")).then(async function() {
                require('quick.db').set(`TicketAdminRole_${message.guild.id}`, adminRole.id)}).then((msg) => {
  const filter = (button1) => button1.clicker.user.id === message.author.id;
  let collect = msg.createButtonCollector(filter, { time: 500000 });
  collect.on('collect', async(x) => {
    x.reply.defer()

    let buttonYes = new disbut.MessageButton()
        .setStyle("green")
        .setID("bale")
        .setLabel("Bale")
        .setEmoji("✔")
    let buttonNo = new disbut.MessageButton()
        .setStyle("red")
        .setID("kheir")
        .setLabel("Kheir")
        .setEmoji("❌")
    let row2 = new disbut.MessageActionRow()
     .addComponents(buttonYes, buttonNo)
    let ticketCreateEmbed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(`Create Ticket`)
     .setDescription('**Aya Motmaen Hastid Ke Mikhahid Ticket Ra Bazconid?**')
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter(`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, `${message.author.displayAvatarURL()}`)
     .setTimestamp(Date.now())
    if(x.id === "createTicket") {
msg.channel.send({embed: ticketCreateEmbed ,component: row2})/*.then((msg) => {
  const filter = (button1) => button1.clicker.user.id === message.author.id;
  let collect = msg.createButtonCollector(filter, { time: 500000 });
  collect.on('collect', async(x) => {
    x.reply.defer()*/
  
    }else  if(x.id === "bale") {
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
   let btn = new disbut.MessageButton()
                .setStyle("grey")
                .setLabel("Bastan Ticket")
                .setEmoji("🔒")
                .setID("configTicket");
    let row = new disbut.MessageActionRow()
                .addComponent(btn);
    let ticketChannelEmbed = new Discord.MessageEmbed()
                .setDescription(`Lotfan Montazer **Staff** Bashid Ta Be Shoma Pashokh Bedahand!!
Bareie Baz Kardan Ticket Roie **"🔒"** Click Konid`)
                .setColor('RANDOM') 
   channel.send(`Ticket Tavasote ${message.author} Baz Shod🙃`,{ embed: ticketChannelEmbed , component: row }).catch(() => { return });

    let yesEmbed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(`Ticket Shoma Sakhte Shod`)
     .setDescription(`**Ticket Shoma Sakhte Shod Va Ba Raftan Be Channel ${channel} Darkhasteton Ra Befarmayid :)**`)
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter(`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, `${message.author.displayAvatarURL()}`)
     .setTimestamp(Date.now())
     msg.delete().catch(() => { return });
     message.channel.send(yesEmbed, null).catch(() => { return });
      })
    }else if (x.id === "kheir"){
    let noEmbed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(`Darkhast Shoma Cancel Shod`)
     .setDescription(`**Darkhast Baraie Sakht Ticket Cancel Shod**`)
     .setURL('https://discord.gg/xgcZNSjanP')
     .setFooter(`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, `${message.author.displayAvatarURL()}`)
     .setTimestamp(Date.now())
     msg.edit(noEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
    }
  })
  setTimeout(() => {
    let timeoutEmbed = new Discord.MessageEmbed()
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