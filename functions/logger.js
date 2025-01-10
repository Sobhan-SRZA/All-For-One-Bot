const clc = require("cli-color");
const error = require("./error");

/**
 * 
 * @param {any} data 
 * @returns
 */
module.exports = function (data) {
    try {
        let logstring = `${clc.yellowBright(`[G]〢┃  ${clc.greenBright("Perisan Caesar")}`)}${clc.magenta(` 〢 `)}`
        if (typeof data == "string") {
            console.log(logstring + data.split("\n").map(d => clc.green(`${d}`)).join(`\n${logstring}`));
        } else if (typeof data == "object") {
            console.log(logstring + clc.green(JSON.stringify(data, null, 3)));
        } else if (typeof data == "boolean") {
            console.log(logstring + clc.cyan(data));
        } else {
            console.log(logstring + data);
        }
    } catch (e) {
        error(e)
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