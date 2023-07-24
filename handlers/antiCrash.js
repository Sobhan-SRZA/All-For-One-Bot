var clc = require("cli-color");
module.exports = async (client) => {
  console.log("\n")
  client.logger(clc.red(`Starting AntiCrash`));
  process.on('unhandledRejection', (reason, promise) => {
    console.log(clc.redBright('=== [antiCrash] :: [unhandledRejection] :: [start] ==='));
    console.log(reason);
    console.log(clc.redBright('=== [antiCrash] :: [unhandledRejection] :: [end] ==='));
  });
  process.on('rejectionHandled', (promise) => {
    console.log(clc.redBright('=== [antiCrash] :: [rejectionHandled] :: [start] ==='));
    console.log(promise);
    console.log(clc.redBright('=== [antiCrash] :: [rejectionHandled] :: [end] ==='));
  })
  process.on("uncaughtException", (err, origin) => {
    console.log(clc.redBright('=== [antiCrash] :: [uncaughtException] :: [start] ==='));
    console.log(err);
    console.log(clc.redBright('=== [antiCrash] :: [uncaughtException] :: [end] ==='));
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(clc.redBright('=== [antiCrash] :: [uncaughtExceptionMonitor] :: [start] ==='));
    console.log(err);
    console.log(clc.redBright('=== [antiCrash] :: [uncaughtExceptionMonitor] :: [end] ==='));
  });
  client.logger(clc.greenBright(`AntiCrash Started`));
  console.log("\n")
};
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */