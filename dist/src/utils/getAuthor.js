"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getAuthor;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const error_1 = tslib_1.__importDefault(require("./error"));
function getAuthor(interaction) {
    try {
        if (interaction instanceof discord_js_1.CommandInteraction)
            return interaction.user;
        else
            return interaction.author;
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
//# sourceMappingURL=getAuthor.js.map