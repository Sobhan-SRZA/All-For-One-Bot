module.exports = {
    name: "setup-owner",
    cooldown: 5,
    aliases: ["addowner", "aow", "setowner", "setupowner"],
    category: 'Owner 👑',
    utilisation: '{prefix}setup-owner',
    description: "UnMutes a member in the discord!",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 

const fs = require('fs');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;

    if (!client.config.owner.some(r => r.includes(message.author.id)))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor('RED')
          .setFooter(``)
          .setTitle(`> You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}`)
        ); 

    try {
      
      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send({embed: new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(`RANDOM`)
        .setDescription(`1️⃣ **== Add Owner**\n\n📑 **== Show Settings**\n\n**NOTE:**\n> *You can't remove a Owner, which means you need to get in touch with: \`Mr.SIN RE#1528\` to do so!*\n\n\n\n*React with the Right Emoji according to the Right action*`)
         .setFooter(``)
      })

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("ERROR | Missing Permissions to add Reactions")
          .setColor(`RED`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(``)
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
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("ERROR | Your Time ran out")
          .setColor(`RED`)
          .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(``)
        });

        if (temptype == "add") {

          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("Which User do you wanna add?")
            .setColor(`RANDOM`)
            .setThumbnail(``)
            .setDescription(`Please User the Role now!`)
            .setFooter(``)
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
                if (client.config.owner.includes(user.id)) return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(`ERROR | The User: \`${user.tag}\` is already registered as an Owner`)
                  .setColor(`RED`)
                  .setFooter(``)
                });
                try {
                  let status = client.config;
            status.owner.push(user.id);
                  fs.writeFile(`./config/bot.js`, JS.stringify(status, null, 3), (e) => {
                    if (e) {
                      console.log(String(e.stack).red);
                      return message.channel.send({embed: new Discord.MessageEmbed()
                        .setFooter(``)
                        .setColor(`RED`)
                        .setTitle(`${client.emotes.error} ERROR Writing the File`)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                      })
                    }
                    return message.channel.send({embed: new Discord.MessageEmbed()
                      .setFooter(``)
                      .setColor(`RED`)
                      .setTitle(`${client.emotes.success} Successfully added the User \`${user.tag}\``)
                    })
                  });
                } catch (e) {
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle("ERROR | Something went wrong, please contact: `CEO│Eul Joromat#0923`")
                    .setColor(`RED`)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(``)
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
              .setColor(`RED`)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(``)
            });
  
        } else if (temptype == "thesettings") {
          
          var embed = new MessageEmbed()
          .setTitle(`📑 All Owners`)
          .setColor(`RANDOM`)
          .setThumbnail(``)
          .setDescription(`${`<@${client.config.owner.join(">, <@")}>`}`.substr(0, 2048))
          .setFooter(``)
  
          return message.reply({embed: embed});
        } else {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("ERROR | PLEASE CONTACT `CEO│Eul Joromat#0923`")
          .setColor(`RED`)
          .setFooter(``)
        });
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({embed: new Discord.MessageEmbed()
        .setColor(`RED`)
        .setFooter(``)
        .setTitle(`Something went Wrong`)
        .setDescription(`${e}`)
      });
    }

    
  }
}