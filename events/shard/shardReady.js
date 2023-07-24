const clc = require('cli-color');
module.exports = async (client, id) => {
  try {
    client.logger(clc.greenBright(`Shard #${id} Ready`));
  } catch(e) { console.error(e) }
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