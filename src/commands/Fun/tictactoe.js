const {
    ApplicationCommandType,
    ApplicationCommandOptionType
} = require("discord.js");
const {
    TicTacToe
} = require('discord-gamecord');
const tictactoe = require("discord-tictactoe");
const error = require("../../functions/error");
module.exports = {
    name: "tictactoe",
    description: "بازی دوز دوز.",
    category: "fun",
    cooldown: 5,
    type: ApplicationCommandType.ChatInput,
    user_permissions: ["SendMessages"],
    bot_permissions: ["SendMessages", "EmbedLinks"],
    dm_permissions: false,
    only_owner: false,
    only_slash: true,
    only_message: false,
    options: [{
        name: "user",
        type: ApplicationCommandOptionType.User,
        description: "یک یوزر انتخاب کنید.",
        required: false
    }],

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").CommandInteraction} interaction 
     * @param {Array<string>} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        try {
            const user = interaction.options.getUser("user");
            if (user) {
                const Game = new TicTacToe({ message: interaction, isSlashGame: true, opponent: user });
                Game.startGame();
            } else {
                const Game = new tictactoe({ language: "en", commandOptionName: "rival" });
                Game.handleInteraction(interaction);
            }
        } catch (e) {
            error(e);
        }
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