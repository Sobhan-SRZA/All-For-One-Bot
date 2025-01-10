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
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/