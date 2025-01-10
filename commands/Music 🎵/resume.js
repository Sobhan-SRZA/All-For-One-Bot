module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    category: 'Music 🎶',
    description: "request to clear queue.",

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({ content:`${message.author}, There is no music currently playing!. ❌` });

        const success = queue.setPaused(false);

        return message.channel.send({ content: success ? `**${queue.current.title}**, The song continues to play. ✅` : `${message.author}, Something went wrong. ❌` });
    },
};
