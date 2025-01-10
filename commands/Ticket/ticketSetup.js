module.exports = {
    name: "ticketsetup",
    cooldown: 5,
    aliases: ["tic", "tsetup", "setupt"],
    category: 'Ticket 🎫',
    utilisation: '{prefix}ticketsetup',
    description: "Setup ticket channel",

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        const { MessageButton, MessageActionRow } = require('discord-buttons');
        const Discord = require('discord.js');
        var prefix = await client.db.get(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = process.env.PREFIX;
        let logsChannel = message.guild.channels.cache.get(await client.db.get(`modlog_${message.guild.id}`));
        var ticketChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
        var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
        var title = message.content.split(' ').slice(3).join(' ') || 'Ticket Bot';
        if (!adminRole) {
            message.channel.send({
                embed: {
                    title: `❌ | Ekhtar Besorat Zir Setup Konid`,
                    description: `⚠ | Bedin Shekl: ${prefix}setup <Ticket Channel> <Admins Role> <Ticket Message Title>`,
                    color: 0xFF0000
                }
            })
            return
        }
        function epoch(date) {
            return Date.parse(date)
        }
        const dateToday = new Date();
        const TimeStampDate = epoch(dateToday) / 1000;
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.id + '|' + message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setTitle(`✅ | Ticket Set Shod`)
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter("Created By mr.sinre :)", `https://cdn.discordapp.com/avatars/865630940361785345/d0c85fbbdb0ee9f105336a041904e7d8.png?size=4096`)
            .addField(`Channele Ticket Set Shod: `, ticketChannel)
            .addField(`Tavasote : `, message.author)
            .addField(`Dar Tarikhe : `, `**<t:${TimeStampDate}:R>**`);

        logsChannel.send({ embed: embed });

        message.channel.send(`${message.author} Ticket Roye Channel Setup Shod ${ticketChannel}`).then(m => m.react(client.emotes.success)).then(message.react(client.emotes.setup));
        let btn = new MessageButton()
            .setStyle("green")
            .setLabel("Sakhtan Ticket")
            .setEmoji("🎟")
            .setID("createTicket")
        let row = new MessageActionRow()
            .addComponent(btn);
        ticketChannel.send({
            embed: {
                color: '#2F3136',
                description: 'Baraie Sakht Ticket Be Dokme Zir Click Konid🎟',
                title: title
            },
            component: row
        }).then(async function () {
            await client.db.set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
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