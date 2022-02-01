const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'panal',
    aliases: ['panal'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}panal',


  async execute(client, message, args) { 
    
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'anal'})
    .end((err, response) => {
      message.channel.send(new Discord.MessageAttachment(encodeURI(response.body.message), "sizar-team/anal.png"));
    });
  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }
}
}