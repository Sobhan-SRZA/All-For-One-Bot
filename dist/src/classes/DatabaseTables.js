"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickets = exports.BotChannels = void 0;
const tslib_1 = require("tslib");
const __1 = tslib_1.__importDefault(require("../.."));
const Database_1 = tslib_1.__importDefault(require("./Database"));
class BotChannels extends Database_1.default {
    constructor(db) {
        super(db ?? __1.default.db.table("BotChannels"));
    }
}
exports.BotChannels = BotChannels;
class tickets extends Database_1.default {
    constructor(db) {
        super(db ?? __1.default.db.table("BotChannels"));
    }
}
exports.tickets = tickets;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=DatabaseTables.js.map