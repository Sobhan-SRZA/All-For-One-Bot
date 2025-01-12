"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const post_1 = tslib_1.__importDefault(require("../functions/post"));
exports.default = async (client) => {
    let amount = 0;
    const path = `${process.cwd()}/dist/src/events`;
    for (const dirs of (0, fs_1.readdirSync)(path)) {
        const events = (0, fs_1.readdirSync)(`${path}/${dirs}`).filter(files => files.endsWith(".js"));
        for (const file of events) {
            const eventModule = await Promise.resolve(`${`${path}/${dirs}/${file}`}`).then(s => tslib_1.__importStar(require(s)));
            const event = eventModule.default || eventModule;
            client.on(file.split(".")[0], event.bind(null, client));
            amount++;
        }
        ;
    }
    (0, post_1.default)(String(amount).cyan + " Events Is Loaded!!".green, "S");
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
//# sourceMappingURL=eventsHandler.js.map