module.exports = {
    name: 'car',
    aliases: ['mashin'],
    category: 'Fun 🎭',
    utilisation: '{prefix}car',
    description: 'Sends random car images',
  async execute(client, message, args) { 
const superagent = require('superagent')
const { MessageEmbed } = require('discord.js')


message.channel.startTyping();

superagent.get('https://api.popcat.xyz/')
    .query({ type: 'car'})
    .end((err, response) => {
let embed = new MessageEmbed()
.setTitle(":red_car: Vroom...")
.setURL(response.body.message)
.setImage(`${response.body.message}`)
.setColor("RANDOM")
message.channel.send(embed)
    })

    message.channel.stopTyping();
    }
}
