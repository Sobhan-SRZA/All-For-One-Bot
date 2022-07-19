module.exports = {
    name: 'debug',
    aliases: ['deb'],
    category: 'Infos 📊',
    utilisation: 'debug',
    description: 'shows bot voice channel.',

    execute(client, message) {
        message.channel.send(`${client.emotes.success} - ${client.user.username} connected in **${client.voice.connections.size}** channels !`);
    },
};