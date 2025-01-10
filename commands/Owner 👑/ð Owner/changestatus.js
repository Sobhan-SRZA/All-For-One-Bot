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
  name: "changestatus",
  category: "👑 Owner",
  aliases: ["botstatus", "status"],
  cooldown: 5,
  usage: "changestatus  -->  Follow the Steps",
  description: "Changes the Status of the BOT",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
      return message.channel.send({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> You are not allowed to run this Command`)
        .setDescription(`You need to be one of those guys: ${config.ownerIDS.map(id => `<@${id}>`)}`)
      });
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send({embed: new MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color)
        .setDescription(`1️⃣ **== Change** Status **TEXT**\n\n2️⃣ **== Change** Status **TYPE**\n\n3️⃣ **== Change** Status **URL**\n\n🟢 **==** Change the Online/Idle/DnD state\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      })

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("🟢")
      } catch (e) {
        return message.reply({embed: new MessageEmbed()
          .setTitle("<:RedNope:914312373890854922> ERROR | Missing Permissions to add Reactions")
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
          if (reaction.emoji.name === "1️⃣") temptype = "text"
          else if (reaction.emoji.name === "2️⃣") temptype = "type"
          else if (reaction.emoji.name === "3️⃣") temptype = "url"
          else if (reaction.emoji.name === "🟢") temptype = "state"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new MessageEmbed()
          .setTitle("<:RedNope:914312373890854922> ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });

      if (temptype == "text") {
        tempmsg = await tempmsg.edit({embed: new MessageEmbed()
          .setTitle("Which Text should I display in the Status?")
          .setColor(es.color)
          .setDescription(`
        Example: \`${prefix}help | ${client.user.username.split(" ")[0]} | by: milrato.eu\`

        *Enter the text now!*`).setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first().content;
            let status = config
            status.status.text = msg;
            client.user.setActivity(msg.substr(0, 50), {
              type: config.status.type,
              url: config.status.url
            })
            fs.writeFile(`./botconfig/config.json`, JSON.stringify(status, null, 3), (e) => {
              if (e) {
                console.log(String(e.stack).red);
                return message.channel.send({embed: new MessageEmbed()
                  .setFooter(es.footertext, es.footericon)
                  .setColor(es.wrongcolor)
                  .setTitle(`${emoji.msg.ERROR}  ERROR Writing the File`)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                })
              }
              return message.channel.send({embed: new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(`${emoji.msg.SUCCESS}  Successfully set the new Status`)
              })
            });
          }).catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new MessageEmbed()
            .setTitle("<:RedNope:914312373890854922> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });

      } else if (temptype == "type") {
        tempmsg = await tempmsg.edit({ embed: new MessageEmbed()
          .setTitle("What Type do you wanna use?")
          .setColor(es.color)
          .setDescription(`
        1️⃣ **==** PLAYING
        
        2️⃣ **==** WATCHING
        
        3️⃣ **==** STREAMING

        4️⃣ **==** LISTENING
      
        5️⃣ **==** COMPETING
      
        *React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch {

        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "1️⃣") temptype = "PLAYING"
            else if (reaction.emoji.name === "2️⃣") temptype = "WATCHING"
            else if (reaction.emoji.name === "3️⃣") temptype = "STREAMING"
            else if (reaction.emoji.name === "4️⃣") temptype = "LISTENING"
            else if (reaction.emoji.name === "5️⃣") temptype = "COMPETING"
            else throw "You reacted with a wrong emoji"

          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new MessageEmbed()
            .setTitle("<:RedNope:914312373890854922> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });


        let status = config
        status.status.type = temptype;
        client.user.setActivity(config.status.text, {
          type: temptype,
          url: config.status.url
        })
        fs.writeFile(`./botconfig/config.json`, JSON.stringify(status, null, 3), (e) => {
          if (e) {
            console.log(String(e.stack).red);
            return message.channel.send({embed: new MessageEmbed()
              .setFooter(es.footertext, es.footericon)
              .setColor(es.wrongcolor)
              .setTitle(`${emoji.msg.ERROR}  ERROR Writing the File`)
              .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            })
          }
          return message.channel.send({embed: new MessageEmbed()
            .setFooter(es.footertext, es.footericon)
            .setColor(es.color)
            .setTitle(`${emoji.msg.SUCCESS}  Successfully set the new Status`)
          })
        });

      } else if (temptype == "state") {
        tempmsg = await tempmsg.edit({embed: new MessageEmbed()
          .setTitle("What Type do you wanna use?")
          .setColor(es.color)
          .setDescription(`
        🟢 **==** ONLINE
        
        🟡 **==** IDLE
        
        🔴 **==** DO NOT DISTRUB (DND)
      
      
        *React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("🔴")
          tempmsg.react("🟡")
        } catch {

        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "🟢") client.user.setStatus('online')  .then(t=>{
              return message.channel.send({embed: new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(`${emoji.msg.SUCCESS}  Successfully set the new Status`)
              })
            })
            .catch(e=>timeouterror=e);
            else if (reaction.emoji.name === "🟡") client.user.setStatus('idle')  .then(t=>{
              return message.channel.send({embed: new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(`${emoji.msg.SUCCESS}  Successfully set the new Status`)
              })
            })
            .catch(e=>timeouterror=e);
            else if (reaction.emoji.name === "🔴") client.user.setStatus('dnd')  .then(t=>{
              return message.channel.send({embed: new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(`${emoji.msg.SUCCESS}  Successfully set the new Status`)
              })
            })
            .catch(e=>timeouterror=e);
            else throw "You reacted with a wrong emoji"
            
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new MessageEmbed()
            .setTitle("<:RedNope:914312373890854922> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });

      } else if (temptype == "url") {
        tempmsg = await tempmsg.edit({embed: new MessageEmbed()
          .setTitle("Which URL should I display in the Status, if I am streaming?")
          .setColor(es.color)
          .setDescription(`
        Example: \`https://twitch.tv/#\` --> must be a twitch link

        *Enter the text now!*`).setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first().content;
            if (!isValidURL(msg))
              return message.channel.send({embed: new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.wrongcolor)
                .setTitle(`<:RedNope:914312373890854922> NOT A VALID URL`)
              })
            if (!msg.includes("twitch"))
              return message.channel.send({embed: new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.wrongcolor)
                .setTitle(`<:RedNope:914312373890854922> NOT A VALID TWITCH URL`)
              })
            let status = config
            status.status.url = msg;
            client.user.setActivity(msg.substr(0, 50), {
              type: config.status.type,
              url: msg
            })
            fs.writeFile(`./botconfig/config.json`, JSON.stringify(status, null, 3), (e) => {
              if (e) {
                console.log(String(e.stack).red);
                return message.channel.send({embed: new MessageEmbed()
                  .setFooter(es.footertext, es.footericon)
                  .setColor(es.wrongcolor)
                  .setTitle(`${emoji.msg.ERROR}  ERROR Writing the File`)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                })
              }
              return message.channel.send({embed: new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(`${emoji.msg.SUCCESS}  Successfully set the new Status`)
              })
            });
          }).catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new MessageEmbed()
            .setTitle("<:RedNope:914312373890854922> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });

      } else {
        return message.reply({embed: new MessageEmbed()
          .setTitle("<:RedNope:914312373890854922> ERROR | PLEASE CONTACT `CEO│Eul Joromat#0923`")
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        });
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:RedNope:914312373890854922> Something went Wrong`)
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