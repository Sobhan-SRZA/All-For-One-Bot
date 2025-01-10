const moment = require("moment");
const clc = require("cli-color");
module.exports = async (client) => {
client.logger = (data) => {
    let logstring = `${clc.greenBright(`SIZAR_Team`)}${clc.blackBright(` | `)}${clc.cyan(`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`)}${clc.magenta(` 〢 `)}`
    if (typeof data == "string") {
      console.log(logstring, data.split("\n").map(d => clc.green(`${d}`)).join(`\n${logstring} `))
    } else if (typeof data == "object") {
      console.log(logstring, clc.green(JSON.stringify(data, null, 3)))
    } else if (typeof data == "boolean") {
      console.log(logstring, clc.cyan(data))
    } else {
      console.log(logstring, data)
    }
  };
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