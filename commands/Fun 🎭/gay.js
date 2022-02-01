const Discord = require('discord.js');
module.exports = {
    name: 'gay',
    aliases: ['gay','gy'],
    category: 'Fun',
    utilisation: '{prefix}gay',
  async execute(client, message, args) { 
    const Color = "RANDOM", Random = require("srod-v2");
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const Data = await (Random.Gay({ Image: Member.user.displayAvatarURL({ format: "png" ,size:1024 }), Color: Color }));
if(client.user.id === Member.id){
  return message.reply('Man Mesle To Asshul Gay Nistam😑 ?!')

}else
     message.channel.send(Data);
  }
}

