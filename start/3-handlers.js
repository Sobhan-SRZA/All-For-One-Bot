const fs = require('fs');
var clc = require("cli-color");
module.exports = async (client) => {
//======== Loading Handlers =========
var counter = 0;
Array ("slashCommandHandler.js", "messageCommandHandler.js", client.config.source.keep_alive ?  "keepAlive.js" : null, "extraEvents.js", client.config.source.anti_crash ? "antiCrash.js" : null)
  .filter(Boolean)
  .forEach((handler) => {
    require(`${process.cwd()}/handlers/${handler}`)(client);
    counter += 1;
});  
try {
    const stringlength = 69;
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(counter)} Handlers Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${counter} Handlers Is Loaded!!`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
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