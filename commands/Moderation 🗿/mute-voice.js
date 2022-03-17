module.exports = {
    name: "mutevoice",
    cooldown: 5,
    aliases: ["mv"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}mutevoice',
    description: "Mute a member from the voice",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
     if (!message.guild.me.hasPermission("MUTE_MEMBERS"))
        return message.reply("Shoma Dastresi Nadarid 💩");
      const muteUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.cache.get(args[0])
      );
      const muteReason = args.join(" ").slice(23);
  
      if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR"))
        return message.reply("Shoma Dastresi Nadarid 💩");
          if(!args[0]){
        message.reply('Dashe Golam Bayad Yekio Mention Koni 😁')
      }
       if (!muteUser){
        return message.channel.send("Member Morede Nazar Payda Nashod😕");
       }else
      if (muteUser.voice.setMute(false)) {
      muteUser.voice.setMute(true);
  
      muteUser.user.send(
        `Shoma **Mute** Shodid Dar Server **${message.guild.name}**, Dalil: **${muteReason}**`
      );
      message.channel.send(
        `${muteUser} Member Morede Nazar Mute Shod ✅. Dalil: **${muteReason}**. Man Dar DM Member Behesh Etela Dadam`
      );
      }else
      return message.channel.send(
          "Member Morede Nazar Ya Dar Voice Nist Ya Dar Hal Hazar Mute Hstesh🙂"
        );
  

    },
};