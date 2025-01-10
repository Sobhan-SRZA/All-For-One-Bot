const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'ptentacle',
    aliases: ['ptentacle'],
    category: 'Nsfw 🔞 | Porn',
    description: "sending a random porn images about cum.🍆💦",
    utilisation: '{prefix}ptentacle',


  async execute(client, message, args) { 
    
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'tentacle'})
    .auth("015445535454455354D6")
    .end((err, response) => {
      message.channel.send(new Discord.MessageAttachment(encodeURI(response.body.message), "sizar-team/pussy.png"));
    });
  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }
}
}