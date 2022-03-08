const Discord = require('discord.js');
module.exports = {
    name: 'pkiss',
    aliases: ['pkiss'],
    category: 'Fun 🎭',
    utilisation: '{prefix}pkiss',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const Canvas = require('canvas')
		const canvas = Canvas.createCanvas(1024, 600)
    const ctx = canvas.getContext("2d")

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.channel.send("<a:no:784463793366761532> **Please mention someone**")
    if(target.id == message.author.id) return message.channel.send("<a:no:784463793366761532> **Please mention someone else**")

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/919864051444645938/936994970408214608/IMG_3523.jpg")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

//    const TargetAvatar = await Canvas.loadImage(`https://api.monkedev.com/canvas/circle?imgUrl=${target.displayAvatarURL( {  format: "png", dynamic: true } )}`)


    const TargetAvatar = await Canvas.loadImage(target.user.displayAvatarURL( { format: "png", dynamic: true } ))
    ctx.drawImage(TargetAvatar, 200, 26, 250, 250)

  //  const avatar = await Canvas.loadImage(`https://api.monkedev.com/canvas/circle?imgUrl=${message.author.displayAvatarURL( { format: "png", dynamic: true } )}`)
    const avatar = await Canvas.loadImage(message.author.displayAvatarURL( {  format: "png", dynamic: true } ))


    ctx.drawImage(avatar, 700, 30, 250, 250)


        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'kiss.png')
        const embed = new Discord.MessageEmbed()
        .setDescription(`***${message.author.username}* Kissd ${target}**`)
        .attachFiles(attachment)
        .setImage(`attachment://kiss.png`)
        .setColor("RANDOM")
         message.channel.send(embed)

    
      
  }
}