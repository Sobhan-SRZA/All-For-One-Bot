const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojify',
    description: 'text to emoji converter',
    aliases: ['ef'],
    category: 'Fun 🎭',
    utilisation: '{prefix}ef',

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        //       message.channel.startTyping();
        if (!args.length) return message.reply('Please specify a text to convert')
        const specialCodes = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   '
        }
        const text = args.join(" ").toLowerCase().split('').map(letter => {
            if (/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            }
            return letter;
        }).join('');

        return message.channel.send(text)/*.then(embedMessage => { 
    message.channel.stopTyping();
   }) */
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