const {MessageEmbed} = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
    name: 'slap',
    aliases: ['sp'],
    category: 'Fun 🎭 | Anime',
    description: "send anime gifs about slapping and slapping to user.",
    usage: "[name | nickname | mention | ID]",  


  async execute(client, message, args) { 

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const res = await fetch("https://nekos.life/api/v2/img/slap");
    const data = await res.json();
        const slapEmbed = new MessageEmbed()
             .setAuthor({name:`Slap to ${Member.user.username}`, iconURL:`${Member.user.displayAvatarURL( { size:4096 , dynamic: true } )}`})
             .setTimestamp()
             .setColor(client.colors.none)   
             .setImage(data.url)
             .setDescription(`Akhjon Dava <a:qer:914468879546347541>`)
             .addField(`*${message.author.username}* Sily Zad Be **${Member.user.username}**`, '`oh oh dashemon mesle sag zad yaro ro fekr nakonam betonim baham bazi konim `<a:kibood:914469761201635358>',false)
            .setFooter({text:`Requested by ${message.author.username}`, iconURL:`${message.author.displayAvatarURL( { size:4096 , dynamic: true } )}`})
if(client.user.id === Member.id){
  return message.reply('Mano Mikhai Bezani😑 ?!')

}else
if(Member.id === message.author.id){
  return message.reply('Hoi Mikhai Khodeto Bezani😳 ?!')
}else    
message.channel.send({embeds:[slapEmbed]}).then(message.react('🤦🏻‍♂️'))

}
}