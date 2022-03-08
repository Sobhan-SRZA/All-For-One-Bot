module.exports = {
    name: "unmutevoice",
    cooldown: 5,
    aliases: ["umv"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}unmutevoice',
    description: "Unmute a member from the voice",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
     if (!message.guild.me.hasPermission("MUTE_MEMBERS"))
        return message.reply("Shoma Dastresi Nadarid 💩");
      const unmuteUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.cache.get(args[0])
      );
      if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR"))
        return message.reply("Shoma Dastresi Nadarid 💩");
          if(!args[0]){
        message.reply('Dashe Golam Bayad Yekio Mention Koni 😁')
      }else
       if (!unmuteUser){
        return message.channel.send("Member Morede Nazar Peyda Nashod😕");
       }else
      if (unmuteUser.voice.serverMute) {
      unmuteUser.voice.setMute(false);
  
      unmuteUser.user.send(
        `Shoma **UnMute** Shodid Dar Server **${message.guild.name}**`
      );
      message.channel.send(
        `${unmuteUser} Member Morede Nazar UnMute Shod ✅.`
      );

      }else
    return message.channel.send(
          "Member Morede Nazar Ya Dar Voice Nist Ya Dar Hal Hazar UnMute Hastesh🙂"
        );

    },
};