const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    category: 'Music 🎶',
    description: "Show now playing song.",

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

 if (!queue || !queue.playing) return message.reply({ content: `${message.author}, There is no music currently playing!. ❌` });

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        embed.setDescription(`Audio **%${queue.volume}**\nDuration **${trackDuration}**\nURL: ${track.url}\nLoop Mode **${methods[queue.repeatMode]}**\n${track. requestedBy}`);

        embed.setTimestamp();
        embed.setFooter({ text: 'by Umut Bayraktar ❤️', iconURL: message.author.avatarURL({ dynamic: true }) });

        const row = new MessageActionRow().addComponents(
            new MessageButton().setLabel('Save Song').setCustomId('saveTrack').setStyle('SUCCESS')
        );

        message.channel.send({ embeds: [embed], components: [row] });
    },
};
