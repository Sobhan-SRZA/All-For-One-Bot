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
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */