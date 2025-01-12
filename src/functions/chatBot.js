const error = require("./error");

/**
 * 
 * @param {string} question 
 * @param {number} user 
 * @returns 
*/
module.exports = async function (question, user) {
    try {
        const { GradioChatBot } = require("gradio-chatbot");
        const bot = new GradioChatBot();
        const answer = await bot.chat(question, {
            onError(e) {
                error(e)
            }
        });
        return answer ? `${answer.replaceAll("@", "@ ")}` : "???";
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