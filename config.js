module.exports = {
    emojis: {
        off: "❌",
        error: "⚠",
        queue: "📊",
        music: "🎶",
        success: "✔",
        report: "📞",
        setup: "📝",
        giveaway: "🎉",
        maske: "🎭",
    },
    webhook: {
        url: process.env.webhook_url || "",
        username: process.env.webhook_username || "",
        avatar: process.env.webhook_avatar || ""
    },
    discord: {
        token: process.env.token || "",
        prefix: process.env.prefix || "",
        invite: "https://discord.com/oauth2/authorize?client_id={clientId}&permissions=137775017040&scope=bot%20applications.commands",
        server_support: process.env.server_support || "https://discord.gg/P4XxUmebDa",
        support_server_id: process.env.support_server_id || "",
        status_channel_id: process.env.status_channel_id || "",
        report_channel_id: process.env.report_channel_id || ""
    },
    activity: [
        "Build by Sobhan-SRZA (mr.sinre)"
    ],
    type: [
        "WATCHING",
        "COMPETING"
    ], // COMPETING | WATCHING | LISTENING | PLAYING | CUSTOM_STATUS | STREAMING 
    presence: [
        "dnd",
        "idle",
        "online"
    ],
    owners: [
        "865630940361785345"
    ],
    vip_role: [
        "1204454699374346290"
    ],
    colors: {
        none: "#2F3136",
        red: "#ff4d4d",
        green: "#ddcc33",
        uptime: "#51ff23",
        purpledark: "#6a006a",
        purplemedium: "#a958a5",
        purplelight: "#c481fb",
        orange: "#ffa500",
        gold: "#daa520",
        reddark: "#8e2430",
        redlight: "#ff0000",
        bluedark: "#3b5998",
        cyan: "#5780cd",
        bluelight: "#ace9e7",
        aqua: "#33a1ee",
        pink: "#ff9dbb",
        greendark: "#2ac075",
        greenlight: "#a1ee33",
        white: "#f9f9f6",
        cream: "#ffdab9"
    },
    filters: [
        "8D",
        "gate",
        "haas",
        "phaser",
        "treble",
        "tremolo",
        "vibrato",
        "reverse",
        "karaoke",
        "flanger",
        "mcompand",
        "pulsator",
        "subboost",
        "bassboost",
        "vaporwave",
        "nightcore",
        "normalizer",
        "surrounding"
    ]
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */