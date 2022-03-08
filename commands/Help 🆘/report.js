const Discord = require('discord.js');
module.exports = {
    name: 'report',
    aliases: ['bug','rp'],
    category: 'Help 🆘',
    utilisation: '{prefix}report',
     description: 'for report bot bugs to developers :)',

  async execute(client, message, args) { 
        const choice = args[0];
        if (!choice){
 return message.channel.send("لطفا متن گزارشتان را رو به روی کامند بنویسید تا بررسی شود")
}else
          message.reply('درخواست باگ یا نظر شما به سرور پشتیبانی ارسال شد یا ادمین ها جوین سرور میشوند و حل میکنند یا به شما در خواست فرندی میدهند با تشکر')
  
      const channelbug =  message.guild.channels.cache.get("929205990790950982");
        let invite = await message.channel.createInvite({
            maxAge: 10 * 60 * 1000, 
            maxUses: 5
        }, )

      const soal = new Discord.MessageEmbed()
        .setAuthor(message.client.user.tag,message.client.user.displayAvatarURL())
        .setColor('RANDOM')
            .setTitle(`Report : `)
            .setDescription(`
User : ${message.author} \n 
Send : ${args}\n 
Server : ${invite}`)
            .setThumbnail(message.guild.iconURL())
            .setFooter(`Requested By ${message.author.tag}`,message.author.displayAvatarURL())

        channelbug.send(soal)
    }
}
