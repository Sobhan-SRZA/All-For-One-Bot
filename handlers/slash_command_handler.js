const {
  readdirSync
} = require("fs");
var clc = require("cli-color");
module.exports = async (client) => {
  try {
    let amount = 0;
    const slashCommandsArray = [];
    readdirSync("./slashCommands/").forEach((dir) => {
      const slashCommands = readdirSync(`./slashCommands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of slashCommands) {
        const pull = require(`../slashCommands/${dir}/${file}`);
        if (pull.name) {
          client.slashCommands.set(pull.name, pull);
          if (["MESSAGE", "USER"].includes(pull.type)) delete pull.description;
          slashCommandsArray.push(pull)
          amount++
        } else {
          try {
            console.log(clc.redBright(`Slash Command Not Loaded: ${file}`))
          } catch {
          }
          continue;
        }
      }
    });
    try {
      const stringlength = 69;
      console.log("\n")
      console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
      console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
      console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.cyanBright(amount)} Slash Commands Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${amount} Slash Commands Is Loaded!!`.length) + clc.yellowBright("┃"))
      console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
      console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)) + '\n'
    } catch { /* */ }
  
    client.on("ready", async () => {
        try {
          // For 1 Server Only👇🏻
          // await client.guilds.cache.get("server_id"||client.config.discord.server_id).commands.set(slashCommandsArray);
          // For Global Server👇🏻
          await client.application.commands.set(slashCommandsArray);
        } catch (error) {
          console.log(error)
        }
      })
  } catch (e) {
    console.log(e.message);
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/