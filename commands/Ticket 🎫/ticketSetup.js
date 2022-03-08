module.exports = {
    name: "ticketsetup",
    cooldown: 5,
    aliases: ["tic","tsetup","setupt"],
    category: 'Ticket 🎫',
    utilisation: '{prefix}ticketsetup',
    description: "Setup ticket channel",
  async execute(client, message, args) {
const { MessageButton, MessageActionRow } = require('discord-buttons');
        try {
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = process.env.PREFIX;
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
            message.react('📝');
            let btn = new MessageButton()
                .setStyle("green")
                .setLabel("Sakhtan Ticket")
                .setEmoji("🎟")
                .setID("createTicket")
            let row = new MessageActionRow()
                .addComponent(btn);
            ticketChannel.send({
                embed: {
                    color:'RANDOM',
                    description: 'Baraie Sakht Ticket Be Dokme Zir Click Konid🎟',
                    title: title
                },
                component: row
            }).then(async function() {
                require('quick.db').set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
            })
        } catch (err) {
            return;
        }
    
   }
  
}