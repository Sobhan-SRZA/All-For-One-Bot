let clc = require('cli-color');
module.exports = (client, error) => {
  client.on("error",() => clc.redBright(console.error()));
  console.log(clc.redBright(String(error)))
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