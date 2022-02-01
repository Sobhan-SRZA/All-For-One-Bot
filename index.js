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
require('discord-buttons')(client);
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