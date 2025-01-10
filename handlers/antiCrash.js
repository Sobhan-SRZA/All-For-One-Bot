var clc = require("cli-color");
module.exports = async (client) => {
  client.logger(clc.red(`Starting AntiCrash`));
  process.on('multipleResolves', (type, promise, reason) => { 
    console.log(clc.yellowBright('=== [antiCrash] :: [multipleResolves] :: [start] ==='));
    // console.log(type, promise, reason);
    console.log(clc.yellowBright('=== [antiCrash] :: [multipleResolves] :: [end] ==='));
  });
  process.on('unhandledRejection', (reason, promise) => { // Needed
    console.log(clc.yellowBright('=== [antiCrash] :: [unhandledRejection] :: [start] ==='));
    console.log(reason);
    console.log(clc.yellowBright('=== [antiCrash] :: [unhandledRejection] :: [end] ==='));
  });
  process.on('rejectionHandled', (promise) => { // If You Want You Can Use
    console.log(clc.yellowBright('=== [antiCrash] :: [rejectionHandled] :: [start] ==='));
    console.log(promise);
    console.log(clc.yellowBright('=== [antiCrash] :: [rejectionHandled] :: [end] ==='));
  })
  process.on("uncaughtException", (err, origin) => { // Needed
    console.log(clc.yellowBright('=== [antiCrash] :: [uncaughtException] :: [start] ==='));
    console.log(err);
    console.log(clc.yellowBright('=== [antiCrash] :: [uncaughtException] :: [end] ==='));
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => { // Needed
    console.log(clc.yellowBright('=== [antiCrash] :: [uncaughtExceptionMonitor] :: [start] ==='));
    console.log(err);
    console.log(clc.yellowBright('=== [antiCrash] :: [uncaughtExceptionMonitor] :: [end] ==='));
  });
  client.logger(clc.greenBright(`AntiCrash Started`));
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/