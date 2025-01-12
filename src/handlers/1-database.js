const {
  QuickDB
} = require("quick.db");
const clc = require("cli-color");
const error = require("../functions/error");
const post = require("../functions/post");
const database = (require("../../config")).source.database;

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
  try {
    switch (database.type) {
      case "sql": {
        const {
          SqliteDriver
        } = require("quick.db");
        driver = new SqliteDriver();
      } break;

      case "mysql": {
        const {
          MySQLDriver
        } = require("quick.db");
        driver = new MySQLDriver(database.mysql)
      } break;

      case "json": {
        const {
          JSONDriver
        } = require("quick.db");
        driver = new JSONDriver();
      } break;

      case "mongodb": {
        const {
          MongoDriver
        } = require("quickmongo");
        driver = new MongoDriver(database.mongoURL);
        await driver.connect();
      } break;
    };

    const db = new QuickDB({
      driver
    });
    await db.init();
    client.db = db;
    post(`Database Is Successfully Connected!! (Type: ${database.type.toLocaleUpperCase()})`, "S")
  } catch (e) {
    post(`${clc.red(`Database Doesn't Connected!! (Type: ${database.type.toLocaleUpperCase()})`)}`, "E", "red", "redBright")
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