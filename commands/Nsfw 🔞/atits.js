const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
module.exports = {
    name: 'atits',
    aliases: ['atits', 'anime-tits'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images type of anime about tits.🍒',
    utilisation: '{prefix}atits',
  async execute(client, message, args) { 
let owo = await neko.nsfw.tits();

  if (message.channel.nsfw === true) {

        const feetgif = new Discord.MessageEmbed()
        .setTitle("2D Tits")
        .setImage(owo.url)
         .setColor('RANDOM')  
        .setURL(owo.url);
        message.channel.send(feetgif);


  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
