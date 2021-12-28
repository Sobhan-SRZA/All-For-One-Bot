//===========================================================================================================//
//express
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Bot Is Working Well!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//===========================================================================================================//
//consol
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });  
const disbut = require('discord-buttons'); // Define discord-buttons module with npm i discord-buttons
disbut(client);
const { Player } = require('discord-player');
client.player = new Player(client);
const {createPages} = require('discord-buttons-page-v12');
const moment = require("moment");
const sezar = require('./config/bot')
const prefix = sezar.discord.prefix
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new Discord.Collection();
client.login(client.config.discord.token);
   
//===========================================================================================================//
//Loading Commands
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

//===========================================================================================================//
//Events
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};
for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

//===========================================================================================================//
//status bot
const srza = require('discord.js');
srza.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
client.on("ready", () => {
   function YousamPower() {
    let vazyiat = ["dnd","idle","online"] // online | dnd | idle | offline
    let godrat = Math.floor(Math.random() * vazyiat.length)
   client.user.setPresence({
     status: vazyiat[godrat] })
}; setInterval(YousamPower, 3000)
   function srza() {
    let sezar = [`${prefix}help`, `${prefix}play`,"Mr.SIN RE" , `🔰Sizar Team🔰`,`${client.guilds.cache.size} Servers` ]
    let Power = Math.floor(Math.random() * sezar.length);
    let statusPlay = ["LISTENING","WATCHING","PLAYING"] //can be LISTENING, WATCHING, PLAYING, STREAMING  
    let godratPlay = Math.floor(Math.random() * statusPlay.length);     
   client.user.setActivity(sezar[Power], {type: statusPlay[godratPlay]});
        }; setInterval(srza, 3000)
});

//===========================================================================================================//
//about bot
client.on('message', message => {
    if(message.author.bot) return;
    if(message.content.startsWith(`${prefix}about`)){
    let infoEmbed = new Discord.MessageEmbed()
      infoEmbed.setColor("RANDOM");
      infoEmbed.setTitle(`Stats from \`${client.user.username}\``);
      infoEmbed.addField(":ping_pong: Ping",`┕\`${Math.round(client.ws.ping)}ms\``,true);

      infoEmbed.addField(":clock1: Uptime", `┕\`${moment.duration(message.client.uptime)}\``,true);
      infoEmbed.addField(":file_cabinet: Memory",`┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}mb\``,true);

      infoEmbed.addField(":homes: Servers",`┕\`${client.guilds.cache.size}\``, true);
      infoEmbed.addField(":busts_in_silhouette: Users",`┕\`${client.users.cache.size}\``,true);
      infoEmbed.addField(":control_knobs: API Latency",`┕\`${message.client.ws.ping}ms\``,true);
      infoEmbed.addField(":robot: Version",`┕\`Omega 5.2.1\``,true);

      infoEmbed.addField(":blue_book: Discord.js",`┕\`v12.2.1\``,true);

          infoEmbed.addField(":green_book: Node",`┕\`16.1.2\``,true);
      infoEmbed.setTimestamp();
      
            message.channel.send(infoEmbed)
    }
    });

//===========================================================================================================//
//help command
client.on('message', message => {
    if(message.author.bot) return;
    if(message.content.startsWith(`${prefix}help`)){

    let help = new Discord.MessageEmbed()
      help.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      help.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      help.setTitle(`${client.user.username} Help Commands :)`)
      help.setDescription(``)
      help.setURL('https://discord.gg/vgnhGXabNw')
      help.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      help.setColor("RANDOM")
      help.addField('**Bot Help**', `\`page 1\``, false)
      help.addField('**VC Filter Help**', `\`page 2\``, false)      
      help.addField('**Music Help**', `\`page 3\``, false)
      help.addField('**Self Bot Help**', `\`page 4\``, false)
      help.addField('**Ticket Help**', `\`page 5\``, false)
      help.addField(`**Links**`, `**[Support Server](${"https://discord.gg/5GYNec4urW"}) • [Invite](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=137775017040&scope=bot)**`)

            let filters = new Discord.MessageEmbed()
      filters.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      filters.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      filters.setTitle(`${client.user.username}Filter Help Commands :)`)
      filters.setURL('https://discord.gg/vgnhGXabNw')
      filters.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      filters.setColor("RANDOM")
      filters.addField(`**${prefix}filter 8d**`,'`get filter= 8D`' , true)
      filters.addField(`**${prefix}filter gate**`,'`get filter= gate`' , true)
      filters.addField(`**${prefix}filter haas**`,'`get filter= haas`' , true)
      filters.addField(`**${prefix}filter phaser**`,'`get filter= phaser`' , true)
      filters.addField(`**${prefix}filter treble**`,'`get filter= treble`' , true)
      filters.addField(`**${prefix}filter tremolo**`,'`get filter= tremolo`' , true)
      filters.addField(`**${prefix}filter vibrato**`,'`get filter= vibrato`' , true)
      filters.addField(`**${prefix}filter reverse**`,'`get filter= reverse`' , true)
      filters.addField(`**${prefix}filter karaoke**`,'`get filter= karaoke`' , true)
      filters.addField(`**${prefix}filter flanger**`,'`get filter= flanger`' , true)
      filters.addField(`**${prefix}filter mcompand**`,'`get filter= mcompand`' , true)
      filters.addField(`**${prefix}filter surrounding**`,'`get filter= surrounding`' , true)
      filters.addField(`**${prefix}filter normalizer**`,'`get filter= normalizer`' , true)
      filters.addField(`**${prefix}filter nightcore**`,'`get filter= nightcore`' , true)
      filters.addField(`**${prefix}filter vaporwave**`,'`get filter= vaporwave`' , true)
      filters.addField(`**${prefix}filter bassboost**`,'`get filter= bassboost`' , true)
      filters.addField(`**${prefix}filter pulsator**`,'`get filter= pulsator`' , true)
      filters.addField(`**${prefix}filter subboost**`,'`get filter= subboost`' , true)  

        let music = new Discord.MessageEmbed()
      music.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      music.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      music.setTitle(`${client.user.username} Music Help Commands :)`)
      music.setDescription(``)
      music.setURL('https://discord.gg/vgnhGXabNw')
      music.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      music.setColor("RANDOM")
      music.addField(`**${prefix}play**`,'`Plays audio from YouTube or Soundcloud | Aliases: (p)`' , true)
      music.addField(`**${prefix}disconnect**`,'`disconnect at the voice | Aliases: (dc)`' , true)
      music.addField(`**${prefix}invite**`,'`Send bot invite link | Aliases: ()`' , true)
      music.addField(`**${prefix}loop**`,'`Toggle music loop | Aliases: (l)`' , true)
      music.addField(`**${prefix}lyrics**`,'`Get lyrics for the currently playing song | Aliases: (ly)`' , true)
      music.addField(`**${prefix}np**`,'`Show now playing song | Aliases: ()`' , true)
      music.addField(`**${prefix}pause**`,'`Pause the currently playing music | Aliases: ()`' , true)
      music.addField(`**${prefix}playlist**`,'`Play a playlist from youtube | Aliases: (pl)`' , true)
      music.addField(`**${prefix}search**`,'`Search and select videos to play | Aliases: ()`' , true)
      music.addField(`**${prefix}skip**`,'`Skip the currently playing song | Aliases: (s)`' , true)
      music.addField(`**${prefix}shuffle**`,'`Shuffle queue | Aliases: ()`' , true)
      music.addField(`**${prefix}stop**`,'`Stops the music | Aliases: ()`' , true)
      music.addField(`**${prefix}resume**`,'`Resume currently playing music | Aliases: (r)`' , true)
      music.addField(`**${prefix}queue**`,'`show what music playing in the queue | Aliases: (q)`' , true)
      music.addField(`**${prefix}clearqueue**`,'`request to clear queue | Aliases: (cq)`' , true)
      music.addField(`**${prefix}join**`,'`join bot on voice | Aliases: ()`' , true)
      music.addField(`**${prefix}filter**`,'`Change the sound quality and make it multidimensional|Aliases: ()`' , true)



        let self = new Discord.MessageEmbed()
      self.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      self.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      self.setTitle(`${client.user.username}Self Help Commands :)`)
      self.setDescription(``)
      self.setURL('https://discord.gg/vgnhGXabNw')
      self.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      self.setColor("RANDOM")
      self.addField(`**${prefix}ping**`, '`Show the bot is average ping | Aliases: ()`', false)
      self.addField(`**${prefix}debug**`, '`Shows the position of the robot | Aliases: ()`', false)
      self.addField(`**${prefix}serverlist**`, '`Indicates which servers Bot is a member of | Aliases: ()`', false)

  let ticket = new Discord.MessageEmbed()

   ticket.setTitle(`Ticket Help Commands`)
   ticket.setAuthor(`Ticket Help ${message.client.user.username }`,`${message.client.user.displayAvatarURL({ format: "png" })}`)
   ticket.setThumbnail('https://cdn.discordapp.com/attachments/902034619791196221/905043997280567346/e4b59a9ad0fafa675c7760e7f6671d0e.gif')
   ticket.setColor(`RANDOM`)
   ticket.addField(`**> ${prefix}setlogs <Tag Channele Morede Nazar>**`, '`Az In Command Baraye Set Kardan Log Dar Channel Khod Estefade Konid`', false)
   ticket.addField(`**> ${prefix}ticket**`, '`Az Command Baraye Sakhtane Ticket Estefade Konid`', false)
   ticket.addField(`**> ${prefix}close**`, '`Az In Command Baraye Delete Kardan Ya Bastane Har Ticket Anjam Bedid`', false)
   ticket.setFooter(`Requested by ${message.author.username} | Created By Mr.SIN RE#1528 :)`, `${message.author.displayAvatarURL()}`)
  ticket.addField(`**Links**`, `**[Support Server](${"https://discord.gg/5GYNec4urW"}) • [Invite](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=137775017040&scope=bot)**`)

    
    const embeds = [help, music ,filters, self,ticket];
    const ButtonStyle = "green"; // Or SECONDARY, SUCCESS, DANGER.
    createPages(client, message, embeds, ButtonStyle, true, false);
         message.react('🙏🏻')   
    }
});

//===========================================================================================================//
//serverlist
client.on('message', message => {
  if (message.content === `${prefix}serverlist`) { 
    const Guilds = client.guilds.cache.array().map((G, I) => `${I + 1}. **${G.name}** - **${G.id}**`).join("\n");
    if (!Guilds) return message.channel.send("No Guild");
    return message.channel.send(Guilds, { split: { char: "\n" } }); }
});

//===========================================================================================================//
//invite
client.on('message', message => {
    let args = message.content.substring(prefix.length).split("invite")

    if (message.content.startsWith(`${prefix}invite`)) {
        let inviteEmbed = new Discord.MessageEmbed()
      inviteEmbed.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      inviteEmbed.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      inviteEmbed.setTitle(`Ba Invite Bot Be Servert Azash Hemaiat Kon☺ ${client.user.username}`)
      inviteEmbed.setDescription(`**Montazer chi hasti🤨? Bodo mano be servert add kon🙂😘 \n\n [Invite Link](https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=412353895745&scope=bot)**`)
      inviteEmbed.setURL(`https://discord.gg/5GYNec4urW`)
      inviteEmbed.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      inviteEmbed.setColor("RANDOM")

            message.channel.send(inviteEmbed)
    
}
})

//===========================================================================================================//
//sang kaghaz geichy
client.on('message', message => {
    if (message.author.bot) return; 
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'skg') {
        const acceptedReplies = ['sang', 'kaghaz', 'geichy'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
        const choice = args[0];
        if (!choice) return message.channel.send(`نحوه بازی کردن: 
\`${prefix}skg <sang|kaghaz|geichy>\``).then(m => {
  m.react('📝');  m.react('🪨');  m.react('✂️');
});
        if (!acceptedReplies.includes(choice)) return message.channel.send(`شما فقط میتوانید یکی از مورد های زیر را انتخاب کنید:
 \`${acceptedReplies.join(', ')}\``);
        
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
}); 







client.on('message', message => {
if (message.content === `${prefix}tas`) {
        var meme = ['1','2','3','4','5','6','1','2','3','4',];
const tas= meme[Math.floor(Math.random () * meme.length)];
message.channel.send(tas);
    }
    if (message.content === `${prefix}shansi`) {
        var doc = ['مهندس','دکتر','خر','بچه مایه دار','خوش شانس','خر شانس','پلیس','شهردار'];
const shansi= doc[Math.floor(Math.random () * doc.length)];
message.channel.send(shansi);
    }
if (message.content === `${prefix}shkh`) {
 var shirkhat = ['شیر','خط'];
const seke = shirkhat[Math.floor(Math.random () * shirkhat.length)];

        const shkh = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
          .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM')   
             .addField(`سکه رو انداختم بزار ببینم <:smile_boy:914242070615556196>شیره یا خط`,`[${seke}](${"https://discord.gg/5GYNec4urW"})`)   
message.channel.send(shkh)
      message.react('🪙')
}

  
  if (message.content === "pedaret") {
        var pedar = ["پدرت","دک خر تو پوسی  بابات",'خفه شو و بزار از خوردن بابات لذت ببریم','پوسی بابات','اسب دریایی دارم باباتو میخورم خفه شو و گریه کن','پدرت قبل خورده شدن میگفت پسرم مرده😱','دک سیاه بره تو پوسی بابات','دک شدی حالا بیا دکمو بخور😋','پدرت یام یام شد😋'];
const shotor = pedar[Math.floor(Math.random () * pedar.length)];
message.channel.send(shotor);
  }

});



//===========================================================================================================//
//clear command
client.on('message', message => {
    if (message.author.bot) return;
    if (message.author.bot || message.channel.type == "dm") return;
    const cmd = message.content.toLowerCase()
    const messageArray = cmd.split(" ")
    const command = messageArray[0]
    let args = message.content.substring(prefix.length).split(" ")
    if (message.content.startsWith(prefix)) {
        if (args[0] === `clear`) {
            if (args[1]) {
                let check = isNaN(args[1])
                if (check) {
                    message.reply("مقدار وارد شده اشتباه است")
                }
                if (!check) {
                    if (message.member.hasPermission("MANAGE_CHANNELS")) {
                        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                            let number = args[1]
                            number++
                            message.channel.bulkDelete(number)

                            const result = new Discord.MessageEmbed()
                                .setTitle("با موفقیت انجام شد")
                                .addField("تعداد پیام های زیر پاک شد", args[1])
                                .setColor("RANDOM")
                                .setFooter('این پیام به صورت خودکار پاک میشود')
                            message.channel.send(result).then(msg => {
                                function autodel() {
                                    msg.delete()
                                }

                                setTimeout(autodel, 5 * 1000)

                            })
                        }
                    }
                }
            }
        }



    }
});


//===========================================================================================================//
//gaysanj
client.on('message', message => {
if (message.content === `${prefix}gaysanj`) {

        const alpha=Math.floor(Math.random() * 100) + 1 ;

 var sardar = ['(1/10) ▰▱▱▱▱▱▱▱▱▱','(2/10) ▰▰▱▱▱▱▱▱▱▱','(3/10) ▰▰▰▱▱▱▱▱▱▱','(4/10) ▰▰▰▰▱▱▱▱▱▱','(5/10) ▰▰▰▰▰▱▱▱▱▱','(6/10) ▰▰▰▰▰▰▱▱▱▱','(7/10) ▰▰▰▰▰▰▰▱▱▱','(8/10) ▰▰▰▰▰▰▰▰▱▱','(9/10) ▰▰▰▰▰▰▰▰▰▱','(10/10) ▰▰▰▰▰▰▰▰▰▰'];
const savan = sardar[Math.floor(Math.random () * sardar.length)];

        const gayembed = new Discord.MessageEmbed()
             .setAuthor(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/emojis/914253452853538917.png`)
          .setThumbnail(`${message.author.displayAvatarURL()}`)
             .setTimestamp()
             .setColor('RANDOM')   
             .addField(` میزان گی بودن شما **${alpha}%**<a:qer:914468879546347541>است <a:hehe:914470000092414012>`,`[${savan}](${"https://discord.gg/5GYNec4urW"})`)   
message.channel.send(gayembed)
      message.react('🌈')
}

});



//===========================================================================================================//
//meme redit
const randomPuppy = require('random-puppy')
client.on('message', async message => {
    if (message.content === `${prefix}meme`) {
         // In this array, 
            // you can put the subreddits you want to grab memes from
            const subReddits = ["dankmeme", "meme", "me_irl"];
            // Grab a random property from the array
            const random = subReddits[Math.floor(Math.random() * subReddits.length)];
                // Get a random image from the subreddit page
                const img = await randomPuppy(random);
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setImage(img)
                    .setTitle("Reddit Memes URL")
                    .setURL(`https://reddit.com/r/${random}`);

                message.channel.send(embed);
            }
});
