const error = require("./error");
const { QueueRepeatMode } = require("discord-player");

/**
 * 
 * @param {import("discord-player").GuildQueue} queue 
 * @returns {string}
 */
module.exports = async function (queue) {
    try {
        const volume = queue.node.volume || "";
        const isShuffle = queue.isShuffling ? "Yes" : "No";
        let loop = "";
        if (queue.repeatMode === QueueRepeatMode.QUEUE)
            loop = "QUEUE";

        else if (queue.repeatMode === QueueRepeatMode.TRACK)
            loop = "TRACK";

        else
            loop = "OFF";

        let bar = "";
        try {
            bar = `\n\n${queue.node.createProgressBar()}`;
        } catch {
        }
        return `**Volume: ${volume}%\nShuffle: ${isShuffle}\nLoop: ${loop}${bar}**`;
    } catch (e) {
        error(e)
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