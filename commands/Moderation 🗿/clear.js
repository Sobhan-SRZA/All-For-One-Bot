module.exports = {
    name: 'clear',
    aliases: ['cl'],
    category: 'Moderation 🗿',
    utilisation: '{prefix}clear [number]',
    description: "clear channel and delete some message in channel.",
  async execute(client, message, args) { 

const Discord = require('discord.js');

let Timeout = `6000`; // time of alert embed message deleting. in ms , 1000 ms = 1 second
   try {
     if (!args[0]) return message.reply(`⚠️ | Please Say How Much I’ll Delete Message`)

     if(isNaN(args[0])) return message.reply("🚫 | The Amount Parameter Isn’t a Number! , You Can Used **Number** For Deleting Message")

if (args[0] > 100) return message.reply('🛑 | You Can`t Delete More Than `100` Messages At Once!');

if (args[0] < 1) return message.reply('🛑 | You Have To Delete At Least `1` Message!'); 
   
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
message.reply(`📛 | My Brother You Don’t Have Permission "MANAGE_MESSAGES" `)
} else
         if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {
   let number = args[0]
       number++

const result = new Discord.MessageEmbed()
  .setAuthor(`Message Clearing… | ${message.guild.id}`,message.guild.iconURL({ dynamic: true }))
  .setTitle("✅ | Successful👌🏻")
  .addField("This Count Message Have Been Deleted 👇🏻", number)
  .setColor("RANDOM")
  .setFooter(`Requested By ${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
                            message.channel.bulkDelete(number||10)

message.channel.send(result).then(
            msg => msg.delete({ timeout: Timeout })
        )
           
 let logsChannel = message.guild.channels.cache.find(c => c.id === require('quick.db').get(`modlog_${message.guild.id}`));
function epoch (date) {
  return Date.parse(date)
}
const dateToday =  new Date(); 
const TimeStampDate = epoch(dateToday) / 1000;

    let embed = new Discord.MessageEmbed()
     .setAuthor(message.guild.id + '|'+ message.guild.name, message.guild.iconURL({ dynamic: true }))
     .setTitle(`${client.emotes.error} | Dad Yek Channel Payam Delete Shod`)
     .setColor("#2F3136")
     .setTimestamp()
     .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
     .addField(`Channele Zir Payam Hash Delete Shod: `, message.channel)
     .addField(`Betedad Zir Payam Pack Shod: `, number)
     .addField(`Tavasote : `, message.author)
     .addField(`Dar Tarikhe : `, `**<t:${TimeStampDate}:R>**`);

      logsChannel.send(embed)

    } else return message.reply(`📛 | My Brother I Don’t Have Permission "MANAGE_MESSAGES" `)
      
            }catch(e) {
			console.log(e)
		      }

       }
  }