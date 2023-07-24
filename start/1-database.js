require('dotenv').config()
const { 
  QuickDB, 
} = require("quick.db");
const {
  MongoDriver
} = require("quickmongo");
const stringlength = 69;
const clc = require("cli-color");
module.exports = async (client) => {
//======== Loading Database =========
  try{
    const driver = new MongoDriver(client.config.source.database.mongoURL);
    await driver.connect()
    const db = new QuickDB({ 
      driver 
    });
    await db.init();
    client.db = db;
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`          Database Is Successfully Connected!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `          Database Is Successfully Connected!!`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  }catch(e){
    console.log("\n")
    console.log(clc.redBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.redBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.redBright("┃"))
    console.log(clc.redBright(`     ┃ `) + clc.red(`          Database Doesn't Connected!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `          Database Doesn't Connected!!`.length) + clc.redBright("┃"))
    console.log(clc.redBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.redBright("┃"))
    console.log(clc.redBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
    console.error(e)
  }
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