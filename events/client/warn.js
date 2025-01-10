let clc = require('cli-color');
module.exports = (client, error) => {
    client.on("warn", (info) => console.log(info));
    console.log(clc.redBright(String(error)))
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