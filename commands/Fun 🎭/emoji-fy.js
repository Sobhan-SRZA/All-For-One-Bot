const { Client, Message, MessageEmbed } = require('discord.js');
  
module.exports = {
    name: 'emojify',
    description: 'text to emoji converter',
    aliases: ['ef'],
    category: 'Fun 🎭',
    utilisation: '{prefix}ef',

    execute(client, message, args) {
       //       message.channel.startTyping();
        if(!args.length) return message.reply('Please specify a text to convert <:no:901355181831254047>')
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
            if(/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            }
            return letter;
        }).join('');

     return   message.channel.send(text)/*.then(embedMessage => { 
    message.channel.stopTyping();
   }) */
    }
}