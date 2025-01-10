const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  Permissions
} = require('discord.js');
const db = require("quick.db");
const {
  errorEmbed,
  successEmbed,
  CustomErrorEmbed
} = require('../../functions/functions.js');
module.exports = {
  name: 'ticket',
  description: "for creating the ticket channel for user in server.",
  category: 'Ticket 🎫',
  cooldown: 1,
  userPermissions: [""],
  botPermissions: [""],
  options: [
    {
      name: "create",
      description: "create ticket channel for user.",
      type: "SUB_COMMAND",
      /*options: [{
          name: "reason",
          description: "your reason for create the ticket channel.",
          type: "STRING",
          required: true
      }]*/
  },
  {
    name: "close",
    description: "close the user ticket channel.",
    type: "SUB_COMMAND",
    options: [{
      name: "ticket-channel",
      description: "Select a channel to close the ticket channel.",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
      required: false
  }]
  },
  {
    name: "delete",
    description: "delete and removing the user ticket channel.",
    type: "SUB_COMMAND",
    options: [{
        name: "ticket-channel",
        description: "Select a channel to delete the ticket channel.",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: false
    }]
  },
  {
    name: "rename",
    description: "rename the user ticket channel name.",
    type: "SUB_COMMAND",
    options: [
      {
        name: "channel-name",
        description: "Provide the channel name of the Target Ticket channel.",
        type: "STRING",
        required: true
      },
      {
        name: "ticket-channel",
        description: "Select a channel to rename the ticket channel.",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: false
      }
    ]
  },
  {
    name: "open",
    description: "open the user ticket channel.",
    type: "SUB_COMMAND",
    options: [{
      name: "ticket-channel",
      description: "Select a channel to open the ticket channel.",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
      required: false
  }]
  },
  {
    name: "add-user",
    description: "adding a target user in to the user ticket channel.",
    type: "SUB_COMMAND",
    options: [{
      name: "ticket-channel",
      description: "Select a channel to adding a target user in to the ticket channel.",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
      required: false
    },
    {
      name: "target-user",
      description: "Select a member to adding in to the ticket channel.",
      type: 'USER',
      channelTypes: ["GUILD_TEXT"],
    }]
  },
  ],

  run: async (bot, interaction, args) => {
  var prefix = await db.fetch(`prefix_${interaction.guild.id}`)||bot.prefix;
  let logsChannel = interaction.guild.channels.cache.find(c => c.id === db.get(`modlog_${interaction.guild.id}`));
  let options = interaction.options;
  const filter = i => i.user.id === interaction.member.id;
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
  let ticketName = db.get(`ticketName_${interaction.member.id}_${interaction.guild.id}`);
  const Sub = options.getSubcommand();
  switch (Sub) {
        case "create": {
            if (!interaction.guild.channels.cache.find(x => x.name === ticketName)){
              interaction.reply({
                embeds: [CustomErrorEmbed(
                          interaction,
                          'Request To Create Ticket',
                          '**your ticket channel will be created but are you sure to do this??\nif your ticket created please wait the moderators or admins to speek there.**',
                          bot.emotes.ticket,
                          bot
                       )],
                 components: [
                  new MessageActionRow()
                   .addComponents((
                     new MessageButton()
                      .setStyle("DANGER")
                      .setCustomId("kheir")
                      .setLabel("No")
                      .setEmoji(bot.emotes.x)
                    ),( 
                      new MessageButton()
                      .setStyle("SUCCESS")
                      .setCustomId("bale")
                      .setLabel("Yes")
                      .setEmoji(bot.emotes.tick)
                    ))
                 ]
              }).then(async function(msg) {
                setTimeout(() => {
                  msg.update({embed:errorEmbed(interaction,'your time for creting the ticket channel is ended.☹')}).catch(err => { return })
                }, 1000 * 50);
                })
          collector.on('collect', async(x) => {
            if(x.id === "bale") {
              interaction.guild.channels.create(`ticket-${interaction.member.tag}`, {
                permissionOverwrites: [{
                        id: interaction.member.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: require('quick.db').fetch(`TicketAdminRole_${interaction.guild.id}`),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }, {
                        id: interaction.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ],
                type: 'GUILD_TEXT',
                reason: `In User Ticket Baz Kard`,
                topic: `**ID:** ${interaction.member.id} || **Tag:** ${interaction.member.tag} | ${prefix}close`
            }).then(async function(channel) {
              db.set(`ticketName_${interaction.member.id}_${interaction.guild.id}`, channel.name);
             interaction.update({
                embed: logsEmbed(
                  interaction,
                  interaction.channel,
                  'Your Ticket Is Ready',
                  'your ticket channel will be created and ready.\nplease wait the moderators or admins to speek there.',
                  bot.emotes.success,
                  bot,
                  channel,
                  'create a new ticket'
                )
              }).catch(() => { return });
            if(logsChannel) return logsChannel.send({
                embed: logsEmbed(
                    interaction,
                    'Request To Create Ticket',
                    'one ticket channel will be created and user stay wait the moderators or admins to talk there.',
                    bot.emotes.setup,
                    bot,
                    channel,
                    'create a new ticket'
                    )
                });
            bot.db.set(`TicketControl_${channel.id}`, interaction.member.id);
                channel.send(`<@${interaction.member.id}>`, {
                    embed: successEmbed(
                        interaction,
                        '**Please wait a moederators or admins to answer you.\nFor closing the ticket, you can click this emoji **"'+bot.emotes.close+'"** in button.**',
                        bot
                        ),
                    component: [(
                      new MessageActionRow()
                       .addComponents(
                         new MessageButton()
                          .setStyle("PRIMARY")
                          .setLabel("Close Ticket")
                          .setEmoji(bot.emotes.close)
                          .setCustomId("configTicket")
                        )
                    )]
                });
            })
          }else if (x.id === "kheir"){
           interaction.update({
             embed: CustomErrorEmbed(
               interaction,
               "Canceling The Create Ticket",
               "user stop the creating a ticket channel for himself.",
               bot.emotes.x,
               bot
               )
            })
          }
          })
          setTimeout(() => {
            interaction.update({
              content: `${bot.emotes.error} **| Error**`,
              embed: errorEmbed(interaction, `**I'm sorry your request can not be working.\nplease try again in letter.😊**`,bot)
            })
          }, 30000)
            } else {
              return interaction.reply({
                ephemeral: true,
                embed: errorEmbed(
                  interaction,
                    bot.emotes.entry+"| **My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.**",
                    bot
                  )
                })
            }
        }
        break;
        case "close": {
          const TicketChannel = options.getChannel("ticket-channel") || interaction.channel;
          if(!interaction.member.roles.cache.has(bot.db.fetch(`TicketAdminRole_${interaction.guild.id}`))) return;
            if (!interaction.guild.channels.cache.find(x => x.name === ticketName)){
              interaction.reply({
                embed: CustomErrorEmbed(
                  interaction,
                  'Request To Close The Ticket',
                  '**your ticket channel will be closed but are you sure to do this??\n**',
                  bot.emotes.close,
                  bot
                  ),
                 components: [(
                  new MessageActionRow()
                   .addComponents((
                     new MessageButton()
                      .setStyle("DANGER")
                      .setCustomId("cancel")
                      .setLabel("Cancel")
                      .setEmoji(bot.emotes.x)
                    ),( 
                      new MessageButton()
                      .setStyle("SUCCESS")
                      .setCustomId("close")
                      .setLabel("Close")
                      .setEmoji(bot.emotes.close)
                    ))
                 )]
              }).then(async function(msg) {
                setTimeout(() => {
                  msg.update({embed:errorEmbed(interaction,'your time for closing the ticket channel is ended.☹')}).catch(err => { return })
                }, 1000 * 50);
                })
              collector.on('collect', async(x) => {
                  if(x.id === "close") {
                    var member = bot.db.fetch(`TicketControl_${interaction.channel.id}`);
                    TicketChannel.overwritePermissions([{
                            id: member,
                            deny: ['SEND_MESSAGES'],
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: bot.db.fetch(`TicketAdminRole_${interaction.guild.id}`),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }, {
                            id: interaction.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ]);
                if(logsChannel) logsChannel.send({
                                embed: logsEmbed(
                                        message,
                                        'Request For Close Ticket',
                                        'this guy ' + interaction.member.tag + " requested to close his ticket and I close the ticket for him.",
                                        bot.emotes.close,
                                        bot,
                                        TicketChannel,
                                        'close the ticket'
                                       )
                            });
    
                interaction.reply({
                    ephemeral: false,
                    embed: successEmbed(
                            interaction,
                            '**This ticket have bin Closed By <@!'+interaction.member.id+'> .**',
                            bot
                           ),
                })
                    interaction.reply({
                        ephemeral: true,
                        embed: errorEmbed(
                            message,
                            'Your **```js\nticket have bin closed.```**\n **you can delete or remove your ticket with click this emoji **"'+bot.emotes.trash+'"** in button to removing or deleting ticket.\nElse you can click this emoji **"'+bot.emotes.open+'"** in button to open the ticket.',
                            bot
                        ),
                        component: [(
                          new MessageActionRow()
                            .addComponents((
                              new MessageButton()
                                .setStyle("SECONDARY")
                                .setEmoji(bot.emotes.open)
                                .setLabel("Open Ticket")
                                .setCustomId("reopenTicket")
                            ),(
                              new MessageButton()
                                .setStyle("DANGER")
                                .setEmoji(bot.emotes.trash)
                                .setLabel("Delete Ticket")
                                .setCustomId("deleteTicket")
                              )
                            )
                        )]
                    })
          }else if (x.id === "cancel"){
            interaction.update({
              embed: CustomErrorEmbed(
                        interaction,
                        "Canceling The Closing Ticket",
                        "user stop the closing a ticket channel for himself.",
                        bot.emotes.x,
                        bot
                     )
             })
          }
        })
        setTimeout(() => {
         interaction.update({
           content: `${bot.emotes.error} **| Error, \`\`\`js\n${e}\`\`\`**`,
           embed: errorEmbed(interaction, `**I'm sorry your request can not be working.\nplease try again in letter.😊**`,bot)
         })
        }, 30000)
        } else {
           return interaction.reply({
             ephemeral: true,
             embed: errorEmbed(
               interaction,
                 bot.emotes.entry+"| **My Friend, your ticket dosn't here.\nI can't close the ticket for you because you have got a another ticket.\nAlso you can close your old ticket.**",
                 bot
               )
             })
         }
        }
        break;
        case "delete": {
          const TicketChannel = options.getChannel("ticket-channel") || interaction.channel;
          if(!interaction.member.roles.cache.has(bot.db.fetch(`TicketAdminRole_${interaction.guild.id}`))) return;
          if (!interaction.guild.channels.cache.find(x => x.name === ticketName)){
              interaction.reply({
                embed: CustomErrorEmbed(
                  interaction,
                  'Request To Delete The Ticket',
                  '**your ticket channel will be delete but are you sure to do this??\n**',
                  bot.emotes.close,
                  bot
                  ),
                 components: [(
                  new MessageActionRow()
                   .addComponents((
                     new MessageButton()
                      .setStyle("DANGER")
                      .setCustomId("cancel")
                      .setLabel("Cancel")
                      .setEmoji(bot.emotes.x)
                    ),(
                      new MessageButton()
                      .setStyle("SUCCESS")
                      .setCustomId("delete")
                      .setLabel("Delete")
                      .setEmoji(bot.emotes.trash)
                    ))
                 )]
              }).then(async function(msg) {
                setTimeout(() => {
                  msg.update({embed:errorEmbed(interaction,'your time for deleting the ticket channel is ended.☹')}).catch(err => { return })
                }, 1000 * 50);
                })
                collector.on('collect', async(x) => {
                  if(x.id === "delete") {
                    interaction.reply({
                      ephemeral: false,
                      embed: successEmbed(interaction,
                          "this user "+interaction.member+" ticket have bin deleted in `5s` latter.\nplease wait.",
                          bot
                          )
                  });
              setTimeout(() => {
                TicketChannel.delete();
                bot.db.delete(`TicketControl_${interaction.channel.id}`);
                bot.db.delete(`ticketName_${interaction.member.id}_${interaction.guild.id}`);
              }, 1000 * 5);
              if(logsChannel) logsChannel.send({
                              embed: logsEmbed(interaction,
                                  "Request To Delete The Ticket",
                                  'this guy ' + interaction.member.tag + " requested to delete his ticket and I delete the ticket for him.",
                                  bot.emotes.trash,
                                  bot,
                                  TicketChannel,
                                  'delete the ticket'
                                  )
                          });
          }else if (x.id === "cancel"){
            interaction.update({
              embed: CustomErrorEmbed(
                        interaction,
                        "Canceling The Deleting Ticket",
                        "user stop the deleting a ticket channel for himself.",
                        bot.emotes.x,
                        bot
                     )
             })
            }
          })
          setTimeout(() => {
           interaction.update({
             content: `${bot.emotes.error} **| Error, \`\`\`js\n${e}\`\`\`**`,
             embed: errorEmbed(interaction, `**I'm sorry your request can not be working.\nplease try again in letter.😊**`,bot)
           })
          }, 30000)
            } else {
              return interaction.reply({
                ephemeral: true,
                embed: errorEmbed(
                          interaction,
                          bot.emotes.entry+"| **My Friend, your ticket dosn't here.\nI can't delete the ticket for you because you have got a another ticket.\nAlso you can close your old ticket.**",
                          bot
                       )
             })
         }
        }
        break;
        case "rename": {
          const TicketChannel = options.getChannel("ticket-channel") || interaction.channel;
          const renameMessage = options.getString("channel-name");
          if(!interaction.member.roles.cache.has(bot.db.fetch(`TicketAdminRole_${interaction.guild.id}`))) return;
          if (!interaction.channel.name.includes("ticket-")) {
          if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
              interaction.reply({
                  embed: errorEmbed(interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```",bot)
              })
              return
          }
          if (!renameMessage) {
              interaction.reply({
                  embed: errorEmbed(interaction, '**for changing the ticket name you have got tell me it.\nplease write your target name right behind the command.**',bot)
             })
              return
          }
          interaction.reply({
              embed: CustomErrorEmbed(interaction,'Request To Change Ticket Name','are you sure to change your ticket channel name??',bot.emotes.error,bot),
              components: [(
               new MessageActionRow()
              .addComponents((
               new MessageButton()
                .setStyle("SUCCESS")
                .setEmoji("✅")
                .setLabel("Change Name")
                .setID("renameTicketTrue")
              ),(
               new MessageButton()
                .setStyle("DANGER")
                .setEmoji("⛔")
                .setLabel("Cancel")
                .setID("renameTicketFalse")
              ))
              )]
          }).then(async function(msg) {
              setTimeout(() => {
                msg.update({embed:errorEmbed(interaction,'your time for changing the ticket channel name is ended.☹')}).catch(err => { return })
             }, 1000 * 50);
              db.set(`RenameTicket_${interaction.channel.id}`, renameMessage)
              db.set(`DeleteRenameMessage_${interaction.channel.id}`, msg.id)
          })
          collector.on('collect', async(button) => {
            if (button.id == 'renameTicketFalse') {
                button.update({
                            ephemeral: false,
                            embed: errorEmbed(button,
                                    `your ticket name have not changed. ${bot.emotes.x}`,
                                    bot
                                    )
                })
                var msg = bot.db.fetch(`DeleteRenameMessage_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                bot.db.delete(`DeleteRenameMessage_${button.channel.id}`);
            } else if (button.id == 'renameTicketTrue') {
                var msg = bot.db.fetch(`DeleteRenameMessage_${button.channel.id}`);
                button.channel.messages.fetch(msg).then(message => message.delete()).catch(err => { return });
                TicketChannel.setName('ticket-' + bot.db.fetch(`RenameTicket_${button.channel.id}`));
                button.update({
                            ephemeral: false,
                            embed: successEmbed(button,
                                    `your ticket name have bin changed successfuly${bot.emotes.success}.\nyour ticket name is changed to:\`${bot.db.fetch(`RenameTicket_${button.channel.id}`)}\``,
                                    bot
                                    )
                })
                bot.db.delete(`DeleteRenameMessage_${button.channel.id}`);
                          if(logsChannel) logsChannel.send({  
                                              embed: logsEmbed(button,
                                                        'Request To Rename The Ticket',
                                                        `user last ticket request to rename and ticket have bin renamed to \`${'ticket-' + bot.db.fetch(`RenameTicket_${button.channel.id}`)}\` by me.`,
                                                        bot.emotes.rename,
                                                        bot,
                                                        TicketChannel,
                                                        'rename the last ticket'
                                                     )
                                          });
            }
          })
          } else {
              return interaction.reply({
                ephemeral: true,
                embed: errorEmbed(
                          interaction,
                          bot.emotes.entry+"| **My Friend, your ticket dosn't here.\nI can't rename the ticket for you because you have got a another ticket.\nAlso you can close your old ticket.**",
                          bot
                       )
             })
         }
        }
        break;
        case "open":{
          const TicketChannel = options.getChannel("ticket-channel") || interaction.channel;
          if(!interaction.member.roles.cache.has(bot.db.fetch(`TicketAdminRole_${interaction.guild.id}`))) return;
          if (!interaction.channel.name.includes("ticket-")) {
          if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return interaction.reply({
                     embed: errorEmbed(interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```",bot)
                   })
          }
          interaction.reply({
            embed: CustomErrorEmbed(
              interaction,
              'Request To Open The Ticket',
              '**your ticket channel will be openning, but are you sure to do this??\n**',
              bot.emotes.close,
              bot
              ),
             components: [(
              new MessageActionRow()
               .addComponents((
                 new MessageButton()
                  .setStyle("DANGER")
                  .setCustomId("cancel")
                  .setLabel("Cancel")
                  .setEmoji(bot.emotes.x)
                ),
                (new MessageButton()
                  .setStyle("SUCCESS")
                  .setCustomId("open")
                  .setLabel("Open")
                  .setEmoji(bot.emotes.open)
                ))
             )]
          }).then(async function(msg) {
            setTimeout(() => {
              msg.update({embed:errorEmbed(interaction,'your time for openning the ticket channel is ended.☹')}).catch(err => { return })
            }, 1000 * 50);
            })
          collector.on('collect', async(button) => {
            if (button.id == "open") {
                  button.reply({
                      ephemeral: false,
                      embed: successEmbed(button,
                          "user ticket have bin openning by "+button.member+".",
                          bot
                          )
                  });
                  var member = bot.db.fetch(`TicketControl_${button.channel.id}`);
                  TicketChannel.overwritePermissions([{
                          id: member,
                          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                      },
                      {
                          id: bot.db.fetch(`TicketAdminRole_${button.guild.id}`),
                          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                      }, {
                          id: button.guild.roles.everyone,
                          deny: ["VIEW_CHANNEL"]
                      }
                  ]);
                  if(logsChannel) logsChannel.send({  
                    embed: logsEmbed(button,
                        'Request To Open The Ticket',
                        `user last ticket request to openning and ticket have bin open by me.`,
                        bot.emotes.open,
                        bot,
                        TicketChannel,
                        'open the last ticket'
                    )
                });
            }else if (button.id === "cancel"){
              interaction.update({
                embed: CustomErrorEmbed(
                          interaction,
                          "Canceling The Open The Ticket",
                          "user stop the openning his ticket channel.",
                          bot.emotes.x,
                          bot
                       )
               })
              }
          })
          } else {
              return interaction.reply({
                ephemeral: true,
                embed: errorEmbed(
                          interaction,
                          bot.emotes.entry+"| **My Friend, your ticket dosn't here.\nI can't open the ticket for you because you have got a another ticket.\nAlso you can close your old ticket.**",
                          bot
                       )
             })
         }
        }
        break;
        case "add-user":{
          let TicketChannel = options.getChannel("ticket-channel") || interaction.channel;
          let member = options.getMember('target-user');
          if (!interaction.channel.name.includes("ticket-")) {
            interaction.reply({
                embed: errorEmbed(
                             interaction,
                             bot.emotes.entry+"| **My Friend, your ticket dosn't here.\nI can't add people in this channel for you because you have got a another ticket.\nAlso you can close your old ticket.**",
                             bot
                          )
            })
            return
        }
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            interaction.reply({
                embed: errorEmbed(interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```",bot)
            })
            return
        }
        interaction.reply({
          embed: CustomErrorEmbed(
            interaction,
            'Request To Adding People To Ticket',
            '**in your ticket channel will be adding some members but are you sure to do this??\n**',
            bot.emotes.close,
            bot
            ),
           components: [(
            new MessageActionRow()
             .addComponents(
               (new MessageButton()
                .setStyle("DANGER")
                .setCustomId("cancel")
                .setLabel("Cancel")
                .setEmoji(bot.emotes.x)
              ),(
                new MessageButton()
                .setStyle("SUCCESS")
                .setCustomId("add")
                .setLabel("Add")
                .setEmoji(bot.emotes.add)
              ))
           )]
        }).then(async function(msg) {
          setTimeout(() => {
            msg.update({embed:errorEmbed(interaction,'your time for adding people in to the ticket channel is ended.☹')}).catch(err => { return })
          }, 1000 * 50);
          })
        collector.on('collect', async(x) => {
              if(x.id === "add") {
                var txt;
                var mem = member.name;
                if (!mem || mem == null || mem == undefined) {
                    txt = '<@!' + member.id + '>'
                } else {
                    txt = '<@&' + member.id + '> role'
                }
                TicketChannel.overwritePermissions([{
                    id: require('quick.db').fetch(`TicketControl_${interaction.channel.id}`),
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }, {
                    id: member.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                }, {
                    id: require('quick.db').fetch(`TicketAdminRole_${interaction.guild.id}`),
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }]).then(() => {
                    interaction.reply({
                        embed: successEmbed(
                                interaction,
                                "**I add this people** *"+txt+"* **to your ticket bro.**",
                                bot
                               ),
                    })
                })
              if(logsChannel) logsChannel.send({
                              embed: logsEmbed(interaction,
                                  "Request To Adding People To Ticket",
                                  'this guy ' + interaction.member.tag + "**requested to adding people to his ticket and I add this people the ticket for him:**\n*"+txt+"*",
                                  bot.emotes.add,
                                  bot,
                                  TicketChannel,
                                  'add people in to the ticket'
                                  )
                          });
          }else if (x.id === "cancel"){
            interaction.update({
              embed: CustomErrorEmbed(
                        interaction,
                        "Canceling The Adding People To Ticket",
                        "user stop the adding people to his ticket channel.",
                        bot.emotes.x,
                        bot
                     )
             })
            }
        })
        }
        break;
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