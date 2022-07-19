const Discord = require('discord.js')
const { MessageButton } = require('discord-buttons');
module.exports = {
    name: 'skg',
    aliases: ['skg'],
    category: 'Fun 🎭',
    utilisation: '{prefix}skg',


  async execute(client, message, args) { 
        const prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
        const acceptedReplies = ['sang', 'kaghaz', 'geichy'];
        const newmsg = `نحوه بازی کردن: 
\`${prefix}skg <sang|kaghaz|geichy>\``;
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
        const choice = args[0];
        if (!choice){
           return message.channel.send(newmsg)//.then(m => { m.react('📝');  m.react('🪨');  m.react('✂️')});
      }
        if (!acceptedReplies.includes(choice)) {
          return message.channel.send(`شما فقط میتوانید یکی از مورد های زیر را انتخاب کنید:
 \`${acceptedReplies.join(', ')}\``);
        }

       const skgGeichyBord = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: قیچی✂️ , بات: کاغذ📝`,`نتیجه: مثل اینکه اینبار تو بردی🙄 `)
                  const skgGeichyBakht = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: قیچی✂️ , بات: سنگ🪨`,`نتیجه: 😎من بردم داشم`)  
              const skgKaghazBord = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: کاغذ📝 , بات: سنگ🪨`,`نتیجه: مثل اینکه اینبار تو بردی🙄 `)
              const skgKaghazbakht = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: کاغذ📝 , بات: قیچی ✂️`,`نتیجه: 😎من بردم داشم `)

                  const skgSangBakht = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: سنگ🪨 , بات: کاغذ📝`,`نتیجه: 😎من بردم داشم  `)  
              const skgSangBord = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: سنگ🪨 , بات: قیچی ✂️`,`نتیجه: مثل اینکه اینبار تو بردی🙄  `)
                    const skgMosaviSang = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: سنگ🪨 , بات: سنگ🪨`,`نتیجه: جالبه🙄مساوی شدیم`)
                    const skgMosaviKaghaz = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: کاغذ📝 , بات: کاغذ📝`,`نتیجه: جالبه🙄مساوی شدیم`)

                    const skgMosaviGeichy = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM') 
             .setTitle('✂️سنگ🪨 ، کاغذ📝 ، قیچی')
             .addField(`شما: قیچی✂️ , بات: قیچی✂️`,`نتیجه: جالبه🙄مساوی شدیم`)

        switch (choice) {
            case 'sang': {
                 if (result === 'sang') return message.channel.send(skgMosaviSang);
                if (result === 'kaghaz') return message.channel.send(skgSangBakht);
                else return message.channel.send(skgSangBord);
            }
            case 'kaghaz': {
                     if (result === 'kaghaz') return message.channel.send(skgMosaviKaghaz);      
                if (result === 'geichy') return message.channel.send(skgKaghazbakht);
                else return message.channel.send(skgKaghazBord);
            }
            case 'geichy': {
          if (result === 'geichy') return message.channel.send(skgMosaviGeichy);           
                if (result === 'sang') return message.channel.send(skgGeichyBakht);
                else return message.channel.send(skgGeichyBord);
            }
            default: {
                return message.channel.send(`شما فقط میتوانید یکی از مورد های زیر را انتخاب کنید:
 \`${acceptedReplies.join(', ')}\``);
            }
        }
    }

}
