const {
  Permissions
} = require('discord.js');
const { 
  NeedHelpButtons,
  logsEmbed, 
  errorEmbed,
  CustomErrorEmbed
} = require('../../functions/functions');
module.exports = {
    name: 'clear',
    aliases: ['cl'],
    category: 'Moderation 🗿',
    usage: '[number]',
    cooldown: 60,
    description: "clear channel and delete some message in channel.",
  async execute(client, message, args, prefix, logsChannel) { 
    let Timeout = `6000`; // time of alert embed message deleting. in ms , 1000 ms = 1 second
   try {
     if(isNaN(args[0])) 
     return message.reply({
                      embeds: [errorEmbed(
                        message,
                        'The Amount Parameter Isn’t a Number! , You Can Used **Number** For Deleting Message🚫',
                        client
                      )]
                  });

if (args[0] > 100) 
    return message.reply({
                      embeds: [errorEmbed(
                        message,
                        ' You Can`t Delete More Than `100` Messages At Once!🛑',
                        client
                      )]
                  });

if (args[0] < 1)
    return message.reply({
                      embeds: [errorEmbed(
                        message,
                        'You Have To Delete At Least `1` Message!🛑',
                        client
                      )]
                  });
   
  if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        return message.reply({
                      embeds: [errorEmbed(
                        message,
                        'My Brother You Don’t Have Permission "MANAGE_MESSAGES"',
                        client
                      )]
                  });
  } else if(message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
   let number = args[0]||100
       number++

      message.channel.bulkDelete(number,{ filterOld: true })
      message.reply({
        embeds: [CustomErrorEmbed(
          message,
          "Successfuly👌🏻 Clear The Messages",
          `**This Count Message Have Been Deleted: _${number}_**`,
          client.emotes.trash,
          client
        )]
      }).then(
                  msg => msg.delete({ timeout: Timeout })
              )

     if(logsChannel)return logsChannel.send({
                                embeds: [logsEmbed(
                                  message,
                                  "Clear Messages In Channel",
                                  "someone used `clear` command to delete channel messages.\n```js\nDeleted This Much Messages In Text Channel: " + number + "\n```",
                                  client.emotes.trash,
                                  client,
                                  message.channel,
                                  "delete messages in channel"
                                )]
                           })
    } else return message.reply({
                      embeds: [errorEmbed(
                        message,
                        'My Brother I Don’t Have Permission "MANAGE_MESSAGES"',
                        client
                      )]
                  })
      
            }catch(e) {
			console.log(e)
            return message.reply({
            embeds: [errorEmbed(
              message,
              `**we have a problem\n \`\`\`js\n${e}\`\`\`**`
            )],
            components: [NeedHelpButtons(client)],
        }).then(message.member.send({
          content: `Hi My Friend👋🏻\n if I've got an error or problem please report it for my developers😉\n you can join to support server and talk us:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,
          components: [NeedHelpButtons(client)] 
            })
        );
      }
   }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */