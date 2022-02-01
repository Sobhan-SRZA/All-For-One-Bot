const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'pthigh',
    aliases: ['pthigh'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}pthigh',


  async execute(client, message, args) { 
    
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'thigh'})
    .end((err, response) => {
      message.channel.send(new Discord.MessageAttachment(encodeURI(response.body.message), "sizar-team/holo.png"));
    });
  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }
}
}