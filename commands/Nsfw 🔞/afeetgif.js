const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
module.exports = {
    name: 'afeetgif',
    aliases: ['afeetgif', 'anime-feetgif'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn gifs about anime girl feet.🦶🏻👧🏻',
    utilisation: '{prefix}afeetgif',
  async execute(client, message, args) { 
let owo = await neko.nsfw.feetGif();

  if (message.channel.nsfw === true) {

        const feetgif = new Discord.MessageEmbed()
        .setTitle("2D Feet Gif")
        .setImage(owo.url)
         .setColor('RANDOM')  
        .setURL(owo.url);
        message.channel.send(feetgif);


  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
