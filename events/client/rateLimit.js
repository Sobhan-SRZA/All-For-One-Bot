let clc = require('cli-color');
module.exports = async (client, rateLimitData) => {
    client.logger(clc.cyanBright(JSON.stringify(rateLimitData)));
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