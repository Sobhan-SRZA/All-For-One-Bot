const ms = require('ms');
const {
    MessageEmbed
} = require("discord.js");
const {
    MessageButton,
    MessageActionRow
} = require('discord-buttons');
module.exports = {
    name: "gend",
    cooldown: 5,
    aliases: ["donorend", "giveend", "giveawayend"],
    category: 'Giveaway 🎁',
    utilisation: '{prefix}gend',
    description: "ending your giveaway.",

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        try {
            // If the member doesn't have enough permissions
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways") && !message.member.roles.cache.some((r) => r.name === "Donor")) {
                return message.channel.send(':x: You need to have the **"MANAGE_MESSAGES"** permissions to reroll giveaways.');
            }
            // If no message ID or giveaway name is specified
            if (!args[0]) {
                return message.channel.send(':x: You have to specify a valid message ID!');
            }
            // try to found the giveaway with prize then with ID
            let giveaway =
                // Search with giveaway prize
                client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                // Search with giveaway ID
                client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

            // If no giveaway was found
            if (!giveaway) {
                return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
            }

            // Edit the giveaway
            client.giveawaysManager.edit(giveaway.messageID, {
                setEndTimestamp: Date.now()
            })
                // Success message
                .then(() => {
                    // Success message
                    message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                        message.channel.send('This giveaway is already ended!');
                    } else {
                        console.error(e);
                        message.channel.send(`An error occured...\nDescription: ${e}`);
                    }
                });

        } catch (e) {
            function NeedHelpButtons() {
                const btn1 = new MessageButton()
                    .setStyle('url')
                    .setLabel('Invite Me')
                    .setEmoji('🤖')
                    .setURL(client.config.botInviteLink)

                const btn2 = new MessageButton()
                    .setStyle('url')
                    .setLabel('Support Server!')
                    .setEmoji('🧰')
                    .setURL(`${client.config.botServerSupportLink || "https://dsc.gg/persian-caesar"}`)

                const row = new MessageActionRow()
                    .addComponents(btn1, btn2)

                return row;
            }
            console.log(e)
            return message.channel.send(`${client.emotes.error} **| Error, ${e}**`).then(message.author.send(`Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${client.config.discord.server_support || "https://dsc.gg/persian-caesar"}`, { components: [NeedHelpButtons()] }));
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