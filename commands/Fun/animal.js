module.exports = {
    name: 'animal',
    description: 'ferestadane aks heivanat',
    aliases: ['heivan'],
    category: 'Fun 🎭',
    utilisation: '{prefix}animal',

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        const Discord = require('discord.js');
        let animals = [`panda`, `fox`, `dog`, `cat`, `red_panda`, `koala`, `bird`, `raccoon`, `kangaroo`, `whale`]
        const answer = args.join(" ")
        if (!answer) {
            const blank = new Discord.MessageEmbed()
                .setColor(client.colors.none)
                .setTitle('Commnad Haie Animal!')
                .setDescription('Baraie Estefade Kardan Az Command Ha Matn Zir Ra Negah Konid.')
                .addField('Command Haie Animal:', `**${animals.map(a => `\`${a}\``).join(', ')}**`, true)
                .setTimestamp()
                .setFooter('animal command |');

            message.channel.send(blank)
        }
        if (animals.includes(answer)) {
            const fetch = require('axios')
            fetch.get(`https://some-random-api.ml/img/${answer}`)
                .then(res => {
                    let embed = new Discord.MessageEmbed()
                        .setColor(client.colors.none)
                        .setTitle(`Image of ${answer}`)
                        .setImage(res.data.link)
                        .setURL(res.data.link)
                        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                });
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