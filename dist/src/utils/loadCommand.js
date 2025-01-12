"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadCommand;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const post_1 = tslib_1.__importDefault(require("../functions/post"));
const firstUpperCase_1 = tslib_1.__importDefault(require("../functions/firstUpperCase"));
const error_1 = tslib_1.__importDefault(require("./error"));
async function loadCommand(dirname, type, object) {
    try {
        for (const dirs of (0, fs_1.readdirSync)(dirname)) {
            const commandFiles = (0, fs_1.readdirSync)(`${dirname}/${dirs}`)
                .filter(files => files.endsWith(".js"));
            for (const file of commandFiles) {
                const commandData = await (await Promise.resolve(`${`${dirname}/${dirs}/${file}`}`).then(s => tslib_1.__importStar(require(s))));
                const command = commandData.default || commandData;
                if (command[type])
                    object.set(command.data.name, command);
                else {
                    (0, post_1.default)(`${(0, firstUpperCase_1.default)(type.replace("only_", ""))} Command Not Loaded: ${file}`, "E", "red", "red");
                    continue;
                }
            }
        }
        ;
    }
    catch (e) {
        (0, error_1.default)(e);
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
//# sourceMappingURL=loadCommand.js.map