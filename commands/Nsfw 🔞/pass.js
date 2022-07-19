const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'pass',
    aliases: ['pass'],
    category: 'Nsfw 🔞 | Porn',
    description: "sending a random porn images about ass.🍑",
    utilisation: '{prefix}pass',


  async execute(client, message, args) { 
    
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'ass'})
    .auth("015445535454455354D6")
    .end((err, response) => {
      message.channel.send(new Discord.MessageAttachment(encodeURI(response.body.message), "sizar-team/ass.png"));
    });
  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }
}
}