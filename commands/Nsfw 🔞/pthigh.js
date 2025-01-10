const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'pthigh',
    aliases: ['pthigh'],
    category: 'Nsfw 🔞 | Porn',
    utilisation: '{prefix}pthigh',
    description: "sending a random porn images about thighs.",

  async execute(client, message, args) { 
    
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'thigh'})
    .auth("015445535454455354D6")
    .end((err, response) => {
      message.channel.send(new Discord.MessageAttachment(encodeURI(response.body.message), "sizar-team|thigg.png"));
    });
  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }
}
}