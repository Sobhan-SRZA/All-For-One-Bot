module.exports = {
    emojis: {
        off: '❌',
        error: '⚠',
        queue: '📊',
        music: '🎶',
        success: '✔',
        report: '📞',
    },

    discord: {
        token: process.env.TOKEN,
        prefix: process.env.PREFIX,
        invite: `https://discord.com/api/oauth2/authorize?client_id=${process.env.USER_ID}&permissions=1644972474359&scope=bot%20applications.commands`,
        server_support: "https://discord.gg/5GYNec4urW",
    },

    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
};
