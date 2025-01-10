let clc = require('cli-color');
module.exports = async (client, id) => {
  try {
    client.logger(clc.greenBright(`Shard #${id} Ready`));
  } catch { /* */ }
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