const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = async function(client, button) {
    try {
function epoch (date) {
  return Date.parse(date)
}
const dateToday =  new Date(); 
const TimeStampDate = epoch(dateToday) / 1000;
let logsChannel = button.guild.channels.cache.find(c => c.id === db.get(`modlog_${button.guild.id}`));
const prefix = await require("quick.db").fetch(`prefix_${button.guild.id}`)||process.env.PREFIX;
    if (button.id == 'createTicket') {
let ticketName = db.get(`ticketName_${button.clicker.user.id}_${button.guild.id}`);
      if (!button.guild.channels.cache.find(x => x.name === ticketName)) {
                button.guild.channels.create(`ticket-${button.clicker.user.tag}`, {
                    permissionOverwrites: [{
                            id: button.clicker.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }, {
                            id: button.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text',
                    reason: `In User Ticket Baz Kard`,
                    topic: `**ID:** ${button.clicker.user.id} || **Tag:** ${button.clicker.user.tag} | ${prefix}close`

                }).then(async function(channel) {
    db.set(`ticketName_${button.clicker.user.id}_${button.guild.id}`, channel.name);

  let userTicket = new Discord.MessageEmbed()
        .setAuthor(`✔ | Ticket Sakhte Shod`)
        .setTimestamp()
        .setColor('#2F3136')
        .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
        .setDescription(`Yek Fard Ticket Baz Kard Va Motazere Pasokhgoii Staff Hast`)
        .addField(`Etelat`, `**Ticket :** ${channel}\n**Dar Tarikhe :** <t:${TimeStampDate}:R>`);

        button.reply.send(userTicket,true)
          
        let createdEmbed = new Discord.MessageEmbed()
        .setAuthor(`📝 | Yek Ticket Sakhte Shod`)
        .setTimestamp()
        .setColor('#2F3136')
        .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
        .setDescription(`Yek Fard Ticket Baz Kard Va Motazere Pasokhgoii Staff Hast`)
        .addField(`Etelat`, `**Tavasote :** \`${button.clicker.user.tag}\`\n**ID :** \`${button.clicker.user.id}\`\n**Ticket :** ${channel}\n**Dar Tarikhe :** <t:${TimeStampDate}:R>`);
           if(logsChannel) logsChannel.send(createdEmbed);

                    require('quick.db').set(`TicketControl_${channel.id}`, button.clicker.user.id);
                    let btn = new MessageButton()
                        .setStyle("grey")
                        .setLabel("Gofle Ticket")
                        .setEmoji("🔒")
                        .setID("configTicket");
    
                    let row = new MessageActionRow()
                        .addComponent(btn);
                    channel.send(`<@${button.clicker.user.id}>`, {
                        embed: {
                            description: `Lotfan Montazer **Staff** Bashid Ta Be Shoma Pasokh Bedahand!!\nBareie Gofl Ticket Roie **"🔒"** Click Konid`,
                            color:'RANDOM'
                        },
                        component: row
                    })
                });
            }else{
          let TicketError = new MessageEmbed()
            .setColor("0xFF0000")
            .setDescription(`Shoma Az Ghabl Yek Ticket Sakhtid ⛔`)
            .setTitle(`**❌ | Error**`)
        return button.reply.send(TicketError,true)
            }
            
            } else if (button.id == 'configTicket') {
                if (!button.channel.name.includes("ticket-")) {
                    return;
                }
                var member = require('quick.db').fetch(`TicketControl_${button.channel.id}`);
                button.channel.overwritePermissions([{
                        id: member,
                        deny: ['SEND_MESSAGES'],
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }, {
                        id: button.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ]);
        let bastanEmbed = new Discord.MessageEmbed()
        .setAuthor(`🔒| Dar Khast Baste Shodan Ticket`)
        .setColor('#2F3136')
        .setDescription(`Tickete User ${button.clicker.user.tag} Gofl Shode`)
        .setTimestamp()
        .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
        .addField(`Etelat`, `**Tavasote :** \`${button.clicker.user.tag}\`\n**ID :** \`${button.clicker.user.id}\`\n**Ticket :** ${button.channel}\n**Dar Tarikhe :** <t:${TimeStampDate}:R>`);

        if(logsChannel) logsChannel.send(bastanEmbed);
                button.channel.send({
                    embed: {
                        description: `Ticket Tavasote <@!${button.clicker.user.id}> Baste Shod🙃`,
                        color: 'RANDOM'
                    }
                })
                let btn = new MessageButton()
                    .setStyle("grey")
                    .setEmoji("🔓")
                    .setLabel("Baz Kardan Ticket")
                    .setID("reopenTicket");
                let btn2 = new MessageButton()
                    .setStyle("grey")
                    .setEmoji("⛔")
                    .setLabel("Pak Kardan Ticket")
                    .setID("deleteTicket");
                let row = new MessageActionRow()
                    .addComponent(btn2)
                    .addComponent(btn);
                button.channel.send({
                    embed: {
                        description: 'Roie **"⛔"** Feshar Dahid Ta Ticket Pak Shavad Va Baraie Baz Kardan Ticket Roie **"🔓"** Click Konid',
                        color: 'RED'
                    },
                    component: row
                })
            } else if (button.id == "deleteTicket") {
                require('quick.db').delete(`TicketControl_${button.channel.id}`);
                button.channel.send({
                    embed: {
                        description: `${button.clicker.user}Ticket Ro Bade` + " `5` " + `Sanie Mipakam Sabr Kon😁`,
                        color: 'RANDOM'
                    }
                });
        let deletedEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️| Dar Khast Delete Shodan Ticket`)
        .setColor('#2F3136')
        .setDescription(`User Ticket Khod Ra Baraye Delete Shodan Taiid Kard Va Delete Shod`)
        .setTimestamp()
        .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
        .addField(`Etelat`, `**Tavasote :** \`${button.clicker.user.tag}\`\n**ID :** \`${button.clicker.user.id}\`\n**Ticket :** 
\`${button.channel.name}\`\n**Dar Tarikhe :** <t:${TimeStampDate}:R>`);

        if(logsChannel) logsChannel.send(deletedEmbed);

                setTimeout(() => {
                    button.channel.delete();
                }, 1000 * 5);
        db.delete(`ticketName_${button.clicker.user.id}_${button.guild.id}`);

            } else if (button.id == "reopenTicket") {
        let bazEmbed = new Discord.MessageEmbed()
        .setAuthor(`🔓| Ticket Baz Shod`)
        .setColor('#2F3136')
        .setDescription(`Tickete User ${button.clicker.user.tag} Baz Shode`)
        .setTimestamp()
        .setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
        .addField(`Etelat`, `**Tavasote :** \`${button.clicker.user.tag}\`\n**ID :** \`${button.clicker.user.id}\`\n**Ticket :** ${button.channel}\n**Dar Tarikhe :** <t:${TimeStampDate}:R>`);

        if(logsChannel) logsChannel.send(bazEmbed);
                button.channel.send({
                    embed: {
                        description: `Ticket Tavasote <@!${button.clicker.user.id}> Baz Shod🙃`,
                        color: 'RANDOM'
                    }
                })
                var member = require('quick.db').fetch(`TicketControl_${button.channel.id}`);
                button.channel.overwritePermissions([{
                        id: member,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: require('quick.db').fetch(`TicketAdminRole_${button.guild.id}`),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }, {
                        id: button.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ]);
            }/*
else if (button.id == 'renameTicketFalse') {
                var msg = require('quick.db').fetch(`DeleteRenameMessage_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                require('quick.db').delete(`DeleteRenameMessage_${button.channel.id}`);
            } else if (button.id == 'renameTicketTrue') {
                var msg = require('quick.db').fetch(`DeleteRenameMessage_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                button.channel.setName('ticket-' + require('quick.db').fetch(`RenameTicket_${button.channel.id}`));
                button.channel.send({
                            embed: {
                                title: '🎫',
                                description: `Esm Ticket Shoma Taghir Yaft😄 Esme Ticke Hast 👉🏻 \`${require('quick.db').fetch(`RenameTicket_${button.channel.id}`)}\``,
                        color: 'RANDOM'
                }
            })
            require('quick.db').delete(`DeleteRenameMessage_${button.channel.id}`);
            }*/
        }catch(e) {
            function NeedHelpButtons() {
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
            console.log(e)
              return button.reply.send(`${client.emotes.error} **| Error, ${e}**`,true).then(button.clicker.user.send(`Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,{ components: [NeedHelpButtons()] }));
                }
    }