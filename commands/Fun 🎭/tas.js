const Discord = require('discord.js');
module.exports = {
    name: 'tas',
    aliases: ['tas'],
    category: 'Fun 🎭 | Minigame',
    description: "playing coin game.",
    usage: "",  
  async execute(client, message, args) { 
 var shirkhat = ['شیر','خط'];
const seke = shirkhat[Math.floor(Math.random () * shirkhat.length)];
        const shkh = new Discord.MessageEmbed()
          .setAuthor({name:`Requested by ${message.author.username}`, iconURL:`https://cdn.discordapp.com/emojis/914253452853538917.png`})
          .setThumbnail(`${message.author.displayAvatarURL()}`)
          .setTimestamp()
          .setColor('RANDOM')   
          .addField(`سکه رو انداختم بزار ببینم <:smile_boy:914242070615556196>شیره یا خط`,`[${seke}](${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"})`)   
message.channel.send(shkh)
      message.react('🪙')
  }
}