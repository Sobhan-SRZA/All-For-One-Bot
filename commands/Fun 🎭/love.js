module.exports = {
  name: "love",
  aliases: ['lv'],
  category: "Fun 🎭",
  description: "IMAGE CMD",
  usage: "love @User",

  async execute(client, message, args) { 
    
const Discord = require('discord.js');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const Canvas = require('canvas')
		const canvas = Canvas.createCanvas(1024, 600)
    const ctx = canvas.getContext("2d")

    const target = message.mentions.users.first()
    if(!target) return message.channel.send("<a:no:784463793366761532> **Please mention someone**")
    if(target.id == message.author.id) return message.channel.send("<a:no:784463793366761532> **Please mention someone else**")

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/906688516140961802/936949836425592862/IMG_3522.jpg")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL( {  format: "png", dynamic: true } ))
    ctx.drawImage(avatar, 100, 25, 200, 200)

    const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL( { format: "png", dynamic: true } ))
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200)


    const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/919864051444645938/936956737578205244/PXPNG.COMheart_png_2_-_2000x1814.png')
    const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/919864051444645938/936956646645694504/PXPNG.COMbroken_heart_png_background_-_2000x1639.png')
    const random = Math.floor(Math.random() * 99) + 1

    if(random >= 50) {
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