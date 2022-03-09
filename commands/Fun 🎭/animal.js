module.exports = {
    name: 'animal',
    description: 'ferestadane aks heivanat',
    aliases: ['heivan'],
    category: 'Fun 🎭',
    utilisation: '{prefix}animal',
   async execute(client, message, args) {
  const Discord = require('discord.js');
  const answer = args.join(" ")
    if (!answer) {
        const blank = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setTitle('Commnad Haie Animal!')
            .setDescription('Baraie Estefade Kardan Az Command Ha Matn Zir Ra Negah Konid.')
            .addField('Command Haie Animal:', '`panda`,`fox`,`dog`,`cat`,`redpanda`,`koala`,`birb`,`raccoon`,`kangaroo`,`whale`', true)
            .setTimestamp()
            .setFooter('animal command |');

        message.channel.send(blank)
    } else if (answer == 'panda') {
const fetch = require('node-fetch')
fetch.get('https://some-random-api.ml/animal/panda')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      message.channel.send(json)
    });      
  /*
  const superagent = require('superagent')
    superagent.get('https://some-random-api.ml/animal/panda')
    .query({ type: 'image'})
    .end((err, response) => {
      const embed = new Discord.MessageEmbed()
            .setImage(response.body.message)
            .setDescription(response.body.message)
            .setColor('RANDOM')
        message.channel.send(embed)
     })
      */
      
    }
    
    }
}