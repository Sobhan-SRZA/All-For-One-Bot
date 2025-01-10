module.exports = {
  name: "love",
  aliases: ['lv'],
  category: "Fun 🎭",
  description: "IMAGE CMD",
  usage: "love @User",


  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    const Discord = require('discord.js');
    const { MessageEmbed } = require('discord.js');
    const Canvas = require('@napi-rs/canvas')
    const canvas = Canvas.createCanvas(1024, 600)
    const ctx = canvas.getContext("2d")

    const target = message.mentions.users.first()
    if (!target) return message.channel.send("**Please mention someone**")
    if (target.id == message.author.id) return message.channel.send("**Please mention someone else**")

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/944668553439760434/1098155294451830904/image.jpeg")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    ctx.drawImage(avatar, 100, 25, 200, 200)

    const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL({ format: "png", dynamic: true }))
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200)


    const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/944668553439760434/1098155294707695616/image.png')
    const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/944668553439760434/1098155295320051812/image.png')
    const random = Math.floor(Math.random() * 99) + 1

    if (random >= 50) {
      ctx.drawImage(heart, 275, 60, 150, 150)
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username} loves ${target.username} this much : ${random}%**`)
        .attachFiles(attachment)
        .setImage(`attachment://love.png`)
        .setColor("RANDOM")
      return message.channel.send(embed)

    } else {
      ctx.drawImage(broken, 275, 60, 150, 150)
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'broken.png')
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username} loves ${target.username} this much : ${random}%**`)
        .attachFiles(attachment)
        .setImage(`attachment://broken.png`)
        .setColor("RANDOM")
      return message.channel.send(embed)
    }

  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */