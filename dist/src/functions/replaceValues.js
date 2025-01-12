"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = replaceValues;
function replaceValues(string, object) {
    Object
        .keys(object)
        .forEach(a => string = string.replace(`{${a}}`, object[a]));
    return string;
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
//# sourceMappingURL=replaceValues.js.map