const { 
    Permissions,
    MessageEmbed
} = require("discord.js");
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
    name: "mutevoice",
    cooldown: 5,
    aliases: ["mv"],
    category: 'Moderation 🗿',
    description: "Mute a member from the voice",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args, logsChannel) { 
      const muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
      const muteReason = args.join(" ").slice(23) || client.emotes.reason + "No reason for you.";
      if (!message.guild.me.permissions.has(Permissions.FLAGS.MUTE_MEMBERS || Permissions.FLAGS.ADMINISTRATOR))
      return message.reply("**I don't have premissions of \"MUTE_MEMBERS or ADMINSTATOR\"**");
      if (!message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS || Permissions.FLAGS.ADMINISTRATOR))
      return message.reply("**you don't have premissions of \"MUTE_MEMBERS or ADMINSTATOR\"**");
          if(!muteUser){
        message.reply(client.emotes.entry+'| **Please Enter A User To Be Muted!**')
      }
      if (!muteUser.voice.setMute(true)) {
     await muteUser.voice.setMute(true);
      muteUser.user.send(
        `Hi Dod\n you have bin **Muted** from voice in this guild **${message.guild.name}**, for this reason: **${muteReason}**`
      );
      message.reply(
        `this user ${muteUser} have bin muted from voice, for this reason: **${muteReason}**. \n\`I sent news for user\``
      );
      }else
      return message.reply(
          client.emotes.error+"| **your target member have bin muted befor or is not in some voice channels.**"
        );
        logsChannel.send({ 
          embeds: [logsEmbed(
                    message,
                    "Some One Muted From Voice",
                    "in this guild some one have bin mute from voice.",
                    client.emotes.mute,
                    client,
                    message.channel,
                    args.join(" ").slice(23) || "muted some user"
                    )]
        })


    },
};