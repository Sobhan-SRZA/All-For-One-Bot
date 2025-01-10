/**
 *  collector = msg.createMessageComponentCollector({
 *    filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id,
 *    time: 600000
 *  }); //collector for 1 minute
 */
const {
    MessageButton,
    MessageActionRow,
    MessageEmbed
} = require('discord.js');
const db = require('quick.db');
const Discord = require('discord.js');
var clc = require("cli-color");
const {
    NeedHelpButtons,
    NeedHelpMenu,
    HelpCategoryEmbed,
    GenderMenu,
    profMenu,
    profEmbed,
    commandsData
  } = require("../../functions/help_functions")
const {
    epochDateNow,
    CustomErrorEmbed,
    list,
    errorEmbed,
    logsEmbed,
    successEmbed,
    createColorRole
 } = require('../../functions/functions.js');
module.exports = async (client, button) => {
try {
    if(!button.isButton())return;    
     let logsChannel = button.guild.channels.cache.find(c => c.id === db.get(`modlog_${button.guild.id}`));
     const prefix = await require("quick.db").fetch(`prefix_${button.guild.id}`)||client.prefix;
    if (button.customId == 'createTicket') {
     let ticketName = db.get(`ticketName_${button.author.id}_${button.guild.id}`);
      if (!button.guild.channels.cache.find(x => x.name === ticketName)) {
                button.guild.channels.create(`ticket-${button.author.tag}`, {
                    permissionOverwrites: [{
                            id: button.author.id,
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
                    type: 'GUILD_TEXT',
                    reason: `In User Ticket Baz Kard`,
                    topic: `**ID:** ${button.author.id} || **Tag:** ${button.author.tag} | ${prefix}close`

                }).then(async function(channel) {
                client.db.set(`ticketName_${button.author.id}_${button.guild.id}`, channel.name);
            button.reply({
                content: '',
                ephemeral: true,
                embed: logsEmbed(
                button,
                button.channel,
                'Your Ticket Is Ready',
                'your ticket channel will be created and ready.\nplease wait the moderators or admins to speek there.',
                client.emotes.success,
                client,
                channel,
                'create a new ticket'
                )
            })
        if(logsChannel) return logsChannel.send({
            embed: logsEmbed(
                button,
                'Request To Create Ticket',
                'one ticket channel will be created and user stay wait the moderators or admins to talk there.',
                client.emotes.setup,
                client,
                channel,
                'create a new ticket'
                )
            });
                client.db.set(`TicketControl_${channel.id}`, button.author.id);
                    channel.send(`<@${button.author.id}>`, {
                        embed: successEmbed(
                            button,
                            '**Please wait a moederators or admins to answer you.\nFor closing the ticket, you can click this emoji **"'+client.emotes.close+'"** in button.**',
                            client
                            ),
                        component: (new MessageActionRow()
                        .addComponent(new MessageButton()
                        .setStyle("PRIMARY")
                        .setLabel("Close Ticket")
                        .setEmoji(client.emotes.close)
                        .setCustomId("configTicket")))
                    })
                });
            }else{
        return button.reply({
                content: '',
                ephemeral: true,
                embed: errorEmbed(
                    button,
                    client.emotes.entry+"| **My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.**",
                    client
                )
            })
            }
            
            } else if (button.customId == 'configTicket') {
                if (!button.channel.name.includes("ticket-")) {
                    return;
                }
                var member = client.db.fetch(`TicketControl_${button.channel.id}`);
                button.channel.overwritePermissions([{
                        id: member,
                        deny: ['SEND_MESSAGES'],
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: client.db.fetch(`TicketAdminRole_${button.guild.id}`),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }, {
                        id: button.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ]);
            if(logsChannel) logsChannel.send({
                            embed: logsEmbed(
                                    message,
                                    'Request For Close Ticket',
                                    'this guy ' + button.member.tag + " requested to close his ticket and I close the ticket for him.",
                                    client.emotes.close,
                                    client,
                                    button.channel,
                                    'close the ticket'
                                    )
                        });

            button.reply({
                content: '',
                ephemeral: false,
                embed: successEmbed(
                    button,
                    '**This ticket have bin Closed By <@!'+button.author.id+'> .**',
                    client
                    ),
            })
                button.reply({
                    ephemeral: true,
                    embed: errorEmbed(
                        message,
                        'Your **```js\nticket have bin closed.```**\n **you can delete or remove your ticket with click this emoji **"'+bot.emotes.trash+'"** in button to removing or deleting ticket.\nElse you can click this emoji **"'+bot.emotes.open+'"** in button to open the ticket.',
                        client
                    ),
                    component: (
                        new MessageActionRow()
                          .addComponent((
                            new MessageButton()
                              .setStyle("SECONDARY")
                              .setEmoji(client.emotes.open)
                              .setLabel("Open Ticket")
                              .setCustomId("reopenTicket"))
                          )
                          .addComponent((
                            new MessageButton()
                              .setStyle("DANGER")
                              .setEmoji(client.emotes.trash)
                              .setLabel("Delete Ticket")
                              .setCustomId("deleteTicket"))
                          )
                      )
                })
            } else if (button.customId == "deleteTicket") {
                client.db.delete(`TicketControl_${button.channel.id}`);
                button.reply({
                    content: '',
                    ephemeral: false,
                    embed: successEmbed(button,
                        "this user "+button.member+" ticket have bin deleted in `5s` latter.\nplease wait.",
                        client
                        )
                });
        if(logsChannel) logsChannel.send({
                            embed: logsEmbed(button,
                                "Request To Delete The Ticket",
                                'this guy ' + button.member.tag + " requested to delete his ticket and I delete the ticket for him.",
                                client.emotes.trash,
                                client,
                                button.channel,
                                'delete the ticket'
                                )
                        });

                setTimeout(() => {
                    button.channel.delete();
                }, 1000 * 5);
            client.db.delete(`ticketName_${button.author.id}_${button.guild.id}`);
            } else if (button.customId == "reopenTicket") {
            if(logsChannel) logsChannel.send({  
                            embed: logsEmbed(button,
                                'Request To Open The Ticket',
                                `user last ticket request to opening and ticket have bin open by me.`,
                                client.emotes.open,
                                client,
                                button.channel,
                                'open the last ticket'
                            )
                        });
                button.reply({
                    content: '',
                    ephemeral: false,
                    embed: successEmbed(button,
                        "user ticket have bin opening by "+button.member+".",
                        client
                        )
                });
                var member = client.db.fetch(`TicketControl_${button.channel.id}`);
                button.channel.overwritePermissions([{
                        id: member,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: client.db.fetch(`TicketAdminRole_${button.guild.id}`),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }, {
                        id: button.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ]);
            }else if (button.customId == "set_prof_button_home") {
                button.update({
                    embeds: [profEmbed(client, button)],
                    components: [[profMenu(client)]]
                  })
            }
    }catch(e) {
    console.log(e)
    return button.reply({
        embeds: [errorEmbed(
          button,
          `**we have a problem\n \`\`\`js\n${e}\`\`\`**`
        )],
        components: [NeedHelpButtons(client)],
        ephemeral: false,
    }).then(button.member.send({
      content: `Hi My Friend👋🏻\n if I've got an error or problem please report it for my developers😉\n you can join to support server and talk us:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,
      components: [NeedHelpButtons(client)] 
        })
    );
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