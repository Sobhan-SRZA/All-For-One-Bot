const {
 MessageEmbed
} = require(`discord.js`);
const { 
  errorEmbed 
} = require("../../functions/functions");
module.exports = {
 name: "setcommands",
 cooldown: 5,
 aliases: ["setup-commands","setupcommands", "setup-command", "setupcommand"],
 category: 'Setup 💻',
 usage: 'setup-commands  -->  Follow the Steps',
 description: "Enable/Disable specific Commands",
async execute(client, message, args) { 

    try {
      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;
      tempmsg = await message.reply({
                         embeds: [new MessageEmbed()
                          .setTitle("What do you want to do?")
                          .setColor(client.colors.none)
                          .setTimestamp()
                          .setThumbnail(message.guild.iconURL({ dynamic: true }))
                          .setDescription(`
1️⃣ **==** ${client.db.get(`music_category_${message.guild.id}`) ? "Disable Music Commands" : "Enable Music Commands"}
        
2️⃣ **==** ${client.db.get(`fun_category_${message.guild.id}`) ? "Disable Fun Commands" : "Enable Fun Commands"}

3️⃣ **==** ${client.db.get(`enecomy_category_${message.guild.id}`) ? "Disable Economy Commands" : "Enable Economy Commands"}

4️⃣ **==** ${client.db.get(`nsfw_category_${message.guild.id}`) ? "Disable NSFW Commands" : "Enable NSFW Commands"}

5️⃣ **==** ${client.db.get(`school_category_${message.guild.id}`) ? "Disable School Commands" : "Enable School Commands"}

6️⃣ **==** ${client.db.get(`minigame_category_${message.guild.id}`) ? "Disable Minigame Commands" : "Enable Minigame Commands"}

7️⃣ **==** ${client.db.get(`voice_category_${message.guild.id}`, "VOICE") ? "Disable Voice Commands" : "Enable Voice Commands"} (Join to Create)
        
8️⃣ **==** ${client.db.get(`ticket_category_${message.guild.id}`) ? "Disable Ticket Commands" : "Enable Ticket Commands"}
                  
*React with the Right Emoji according to the Right action*`)
                          .setFooter({
                           text: `Requested By ${message.member.tag} | Setup Commands `,
                           iconURL: message.member.displayAvatarURL({ dynamic: true })
                          })
                        ]
                      })

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
        tempmsg.react("5️⃣")
        tempmsg.react("6️⃣")
        tempmsg.react("7️⃣")
        tempmsg.react("8️⃣")
      } catch (error) {
        return message.reply({
                   embeds: [errorEmbed(
                    message,
                    `Missing Permissions to add Reactions\n\`\`\`js\n${error}\n\`\`\``,
                    client
                   )]
               });
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "MUSIC"
          else if (reaction.emoji.name === "2️⃣") temptype = "FUN"
          else if (reaction.emoji.name === "3️⃣") temptype = "ECONOMY"
          else if (reaction.emoji.name === "4️⃣") temptype = "NSFW"
          else if (reaction.emoji.name === "5️⃣") temptype = "SCHOOL"
          else if (reaction.emoji.name === "6️⃣") temptype = "MINIGAMES"
          else if (reaction.emoji.name === "7️⃣") temptype = "VOICE"
          else if (reaction.emoji.name === "8️⃣") temptype = "SOUNDBOARD"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );

      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, temptype), temptype)
      return message.reply(new MessageEmbed()
        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, temptype) ? "Enabled" : "Disabled"} ${temptype} Commands`)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
      );

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
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