module.exports = {
    name: 'stop',
    aliases: ['st'],
    utilisation: '{prefix}stop',
    category: 'Music 🎶',
    description: "request to clear queue.",

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, There is no music currently playing!. ❌` });

        queue.destroy();

        message.channel.send({ content: `The music playing on this server has been turned off, see you next time ✅` });
    },
};
