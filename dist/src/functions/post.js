"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = post;
const tslib_1 = require("tslib");
const error_1 = tslib_1.__importDefault(require("../utils/error"));
function post(data, name, color1, color2) {
    try {
        const dataColor = color1 || "yellow";
        const textColor = color2 || "green";
        const message = `${(`[${name || "U"}]〢┃  `)[dataColor]}`;
        if (typeof data == "string")
            console.log(message +
                data
                    .split("\n")
                    .map(d => `${`${d}`[textColor]}`.green)
                    .join(`\n${message}`));
        else if (typeof data == "object")
            console.log(message + JSON.stringify(`${data}`[textColor], null, 3).green);
        else if (typeof data == "boolean")
            console.log(message + `${`${data}`[textColor]}`.cyan);
        else
            console.log(message + `${data}`[textColor]);
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
//# sourceMappingURL=post.js.map