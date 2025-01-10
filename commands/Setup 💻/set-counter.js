let { 
  MessageEmbed 
} = require('discord.js')
let db = require('quick.db')
module.exports = {
    name: "setcounter",
    cooldown: 5,
    aliases: ["counter","count"],
    category: 'Setup 💻',
    utilisation: '[channel mention | channel ID | channel name]',
    description: "This Setup allows you to send logs into a specific Channel, when someone enters a the Command: report",
  async execute(client, message, args) { 
    try {
      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send({ embeds: [new MessageEmbed()
        .setTitle("What do you want to do? | REPORT LOG")
        .setDescription(`1️⃣ **== \`✔️ Enable\` / Set** Poster-Channel\n\n2️⃣ **== \`❌ Disable\`** counter\n\n3️⃣ **== Reset the __current__ Number to 0**\n\n📑 ** == Show Settings**\n\n**Note:**\n> *It will post only 1 Message every Minute*\n\n\n\n*React with the Right Emoji according to the Right action*`)
      ]})

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("📑")
      } catch (e) {
        client.logger(e)
        return message.reply({embeds:[new MessageEmbed()
          .setTitle(client.emotes.error + "| ERROR, Missing Permissions to add Reactions")
          .setColor(client.colors.red)
          .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
          .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
          .setDescription(`**This is a  error:  \`\`\`${e}\`\`\`**`)
          ]});
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "set"
          else if (reaction.emoji.name === "2️⃣") temptype = "disable"
          else if (reaction.emoji.name === "3️⃣") temptype = "resetNumber"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embeds:[new MessageEmbed()
          .setTitle(client.emotes.error + "| ERROR, Your Time ran out")
          .setColor(client.colors.red)
          .setDescription(`Cancelled the Operation!`)
        ]});

      if(temptype == "set"){
        tempmsg = await tempmsg.update({embed: new MessageEmbed()
        .setTitle("Which Channel do you wanna use?")
        .setColor(client.colors.none)
        .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
        .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
        .setDescription(`*Just ping the channel with #channel in the Chat*`)
        
      })
      await tempmsg.channel.awaitMessages(m=>m.author.id == message.author.id, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(async collected => {
          var message = collected.first();
          if(!message) throw "NO MESSAGE SENT";
          let channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
          if(channel){
            db.set(`counterch_${message.guild.id}`, channel.id)
            return message.update({embeds:[new MessageEmbed()
              .setTitle(`${client.emotes.success}|  Successfuly`)
              .setDescription(` The Channel: \`${channel.name}\` is now registered as the Number-Counter-Chat\n\n\nPosting now, every Minute`)
              .setColor(client.colors.green)
              .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
              .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
                  ]});
          }
          else{
            throw "NO CHANNEL PINGED";
          }
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.update({embeds:[new MessageEmbed()
          .setTitle(`${client.emotes.error}| ERROR, Your Time ran out`)
          .setDescription(`Cancelled the Operation!`)
          .setColor(client.colors.red)
          .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
          .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
          ]});
      } else if (temptype == "disable") {
        db.set(`counterch_${message.guild.id}`, 'no')
          return message.update({embeds:[new MessageEmbed()
            .setTitle(`${client.emotes.success}| Disabled the Number-Counter-Chat`)
            .setColor(client.colors.red)
            .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
            .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`I will not send automatic NSFW Images to a Channel anymore`)
          ]});
      } else if (temptype == "resetNumber") {
          db.set(`counternum_${message.guild.id}`, 0)
          return message.update({embeds:[new MessageEmbed()
            .setTitle(`${client.emotes.success}| Resetted the Number to 0`)
            .setColor(client.colors.red)
            .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
            .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`People now need to count from 1 again!`)
          ]});
      } else if (temptype == "thesettings") {
        let thesettings = db.get(`counterch_${message.guild.id}`)
        return message.update({embeds:[new MessageEmbed()
          .setTitle(`${client.emotes.success}| Settings of the Number-Counter-Chat`)
          .setColor(client.colors.red)
          .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
          .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true,  size: 4096 }))
          .setDescription(`**Channel:** ${thesettings == "no" ? "Not Setupped" : `<#${thesettings}> | \`${thesettings}\``}\n\n**Current Number:** \`${db.get(`counternum_${message.guild.id}`)}\`\n**Nest Number:** \`${Number(db.get(`counternum_${message.guild.id}`)) + 1}\``)
        ]});
    } else {
        return message.reply({embeds:[new MessageEmbed()
          .setTitle(client.emotes.error+"| ERROR, PLEASE CONTACT `Mr.SIN RE#1528`")
          .setColor(client.colors.red)
          .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
          .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
          ]});
      }

    } catch (e) {
      client.logger(e)
      return message.channel.send({embeds:[new MessageEmbed()
        .setColor(client.colors.red)
        .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
        .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: '' })
        .setTitle(`${client.emotes.error}| Something went Wrong`)
        .setDescription(`**This is a  error:  \`\`\`${e}\`\`\`**`)
      ]});
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