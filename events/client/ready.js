var clc = require("cli-color");
var Discord = require('discord.js')
module.exports = async (client) => {
function Status() {
    let Presence = [ "dnd", "idle", "online" ]; //can be: online | dnd | idle | offline
    let PresencePower = Presence[Math.floor(Math.random() * Presence.length)]
   client.user.setPresence({ status: PresencePower })
};setInterval(Status, 3000)
function Activitys() {
    let totalUsers = client.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
    let Activity = [`${client.prefix}help`, `${client.prefix}play` , `${client.guilds.cache.size} Servers`, `${totalUsers} Users`];
    let ActivityPower = Activity[Math.floor(Math.random() * Activity.length)];
    let Display = [`WATCHING`, `PLAYING` , `LISTENING` , `COMPETING` , `CUSTOM_STATUS` ,  `STREAMING` ]; //can be: COMPETING | WATCHING | LISTENING | PLAYING | CUSTOM_STATUS | STREAMING 
    let DisplayPower = Display[Math.floor(Math.random() * Display.length)];
    let URL = [ `https://www.twitch.tv/sobhan_srza` ];
    let URLPower = URL[Math.floor(Math.random() * URL.length)];
   client.user.setActivity({ type: DisplayPower, name: ActivityPower, url: URLPower });
};setInterval(Activitys, 3000)
try{
   const stringlength = 69;
   console.log("\n")
   console.log(clc.greenBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
   console.log(clc.greenBright(`     ┃ ` + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃"))
   console.log(clc.greenBright(`     ┃                    ` + clc.blueBright(`Discord Bot is online!`) + " ".repeat(-20+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃"))
   console.log(clc.greenBright(`     ┃           ` + ` /--/ ${clc.cyanBright(client.user.tag)} Is Now Online :) /--/ `+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${clc.cyanBright(client.user.tag)} Is Now Online :) /--/ `.length)+ "┃"))
   console.log(clc.greenBright(`     ┃ ` + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃"))
   console.log(clc.greenBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
   console.log("\n")
   client.logger(
      clc.blueBright(`Working Guilds: `) + clc.greenBright(`${client.guilds.cache.size} Servers`) + `\n` +
      clc.blueBright(`Watching Members: `) + clc.greenBright(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members`) + `\n` +
      clc.blueBright(`Commands: `) + clc.greenBright(`${client.commands.size}`) + `\n` +
      clc.blueBright(`Slash Commands: `) + clc.greenBright(`${client.slashCommands.size}`) + `\n` +
      clc.blueBright(`Discord.js: `) + clc.greenBright(`v${Discord.version}`) + `\n` +
      clc.blueBright(`Node.js: `) + clc.greenBright(`${process.version}`) + `\n` +
      clc.blueBright(`Plattform: `) + clc.greenBright(`${process.platform} ${process.arch}`) + `\n` +
      clc.blueBright(`Memory: `) + clc.greenBright(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`)
    );
}catch{ /* */ }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */