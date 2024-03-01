module.exports = {
  name: 'wanted',
  aliases: ['wad'],
  category: 'Fun 🎭',
  utilisation: '{prefix}wanted',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const Discord = require('discord.js');
    const Canvas = require('@napi-rs/canvas')
    const canvas = Canvas.createCanvas(846, 1115)
    const ctx = canvas.getContext("2d")

    const target = message.mentions.users.first()
    if (!target) return message.channel.send("<a:no:784463793366761532> **Please mention someone**")
    if (target.id == message.author.id) return message.channel.send("<a:no:784463793366761532> **Please mention someone else**")

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/919864051444645938/937001660776058950/IMG_3524.jpg")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const TargetAvatar = await Canvas.loadImage(`https://some-random-api.ml/canvas/color?avatar=${target.displayAvatarURL({ format: "png", dynamic: true })}&color=%23b536yi`)
    ctx.drawImage(TargetAvatar, 140, 370, 550, 550)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'wanted.png')
    const embed = new Discord.MessageEmbed()
      .setDescription(`**This Human ${target} Is Wanted!!!**`)
      .attachFiles(attachment)
      .setImage(`attachment://wanted.png`)
      .setColor("RANDOM")
    message.channel.send(embed)
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