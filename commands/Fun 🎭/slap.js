const Discord = require('discord.js')
module.exports = {
    name: 'slap',
    aliases: ['sp'],
    category: 'Fun 🎭',
    utilisation: '{prefix}slap',


  async execute(client, message, args) { 

      const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const alpha = Math.floor(Math.random() * 9)+1;
    const omega = Math.floor(Math.random() * 6);
    const slapGif = [`https://cdn.nekos.life/slap/slap_01${omega}.gif`,`https://cdn.nekos.life/slap/slap_00${alpha}.gif`];
    const gif = slapGif[Math.floor(Math.random () * slapGif.length)];

        const slapEmbed = new Discord.MessageEmbed()
             .setAuthor(`Slap to ${Member.user.username}`, `${Member.user.displayAvatarURL({format: "png"})}`)
             .setTimestamp()
             .setColor('RANDOM')   
             .setImage(gif)
             .setDescription(`Akhjon Dava <a:qer:914468879546347541>`)
             .addField(`*${message.author.username}* Sily Zad Be **${Member.user.username}**`, '`oh oh dashemon mesle sag zad yaro ro fekr nakonam betonim baham bazi konim `<a:kibood:914469761201635358>',false)
              .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({format: "png"})}`)
if(client.user.id === Member.id){
  return message.reply('Mano Mikhai Bezani😑 ?!')

}else
if(Member.id === message.author.id){
  return message.reply('Hoi Mikhai Khodeto Bezani😳 ?!')
}else    
message.channel.send(slapEmbed).then(message.react('🤦🏻‍♂️'))

}
}