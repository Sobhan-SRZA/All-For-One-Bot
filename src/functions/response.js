const error = require("./error");

/**
 * 
 * @param {import("discord.js").CommandInteraction} interaction 
 * @param {import("discord.js").BaseMessageOptions} data 
 * @returns {import("discord.js").InteractionResponse}
 */
module.exports = async function response(interaction, data) {
    try {
        if (interaction.user) {
            return await interaction.editReply(data);
        } else {
            return await interaction.reply(data);
        };
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