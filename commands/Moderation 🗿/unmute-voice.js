const {
  MessageEmbed,
  Permissions
} = require('discord.js');
const {
  NeedHelpButtons,
  logsEmbed,
  NeedHelpMenu,
  commandsData,
  errorEmbed,
  successEmbed,
  CustomErrorEmbed
} = require('../../functions/functions.js');
module.exports = {
    name: "unmutevoice",
    cooldown: 5,
    aliases: ["umv"],
    category: 'Moderation 🗿',
    description: "Unmute a member from the voice",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args, logsChannel) { 
      const unmuteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
      if (!message.guild.me.permissions.has(Permissions.FLAGS.MUTE_MEMBERS || Permissions.FLAGS.ADMINISTRATOR))
      return message.reply("**I don't have premissions of \"MUTE_MEMBERS or ADMINSTATOR\"**");
      if (!message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS || Permissions.FLAGS.ADMINISTRATOR))
      return message.reply("**you don't have premissions of \"MUTE_MEMBERS or ADMINSTATOR\"**");
      if (!unmuteUser){
        message.reply('Dashe Golam Bayad Yekio Mention Koni 😁')
       }else
      if (!unmuteUser.voice.setMute(false)) {
      unmuteUser.voice.setMute(false);
  
      unmuteUser.user.send(
        `Shoma **UnMute** Shodid Dar Server **${message.guild.name}**`
      );
      message.reply(
        `${unmuteUser} Member Morede Nazar UnMute Shod ✅.`
      );

      }else
    return message.reply(
          "Member Morede Nazar Ya Dar Voice Nist Ya Dar Hal Hazar UnMute Hastesh🙂"
        );
    

      logsChannel.send({ 
              embeds: [logsEmbed(
                        message,
                        "Some One Unmuted From Voice",
                        "in this guild some one have bin unmute from voice.",
                        client.emotes.mute,
                        client,
                        message.channel,
                        "unmuted some user"
                        )]
       })

    },
};