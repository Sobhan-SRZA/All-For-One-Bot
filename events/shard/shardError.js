const clc = require('cli-color');
module.exports = async (client, error, id) => {
  client.logger(clc.redBright(`Shard #${id} Errored`));
  setInterval(() => {
      client.logger("The Client Didn't Login Proccesing Kill 1")
        process.kill(1);
  }, 10000); 
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