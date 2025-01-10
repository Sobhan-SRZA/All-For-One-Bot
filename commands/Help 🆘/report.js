const {
  NeedHelpButtons,
  NeedHelpMenu,
  epochDateNow,
  HelpCategoryEmbed,
  errorEmbed
} = require('../../functions/functions.js');
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const { row } = require('mathjs');
module.exports = {
    name: 'report',
    aliases: ['bug','rp'],
    category: 'Help 🆘',
    usage: '[text]',
    cooldown: 6,
    description: 'for report bot bugs to developers :)',
  async execute(client, message, args) { 
    const choice = args.slice().join(" ");
    try{
      const row = new MessageActionRow()
      .addComponents(NeedHelpButtons(client))  
        if (!choice){
 return message.reply({
                     embed: errorEmbed(message, 'for report a bugs of bot you have to write your *message* right behind of command.', client), 
                     components: [row] 
                    })
        }else {
          const sizarTMserver = client.guilds.cache.get(client.config.discord.server_id);
          const channelbug = sizarTMserver.channels.cache.get(client.config.discord.server_channel_report);
          let invite = await message.channel.createInvite({
              maxAge: 0, 
              maxUses: 5
          })
         const soal = new MessageEmbed()
            .setAuthor({
              name: `${message.author.username}`,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()
            .setTitle(`This Guy Have a Report, User ID: "${message.author.id}"`)
            .setColor('#2F3136')
            .addField(`> **User :**`,`${client.emotes.reply}${interaction.member}`,true)
            .addField(`> **Send :**` ,`${client.emotes.reply}${choice}`,true) 
            .addField(`> **Server :**`, `${client.emotes.reply}${invite.url}`,true)
            .setURL(invite.url)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter({
              text: `Requested By ${message.author.tag}`,
              iconURL: client.user.displayAvatarURL({ dynamic: true })
            })
          channelbug.send({ embeds: [soal] }).then((msg)=> {
            msg.react(client.emotes.report)
           })
           message.reply({
            content: client.emotes.success + `| \`\`\`js\n ${client.emotes.report}| Successfuly your report or bug message send to My Developers ${client.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
            components: [row] 
           })     
    }
  }catch(e) {
    console.log(e)
    const row = new MessageActionRow()
    .addComponents(NeedHelpButtons(client))  
      return message.reply({
            embeds: [errorEmbed(
              message,
              `**we have a problem\n \`\`\`js\n${e}\`\`\`**`
            )],
            components: [row],
        }).then(message.member.send({
          content: `Hi My Friend👋🏻\n if I've got an error or problem please report it for my developers😉\n you can join to support server and talk us:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,
          components: [row] 
            })
        );
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