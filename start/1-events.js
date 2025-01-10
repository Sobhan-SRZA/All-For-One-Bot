const fs = require('fs');
var clc = require("cli-color");
module.exports = async (client) => {
  try{
    const stringlength = 69;
    var FilesLength = new Map();
    fs.readdirSync('./events').forEach(dirs => {
      const events = fs.readdirSync(`./events/${dirs}`).filter(files => files.endsWith('.js'));
      for (const file of events) {
          const event = require(`./../events/${dirs}/${file}`);
          FilesLength.set(event);
          client.on(file.split(".")[0], event.bind(null, client));
      };
  });
    /*const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
      for (const file of events) {
        const event = require(`./../events/${file}`);
      client.on(file.split(".")[0], event.bind(null, client));
      };*/
try {
    console.log("\n")
    console.log(clc.greenBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + clc.cyanBright(`                   Welcome to Chocolate Boy!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   Welcome to Chocolate Boy!`.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + clc.cyanBright(`             /-/ By Mr.SIN RE AND SIZAR Team /-/`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `             /-/ By Mr.SIN RE AND SIZAR Team /-/`.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + clc.yellowBright(`               /-/ Discord: Mr.SIN RE#1528  /-/`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `               /-/ Discord: Mr.SIN RE#1528  /-/`.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch {
    /* */ }
  try {
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                     Logging into the BOT...`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                     Logging into the BOT...`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
  try {
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.redBright(FilesLength.size)} Events Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${FilesLength.size} Events Is Loaded!!`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
} catch (e) {
  console.log(clc.redBright(String(e.stack)))
}
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