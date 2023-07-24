const fs = require('fs');
const clc = require("cli-color");
module.exports = async (client) => {
  fs.readdirSync(`${process.cwd()}/commands`).forEach(dirs => {
    const commands = fs.readdirSync(`${process.cwd()}/commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
      const command = require(`${process.cwd()}/commands/${dirs}/${file}`);
      if (command.aliases) {
        if (command.name) {
          client.messageCommands.set(command.name, command);
        } else {
          try {
            console.log(clc.redBright(`Message Command Not Loaded: ${file}`))
          } catch (e) {
            console.log(e)
          }
          continue;
        }
      }
    };
  });
  try {
    const stringlength = 69;
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(client.messageCommands.size)} Message Commands Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${client.messageCommands.size} Message Commands Is Loaded!!`.length) + clc.yellowBright("┃"))
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