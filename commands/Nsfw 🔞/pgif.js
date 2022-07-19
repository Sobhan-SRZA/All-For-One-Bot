const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'pgif',
    aliases: ['pgif'],
    category: 'Nsfw 🔞 | Porn',
    description: "sending a random porn gifs.🍑",
    utilisation: '{prefix}pgif',


  async execute(client, message, args) { 
    
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'pgif'})
    .auth("015445535454455354D6")
    .end((err, response) => {
      let embed = new Discord.MessageEmbed()
      .setTitle("🍑 | Here’s your porn gifs")
      .setColor("RANDOM")
      .setURL(response.body.message)
      .setImage(response.body.message)

  message.channel.send(embed)
    });

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }
}
}