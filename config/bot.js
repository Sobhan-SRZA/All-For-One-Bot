require('dotenv').config()
module.exports = {
    discord: {
        token: process.env.TOKEN,
        prefix: process.env.PREFIX,
        invite: `https://discord.com/oauth2/authorize?client_id=${process.env.USER_ID}&permissions=137775017040&scope=bot%20applications.commands`,
        server_support: process.env.SERVER_LINK,
        server_id: process.env.SERVER_ID,
        server_channel_report: process.env.REPORT_CHANNEL,
        server_channel_status: process.env.STATUS_CHANNEL,        
    },
    status: {
        text: "{prefix}help | ChocolateBoy by Mr.SIN RE#1528 | .gg/rsQGcSfyJs",
        type: "CUSTOM_STATUS",
        url: "https://www.twitch.tv/sobhan_srza",
        presence: "dnd"
    },  
    vip_role: ['', ''],
    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
    owner:  ['831934465609302056', '', ''],
    emojis: {
        off:     '❌',
        error:   '⚠',
        alert:   '⏰',
        badage:  '📛',
        entry:   '⛔',
        queue:   '📊',
        music:   '🎶',
        success: '✔',
        tick:    '✅',
        report:  '📞',
        setup:   '📝',
        reason:  '📖',
        giveaway:'🎉',
        confetti:'🎊',
        maske:   '🎭',
    },
    opt: {
        DJ: {
            enabled: false, //IF YOU WANT ONLY DJS TO USE IT, set false to true.
        },
        selfDeaf: false, //IF YOU WANT TO DEAF THE BOT, set false to true.
        maxVol: 100, //You can specify the maximum volume level.
        loopMessage: false, //Please don't touch
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', //Please don't touch
                highWaterMark: 1 << 25 //Please don't touch
            }
        }
    },
    colors: {
      none:        "#2F3136",
      red:         "#ff4d4d",
      green:       "#ddcc33",
      uptime:      "#51ff23",
      purpledark:  "#6a006a",
      purplemedium:"#a958a5",
      purplelight: "#c481fb",
      orange:      "#ffa500",
      gold:        "#daa520",
      reddark:     "#8e2430",
      redlight:    "#ff0000",
      bluedark:    "#3b5998",
      cyan:        "#5780cd",
      bluelight:   "#ace9e7",
      aqua:        "#33a1ee",
      pink:        "#ff9dbb",
      greendark:   "#2ac075",
      greenlight:  "#a1ee33",
      white:       "#f9f9f6",
      cream:       "#ffdab9",
    }
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