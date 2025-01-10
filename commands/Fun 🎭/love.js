const db = require('quick.db')
const { 
  MessageEmbed,
  MessageAttachment 
} = require('discord.js');
const {
  createCanvas,
  loadImage
} = require('canvas')
const canvas = createCanvas(1024, 600)
const {
    drawImage,
    getContextAttributes
} = canvas.getContext("2d")
module.exports = {
  name: "love",
  aliases: ['lv'],
  category: 'Fun 🎭 | Image',
  description: "shows user how much love you.",
  usage: "[name | nickname | mention | ID]",

  async execute(client, message, args) { 
    const target = message.mentions.users.first()
    if(!target) return message.reply(client.emotes.x+"| **Please mention someone**")
    if(target.id == message.author.id) return message.reply(client.emotes.error+"| **Please mention someone else**")

    const bg = await loadImage("https://cdn.discordapp.com/attachments/906688516140961802/936949836425592862/IMG_3522.jpg")
    drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatar = await loadImage(message.author.displayAvatarURL({  format: "png", dynamic: true }))
    drawImage(avatar, 100, 25, 200, 200)

    const TargetAvatar = await loadImage(target.displayAvatarURL({ format: "png", dynamic: true }))
    drawImage(TargetAvatar, 400, 25, 200, 200)
    const heart = await loadImage('https://cdn.discordapp.com/attachments/919864051444645938/936956737578205244/PXPNG.COMheart_png_2_-_2000x1814.png')
    const broken = await loadImage('https://cdn.discordapp.com/attachments/919864051444645938/936956646645694504/PXPNG.COMbroken_heart_png_background_-_2000x1639.png')
    const random = Math.floor(Math.random() * 99) + 1

    if(random >= 50) {
        drawImage(heart, 275, 60, 150, 150)
        const attachment = new MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new MessageEmbed()
        .setDescription(`**${message.author.username} loves ${target.username} this much : ${random}%**`)
        .setImage(`attachment://love.png`)
        .setColor(client.colors.none)
        return message.reply({
                    embeds: [embed],
                    files: [attachment]
                })

    } else {
        drawImage(broken, 275, 60, 150, 150)
        const attachment = new MessageAttachment(canvas.toBuffer(), 'broken.png')
        const embed = new MessageEmbed()
        .setDescription(`**${message.author.username} loves ${target.username} this much : ${random}%**`)
        .setImage(`attachment://broken.png`)
        .setColor(client.colors.none)
        return message.reply({
                    embeds: [embed],
                    files: [attachment]
                })
	}
      
  }
}