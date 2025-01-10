const { 
  MessageEmbed 
} = require('discord.js')
const fetch = require('node-fetch');
module.exports = {
    name: 'car',
    aliases: ['mashin'],
    category: 'Fun 🎭 | Image',
    usage: '',
    description: 'Sends random car images',
  async execute(client, message, args) { 
  const res = await fetch("https://api.popcat.xyz/car")
  const json = await res.json()

  let embed = new MessageEmbed()
    .setTitle(client.emotes.car+"| Vroom...")
    .setURL(json.image)
    .setImage(`${json.image}`)
    .setColor(client.colors.none)
  message.channel.startTyping()
  setTimeout(()=>{
    message.channel.stopTyping();
  },1000*5)
  message.channel.send({embeds:[embed]})
  }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */