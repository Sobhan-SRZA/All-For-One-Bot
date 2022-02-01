module.exports = {
    name: 'plewd',
    aliases: ['plewd'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}plewd',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const superagent = require('superagent')

  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'gay'})
    .end((err, response) => {
        const embed = new Discord.MessageEmbed()
              .setImage(response.body.message)
            .setColor('RANDOM')
        message.channel.send(embed)
    })

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
  }
 }
};
