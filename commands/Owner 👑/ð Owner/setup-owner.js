var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
const fs = require('fs');
var {
  databasing,
  isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-owner",
  category: "👑 Owner",
  aliases: ["setup-owners", "setupowner", "setupowners"],
  cooldown: 5,
  usage: "setup-owner  -->  Follow the Steps",
  description: "Change the Bot Owners",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
      return message.channel.send({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`You are not allowed to run this Command`)
        .setDescription(`You need to be one of those guys: ${config.ownerIDS.map(id => `<@${id}>`)}`)
      });
    try {
      
      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send({embed: new MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color)
        .setDescription(`1️⃣ **== Add Owner**\n\n📑 **== Show Settings**\n\n**NOTE:**\n> *You can't remove a Owner, which means you need to get in touch with: \`NotMichx#6969\` to do so!*\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      })

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply({embed: new MessageEmbed()
          .setTitle("ERROR | Missing Permissions to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
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
          if (reaction.emoji.name === "1️⃣") temptype = "add"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new MessageEmbed()
          .setTitle("ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });

        if (temptype == "add") {

          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("Which User do you wanna add?")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`Please User the Role now!`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var message = collected.first();
              var user = message.mentions.users.first();
              if (user) {
                if (config.ownerIDS.includes(user.id)) return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(`ERROR | The User: \`${user.tag}\` is already registered as an Owner`)
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                });
                try {
                  let status = config
                  status.ownerIDS.push(user.id);
                  fs.writeFile(`./botconfig/config.json`, JSON.stringify(status, null, 3), (e) => {
                    if (e) {
                      console.log(String(e.stack).red);
                      return message.channel.send({embed: new MessageEmbed()
                        .setFooter(es.footertext, es.footericon)
                        .setColor(es.wrongcolor)
                        .setTitle(`${emoji.msg.ERROR} ERROR Writing the File`)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                      })
                    }
                    return message.channel.send({embed: new MessageEmbed()
                      .setFooter(es.footertext, es.footericon)
                      .setColor(es.color)
                      .setTitle(`${emoji.msg.SUCCESS} Successfully added the User \`${user.tag}\``)
                    })
                  });
                } catch (e) {
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle("ERROR | Something went wrong, please contact: `CEO│Eul Joromat#0923`")
                    .setColor(es.wrongcolor)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Role"
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle("ERROR | Your Time ran out")
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            });
  
        } else if (temptype == "thesettings") {
          
          var embed = new MessageEmbed()
          .setTitle(`📑 All Owners`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`${`<@${config.ownerIDS.join(">, <@")}>`}`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
  
          return message.reply({embed: embed});
        } else {
        return message.reply({embed: new MessageEmbed()
          .setTitle("ERROR | PLEASE CONTACT `CEO│Eul Joromat#0923`")
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        });
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      });
    }
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */