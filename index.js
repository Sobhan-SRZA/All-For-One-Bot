//===========================================================================================================//
//express
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('kharkosse botet run shod!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
//===========================================================================================================//
//consol
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const { Player } = require('discord-player');

const sezar = require ('./config/bot')
const prefix = sezar.discord.prefix
client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new Discord.Collection();
client.login(client.config.discord.token);
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

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
//status
client.on("ready", () => {
  function YousamPower() {
     const count = client.guilds.cache.get("912596015075455016")
    let sezar = [`${count.memberCount} Members` , `${prefix}help`]
    let Power = Math.floor(Math.random() * sezar.length);
    client.user.setActivity(sezar[Power], {type: "WATCHING"});//can be LISTENING, WATCHING, PLAYING, STREAMING
  }; setInterval(YousamPower, 5000)
    client.user.setStatus("idle")//can be invesible, online, idle, dnd
});

//===========================================================================================================//
//help command
const discord = require('discord.js');
client.on('message', message => {
    let args = message.content.substring(prefix.length).split("help")
    if (message.content.startsWith(`${prefix}help`)) {
        let help = new discord.MessageEmbed()
      help.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      help.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      help.setTitle(`${client.user.username} Help Commands :)`)
      help.setDescription(``)
      help.setURL('https://discord.gg/vgnhGXabNw')
      help.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      help.setColor("RANDOM")
      help.addField('**Music Help**', `\`${prefix}music help\``, false)
      help.addField('**Self Bot Help**', `\`${prefix}self help\``, false)
      help.addField('**VC Filter Help**', `\`${prefix}filter help\``, false)
      help.addField(`**Links**`, `**[Support Server](${"https://discord.gg/5GYNec4urW"}) • [Invite](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=137775017040&scope=bot)**`)

            message.channel.send(help)
    }
})
//===========================================================================================================//
client.on('message', message => {
    let args = message.content.substring(prefix.length).split("help music")
    if (message.content.startsWith(`${prefix}music help`)) {
        let music = new discord.MessageEmbed()
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


            message.channel.send(music)
    }
})
//===========================================================================================================//
client.on('message', message => {
    let args = message.content.substring(prefix.length).split("filters help")
    if (message.content.startsWith(`${prefix}filter help`)) {
        let filters = new discord.MessageEmbed()
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
            message.channel.send(filters)
    }
})
//===========================================================================================================//
client.on('message', message => {
    let args = message.content.substring(prefix.length).split("self help")
    if (message.content.startsWith(`${prefix}self help`)) {
        let self = new discord.MessageEmbed()
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

            message.channel.send(self)
    }
})


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
        let inviteEmbed = new discord.MessageEmbed()
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
