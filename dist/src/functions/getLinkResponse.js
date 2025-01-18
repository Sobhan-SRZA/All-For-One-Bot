"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLinkResponse;
async function getLinkResponse(url) {
    try {
        let data = await fetch(url, {
            headers: {
                Authorization: "Basic MDE1NDQ1NTM1NDU0NDU1MzU0RDY6"
            }
        }).then(res => res.json());
        return data;
    }
    catch (e) {
        console.error(e);
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
//# sourceMappingURL=getLinkResponse.js.map