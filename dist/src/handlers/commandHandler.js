"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const error_1 = tslib_1.__importDefault(require("../utils/error"));
const firstUpperCase_1 = tslib_1.__importDefault(require("../functions/firstUpperCase"));
const loadCommand_1 = tslib_1.__importDefault(require("../utils/loadCommand"));
const post_1 = tslib_1.__importDefault(require("../functions/post"));
exports.default = async (client) => {
    try {
        const commandTypes = ["only_message", "only_slash"];
        commandTypes.forEach(async (type) => {
            await (0, loadCommand_1.default)(`${process.cwd()}/dist/src/commands`, type, client.commands);
            (0, post_1.default)(`${client.commands.filter(a => a[type]).size}`.cyan + ` ${(0, firstUpperCase_1.default)(type.replace("only_", ""))} Commands Is Loaded!!`.green, "S");
        });
    }
    catch (e) {
        (0, error_1.default)(e);
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
//# sourceMappingURL=commandHandler.js.map