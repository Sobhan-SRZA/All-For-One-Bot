const Color = "RANDOM", Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
    name: 'wasted',
    aliases: ['wtd'],
    category: 'Fun',
    utilisation: '{prefix}wasted',


  async execute(client, message, args) { 

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const Data = await (Random.Wasted({ Image: Member.user.displayAvatarURL({ format: "png" ,size:1024 }), Color: Color }));
if(client.user.id === Member.id){
  return message.reply('Mano Mikhai Bokoshi😑 ?!')

}else
if(Member.id === message.author.id){
  return message.reply('Hoi Mikhai Khodeto Bokoshi😳 ?!')
}else
     message.channel.send(Data);
  
 }
};

