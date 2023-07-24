const moment = require("moment");
const clc = require("cli-color");
module.exports = async (client) => {
  client.logger = (data) => {
    let logstring = `${clc.greenBright(`Perisan_Caesar`)}${clc.blackBright(` | `)}${clc.cyan(`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`)}${clc.magenta(` 〢 `)}`
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
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */