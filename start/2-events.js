const fs = require('fs');
var clc = require("cli-color");
module.exports = async (bot) => {
  try{
    let counter = 0;
    const stringlength = 69;
    fs.readdirSync(`${process.cwd()}/events`).forEach(dirs => {
      const events = fs.readdirSync(`${process.cwd()}/events/${dirs}`).filter(files => files.endsWith('.js'));
      for (const file of events) {
          const event = require(`${process.cwd()}/events/${dirs}/${file}`);
          counter += 1;
          bot.on(file.split(".")[0], event.bind(null, bot));
      };
  });
try {
    console.log("\n")
    console.log(clc.greenBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + clc.cyanBright(`                   Welcome to ${clc.redBright(`Ilona`)}!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   Welcome to Ilona!`.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + clc.cyanBright(`             /-/ By Sobhan-SRZA and Persian Caesar /-/`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `             /-/ By Sobhan-SRZA and Persian Caesar /-/`.length) + clc.greenBright("┃"))
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
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.redBright(counter)} Events Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${counter} Events Is Loaded!!`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
} catch (e) {
  console.log(clc.redBright(String(e.stack)))
}
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */