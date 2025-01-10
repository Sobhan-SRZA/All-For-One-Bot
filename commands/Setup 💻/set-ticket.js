module.exports = {
    name: "ticketsetup",
    cooldown: 5,
    aliases: ["tic","tsetup","setupt"],
    category: 'Setup 💻',
    usage: '[channel] [role] [title]',
    description: "Setup ticket channel",
  async execute(client, message, args) {
const { MessageButton, MessageActionRow } = require('discord.js');
const Discord = require('discord.js');

    try {
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = process.env.PREFIX;
            let logsChannel = message.guild.channels.cache.find(c => c.id === require('quick.db').get(`modlog_${message.guild.id}`));
            var ticketChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
            var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
            var title = message.content.split(' ').slice(3).join(' ') || 'Ticket Bot';
            if (!adminRole) {
                message.channel.send({
                    embed: {
                        title: `❌ | Ekhtar Besorat Zir Setup Konid`,
                        description: `⚠ | Bedin Shekl: ${prefix}setup <Ticket Channel> <Admins Role> <Ticket Message Title>`,
                        color: 0xFF0000
                    }
                })
                 return
            }
function epoch (date) {
  return Date.parse(date)
}
const dateToday = new Date(); 
const TimeStampDate = epoch(dateToday) / 1000;
   let embed = new Discord.MessageEmbed()
     .setAuthor({name:message.guild.id + '|'+ message.guild.name, iconURL:message.guild.iconURL({ dynamic: true })})
     .setTitle(`✅ | Ticket Set Shod`)
     .setColor("#2F3136")
     .setTimestamp()
     .setFooter({text:"Created By Mr.SIN RE#1528 :)", iconURL:`https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
     .addField(`Channele Ticket Set Shod: `, ticketChannel)
     .addField(`Tavasote : `, message.author)
     .addField(`Dar Tarikhe : `, `**<t:${TimeStampDate}:R>**`);

    logsChannel.send({embed: embed});

    message.channel.send(`${message.author} Ticket Roye Channel Setup Shod ${ticketChannel}`).then(m => m.react(client.emotes.success)).then( message.react(client.emotes.setup));
            let btn = new MessageButton()
                .setStyle("green")
                .setLabel("Sakhtan Ticket")
                .setEmoji("🎟")
                .setCustomId("createTicket")
            let row = new MessageActionRow()
                .addComponent(btn);
            ticketChannel.send({
                embed: {
                    color:'#2F3136',
                    image:'',
                    thumbnail:'',
                    description: 'Baraie Sakht Ticket Be Dokme Zir Click Konid🎟',
                    title: title
                },
                component: row
            }).then(async function() {
                require('quick.db').set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
            })
        } catch (err) {
            return;
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