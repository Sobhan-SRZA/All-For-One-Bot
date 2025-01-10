module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            color: "#2F3136",
            author: { name: `Here are your search results for ${query}` },
            footer: { text: "Created By Mr.SIN RE#1528 :)", icon :`https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
},
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};