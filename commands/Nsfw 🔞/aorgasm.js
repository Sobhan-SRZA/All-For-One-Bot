const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
module.exports = {
    name: 'aorgasm',
    aliases: ['aorgasm', 'anime-orgasm'],
    category: 'Nsfw 🔞 | Anime',
    description: 'sending a random porn images type of anime about orgasm.',
    utilisation: '{prefix}aorgasm',
  async execute(client, message, args) { 
let owo = await neko.nsfw.gasm();

  if (message.channel.nsfw === true) {

        const feetgif = new Discord.MessageEmbed()
        .setTitle("2D Orgasm")
        .setImage(owo.url)
         .setColor('RANDOM')  
        .setURL(owo.url);
        message.channel.send(feetgif);


  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie **nsfw** az command estefade koni :/") 
   }
 }
};
