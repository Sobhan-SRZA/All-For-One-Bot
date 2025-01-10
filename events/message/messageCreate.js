const { 
  MessageEmbed 
} = require("discord.js")
var clc = require("cli-color");
const { 
  NeedHelpButtons 
} = require("../../functions/help_functions.js");
const { 
  commandsCoolDown,
  CustomErrorEmbed
} = require("../../functions/functions.js");
module.exports = async (client, message) => {
      if(message.channel.type === 'dm'){
        if(!message.author.bot === message.user) return message.reply("You are Bot 🤖")
        if(message.content.includes(`@everyone`)) return
        if(message.author.id === process.env.USER_ID)return
        if(message.content.includes('@'))return message.channel.send(client.emotes.entry+"| **you can't mention someone.**")
      const sizarTMserver = client.guilds.cache.get(client.config.discord.server_id);
      const channelbug = sizarTMserver.channels.cache.get(client.config.discord.server_channel_report);
        const embed = new MessageEmbed()
          .setColor(client.colors.none)
          .setAuthor({name:`${message.author.username}`,iconURL:message.author.displayAvatarURL({ dynamic: true })})
          .setTimestamp()
          .setTitle(`This Guy Have Report, User ID "${message.author.id}"`)
          .setDescription(`> ${message.content}`)
        channelbug.send(embed).then((msg)=> {
          msg.react(client.emotes.report)
         }).then(
             message.reply({
              content: client.emotes.success + `| \`\`\`js\n ${client.emotes.report}| Successfuly your report or bug message send to My Developers ${client.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
              components: [NeedHelpButtons(client)] 
             })
            )
    }
    if (message.author.bot || message.channel.type === 'dm') return;

//======== Command for shows the prefix ========
    let logsChannel = message.guild.channels.cache.find(c => c.id === client.db.get(`logs_${message.guild.id}`));
    const art = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cod = art.shift().toLowerCase();
      if (cod === `prefix`) {
      var prf = await client.db.fetch(`prefix_${message.guild.id}`)||client.prefix;
      let errorprefixEmbed = new MessageEmbed()
            .setColor(client.colors.none)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({name:`prefix of ${client.user.tag} shows👌🏻`,iconURL:client.user.displayAvatarURL()})
            .setFooter({text:`prefix shows to ${message.author.tag} |`,iconURL:message.author.displayAvatarURL({ dynamic: true })})
            .setDescription(`Prefix Dar In Server **${prf}** ASt`)
     message.reply({
       embeds: [errorprefixEmbed]
     })
  }

//======== Command Prefix & args ========
    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const prefix =  await client.db.fetch(`prefix_${message.guild.id}`)||message.content.match(prefixMention)|| client.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
      if (!cmd || !cmd.name||!cmd.aliases) {
        return message.reply(`**${client.emotes.x}| It seems like \`${command}\` is not a valid command! Please try Again!**`)
      }
/*
//======== Command for shows the custom commands ========
      let customcmd = false;
      let cuc = client.db.get(`custom_commands_${message.guild.id}`)
      for(const cmd of cuc){
          if(cmd.name.toLowerCase() === message.content.slice(prefix.length).split(" ")[0]){
            customcmd = true;
              if(cmd.embed){
              return message.reply({
                embeds: [new MessageEmbed()
                  .setColor(client.colors.none)
                  .setThumbnail(message.guild.iconURL({ dynamic: true }))
                  .setFooter({
                    text: `Requested By ${message.member.name} | Guild ${message.guild.id} `,
                    iconURL: message.member.displayAvatarURL({ dynamic: true })
                  })
                  .setTimestamp()
                  .setDescription(`All Guild Custom commands:\n\n ${cmd.output}`)
                ]
              });
              }else{
                  message.reply({
                    content: `All Guild Custom commands:\n\n ${cmd.output}`
                  })
              }
          }
        }
        */

//======== Command Cooldown ========
commandsCoolDown(client, message, cmd)

//======== Command Handler ========
  if (cmd) cmd.execute(client, message, args, prefix, logsChannel);
};
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */