module.exports = {
    name: 'clear-queue',
    aliases: ['cq','clearqueue'],
    category: 'Music 🎶',
    utilisation: '{prefix}clear-queue',
    description: "request to clear queue.",


    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply({ content: `${client.emotes.off}| No music currently playing. ❌` });
        if (!queue.tracks[0]) return message.reply({ content: `${client.emotes.off}| There is already no music in queue after the current one ❌` });
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error}| You're not in a voice channel !`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error}| You are not in the same voice channel !`);
        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${client.emotes.error} | There is only one song in the queue.`);
        await queue.clear();

        message.channel.send({ content: `The queue has just been cleared. 🗑️` });
    },
};
