const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    category: 'Music 🎶',
    description: "request to clear queue.",

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({ content: `${message.author}, There is no music currently playing!. ❌` });

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.reply({ content: `This song is live streaming, no duration data to display. 🎧` });

        const saveButton = new MessageButton();

        saveButton.setLabel('Update');
        saveButton.setCustomId('time');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(queue.current.title)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`${progress} (**${timestamp.progress}**%)`)
        .setFooter({ text: 'Music Bot Commands - by Umut Bayraktar ❤️', iconURL: message.author.displayAvatarURL({ dynamic: true }) });
        message.channel.send({ embeds: [embed], components: [row] });
    },
};
