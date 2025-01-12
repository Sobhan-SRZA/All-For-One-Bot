const clc = require("cli-color");
const post = require("../functions/post");
const loadCommand = require("../functions/loadCommand");
const firstUpperCase = require("../functions/firstUpperCase");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
    ["only_message", "only_slash"].forEach((type) => {
        loadCommand(`${process.cwd()}/src/commands`, type, client.commands);
        post(`${clc.cyanBright(client.commands.filter(a => a[type]).size)} ${firstUpperCase(type.replace("only_", ""))} Commands Is Loaded!!`, "S");
    });
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