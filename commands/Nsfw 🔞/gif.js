const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'pgif',
    aliases: ['pgif'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}pgif',


  async execute(client, message, args) { 
    
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'pgif'})
    .end((err, response) => {
      let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage(response.body.message)
  message.channel.send(embed)
/*      message.channel.send(new Discord.MessageAttachment(encodeURI(response.body.message), "sizar-team/gif.gif"));*/
    });
  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }
}
}