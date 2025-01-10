const {
    GiveawaysManager
} = require('discord-giveaways');
module.exports = async (client) => {
    const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager { };
    const manager = new GiveawayManagerWithOwnDatabase(client, {
        default: {
            storage: "./giveaways.json",
            botsCanWin: false,
            embedColor: '#FFD700',
            embedColorEnd: '#FF0000',
            reaction: `${client.emotes.giveaway}`
        }
    });
    client.giveawaysManager = manager;
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