module.exports = {
    name: 'joke',
    aliases: ['jo'],
    category: 'Fun 🎭',
    utilisation: '{prefix}joke',

  async execute(client, message, args) { 
const Discord = require('discord.js')
const axios = require('axios');
  let getInfo3 = async () => {
            
    let response3 = await axios.get('https://api.codebazan.ir/jok/');
    let info3 = response3.data;
    return info3;
  };
    let infoValue3 = await getInfo3();

        const embed1 = new Discord.MessageEmbed()
     .setColor('#33908b')
     .setTitle("🤣 خنده دار بود؟ ")
     .setDescription(`**${infoValue3}**`)
     await message.channel.send(embed1)
  }
}
