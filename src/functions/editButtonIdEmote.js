const { ButtonBuilder, ActionRowBuilder } = require("discord.js");
const error = require("./error");

/**
 * 
 * @param {import("discord.js").ButtonInteraction} interaction 
 * @param {string} id 
 * @param {string} emote 
 * @returns {Array<import("discord.js").ActionRow<import("discord.js").ButtonBuilder>>}
 */
module.exports = async function (interaction, id, emote) {
    try {
        const components = interaction.message.components.map(oldActionRow => {
            const updatedActionRow = new ActionRowBuilder();
            updatedActionRow.addComponents(oldActionRow.components.map(buttonComponent => {
                const newButton = ButtonBuilder.from(buttonComponent)
                if (interaction.component.customId == buttonComponent.customId) {
                    newButton.setCustomId(id).setEmoji(emote);
                }
                return newButton
            }));
            return updatedActionRow
        });
        return components;
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