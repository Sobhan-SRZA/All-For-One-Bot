module.exports = {
    name: 'hug',
    aliases: ['hug'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}hug',
  async execute(client, message, args) { 
const Discord = require('discord.js');
const superagent = require('superagent')

  if (message.channel.nsfw === true) {
    superagent.get('https://some-random-api.ml/animu/hug')
//    .query({ type: 'hug'})
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
