"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;
const tslib_1 = require("tslib");
const error_1 = tslib_1.__importDefault(require("../utils/error"));
function logger(data) {
    try {
        const logstring = `${`[G]〢┃  ${"Perisan Caesar".green}`.yellow}${" 〢 ".magenta}`;
        if (typeof data == "string")
            console.log(logstring +
                data
                    .split("\n")
                    .map(d => `${d}`.green)
                    .join(`\n${logstring}`));
        else if (typeof data == "object")
            console.log(logstring + JSON.stringify(data, null, 3).green);
        else if (typeof data == "boolean")
            console.log(logstring + String(data).cyan);
        else
            console.log(logstring + data);
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
//# sourceMappingURL=logger.js.map