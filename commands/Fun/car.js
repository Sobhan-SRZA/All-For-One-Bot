module.exports = {
    name: 'car',
    aliases: ['mashin'],
    category: 'Fun 🎭',
    utilisation: '{prefix}car',
    description: 'Sends random car images',

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        const superagent = require('axios')
        const { MessageEmbed } = require('discord.js')

        superagent.get('https://api.popcat.xyz/car')

            .then((res) => {
                let embed = new MessageEmbed()
                    .setTitle(":red_car: Vroom...")
                    .setURL(res.data.image)
                    .setImage(`${res.data.image}`)
                    .setColor("RANDOM")
                message.channel.send(embed)
            })
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