module.exports = {
    name: 'ticketmenu',
    aliases: ['tm'],
    category: 'Ticket 🎫',
    utilisation: '{prefix}ticketmenu',

  async execute(client, message, args) { 
const db = require("quick.db");
const btn = require("discord-buttons");
const { MessageMenu , MessageMenuOption , MessageButton } = require("discord-buttons");

   let option1 = new MessageMenuOption()
    .setLabel("Status")
    .setValue("Status")
    .setDescription("Neshan Dadane Etealati Az Bot")
    .setDefault()
    .setEmoji("📊")
    
   let option2 = new MessageMenuOption()
    .setLabel("Ping")
    .setValue("Ping")
    .setDescription("Neshan Dadane Pinge Bot")
    .setDefault()
    .setEmoji("🏓")

   let option3 = new MessageMenuOption()
    .setLabel("Invite")
    .setValue("Invite")
    .setDescription("Dadane Linke Invite Bot")
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
  
const Discord = require("discord.js");
const moment = require("moment");

    let help = new Discord.MessageEmbed()
      help.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      help.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      help.setTitle(`${client.user.username} Help Commands :)`)
      help.setDescription(``)
      help.setURL('https://discord.gg/vgnhGXabNw')
      help.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      help.setColor("RANDOM")
      help.addField('**Bot Help**', `\`page 1\``, false)
      help.addField('**VC Filter Help**', `\`page 2\``, false)      
      help.addField('**Music Help**', `\`page 3\``, false)
      help.addField('**Self Bot Help**', `\`page 4\``, false)
      help.addField('**Ticket Help**', `\`page 5\``, false)
      help.addField(`**Links**`, `**[Support Server](${"https://discord.gg/5GYNec4urW"}) • [Invite](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=137775017040&scope=bot)**`)

   let menumsg = await message.channel.send(help,selection)

let infoEmbed = new Discord.MessageEmbed()
      infoEmbed.setColor("RANDOM");
      infoEmbed.setTitle(`Stats from \`${client.user.username}\``);
      infoEmbed.addField(":ping_pong: Ping",`┕\`${Math.round(client.ws.ping)}ms\``,true);

      infoEmbed.addField(":clock1: Uptime", `┕\`${moment.duration(message.client.uptime)}\``,true);
      infoEmbed.addField(":file_cabinet: Memory",`┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}mb\``,true);

      infoEmbed.addField(":homes: Servers",`┕\`${client.guilds.cache.size}\``, true);
      infoEmbed.addField(":busts_in_silhouette: Users",`┕\`${client.users.cache.size}\``,true);
      infoEmbed.addField(":control_knobs: API Latency",`┕\`${message.client.ws.ping}ms\``,true);
      infoEmbed.addField(":robot: Version",`┕\`Omega 5.2.1\``,true);

      infoEmbed.addField(":blue_book: Discord.js",`┕\`v12.2.1\``,true);

          infoEmbed.addField(":green_book: Node",`┕\`16.1.2\``,true);
      infoEmbed.setTimestamp();

            var states = "🟢 Excellent";
            var states2 = "🟢 Excellent";
            var msg = `${Date.now() - message.createdTimestamp}`;
            var api = `${Math.round(client.ws.ping)}`;
            if (Number(msg) > 70) states = "🟢 Good";
            if (Number(msg) > 170) states = "🟡 Not Bad";
            if (Number(msg) > 350) states = "🔴 Soo Bad";
            if (Number(api) > 70) states2 = "🟢 Good";
            if (Number(api) > 170) states2 = "🟡 Not Bad";
            if (Number(api) > 350) states2 = "🔴 Soo Bad";


    let pingEmbed = new Discord.MessageEmbed()
      pingEmbed.setThumbnail(message.client.user.displayAvatarURL())
      pingEmbed.setColor("#2F3136");
      pingEmbed.setDescription(`**Pong🏓!**
      📱${client.user.username} Ping `);
      pingEmbed.addField("**Time Taken:**", `\`${msg + " ms 📶 | " + states}\``, true)
      pingEmbed.addField("**WebSocket:**", `\`${api + " ms 📶 | " + states2}\``, true)
      pingEmbed.setTimestamp();
      pingEmbed.setFooter(`Requested by ${message.author.username} | `, `${message.author.displayAvatarURL()}`);

  let inviteEmbed = new Discord.MessageEmbed()
      inviteEmbed.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      inviteEmbed.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      inviteEmbed.setTitle(`Ba Invite Bot Be Servert Azash Hemaiat Kon☺ ${client.user.username}`)
      inviteEmbed.setDescription(`**Montazer chi hasti🤨? Bodo mano be servert add kon🙂😘 \n\n [Invite Link](https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=412353895745&scope=bot)**`)
      inviteEmbed.setURL(`https://discord.gg/5GYNec4urW`)
      inviteEmbed.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      inviteEmbed.setColor("RANDOM")
 let btn2 = new MessageButton()
    .setStyle('url') 
    .setLabel('🤖Invite Bot') 
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=412353895745&scope=bot`)
     let btn1 = new MessageButton()
    .setStyle('url') 
    .setLabel('🦾Server Support') 
    .setURL(`https://discord.gg/5GYNec4urW`)
    let row = new btn.MessageActionRow()
     .addComponents(btn2, btn1)
//let btnInvite = { embed:inviteEmbed , component: row }
function menuselection(menu) {
  switch(menu.values[0]) {
    case "Status":
          menu.reply.send(infoEmbed, true)
    break;
    case "Ping":
          menu.reply.send(pingEmbed, true)
    break;
    case "Invite":
          menu.reply.send(inviteEmbed ,{ components: row }, true)
    break;
/** 
 *  
default:
          menu.reply.send(":x: Shoma Dastresi Baraie Entekhab Kardan Nadarid", true)
    break;
   
 * 
*/
   
  }
}

client.on("clickMenu", (menu) => {
  if (menu.message.id == menumsg.id){
    if (menu.clicker.user.id) menuselection(menu)
/**
  if (menu.clicker.user.id == message.author.id) menuselection(menu)
    else menu.reply.send(":x: Shoma Dastresi Baraie Entekhab Kardan Nadarid",true)
*/
  }
})

  }
}