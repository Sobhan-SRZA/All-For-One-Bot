"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const quick_db_1 = require("quick.db");
const post_1 = tslib_1.__importDefault(require("../functions/post"));
const console_1 = require("console");
const config_1 = tslib_1.__importDefault(require("../../config"));
exports.default = async (client) => {
    try {
        let driver;
        switch (config_1.default.source.database.type) {
            case "sql": {
                const { SqliteDriver } = await Promise.resolve().then(() => tslib_1.__importStar(require("quick.db")));
                driver = new SqliteDriver("./");
                break;
            }
            case "mysql": {
                const { MySQLDriver } = await Promise.resolve().then(() => tslib_1.__importStar(require("quick.db")));
                driver = new MySQLDriver(config_1.default.source.database.mysql);
                break;
            }
            case "json": {
                const { JSONDriver } = await Promise.resolve().then(() => tslib_1.__importStar(require("quick.db")));
                driver = new JSONDriver();
                break;
            }
            case "mongodb": {
                // const { MongoDriver } = await import("quickmongo");
                // driver = new MongoDriver(config.source.database.mongoURL);
                // await driver.connect();
                break;
            }
        }
        ;
        const db = new quick_db_1.QuickDB({ driver });
        await db.init();
        client.db = db;
        (0, post_1.default)(`Database Is Successfully Activated!! (Type: ${config_1.default.source.database.type.toLocaleUpperCase()})`, "S");
    }
    catch (e) {
        (0, post_1.default)(`Database Doesn't Work!!`.red, "E", "red", "red");
        (0, console_1.error)(e);
    }
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
//# sourceMappingURL=database.js.map