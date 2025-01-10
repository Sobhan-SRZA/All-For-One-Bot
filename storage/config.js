require('dotenv').config()
module.exports = {
    source: {
        website : {
            support: process.env.SERVER_LINK,
            domain: "https://your-replit-link.repl.co"//you need get your repl.co link in replit with keepAlive code, then replace the link
        },   
        anti_crash: true,//turn on or off the antiCrash file
        keep_alive: true,//turn on or off the keepAlive file
        dashboard: false,//turn on or off the bot dashboard website
        port: 1528,//don't need to touch or changed
        callback: 'https://your-replit-link.repl.co/callback',//you need get your repl.co link in replit with keepAlive code, then replace the link right behind of /callback
        secret: process.env.USER_SECRET_ID,//bot secret id, you can get it in discord developer portal
        client_id: process.env.USER_ID,//bot client id, you can get it in discord server or in discord developer portal
    },
    emojis: {
        x:       '❌',
        success: '☑',
        info:    'ℹ',
        voice:   '🔊',
        mute:    '🔇',
        nsfw:    '🔞',
        rps:     '✂',
        image:   '🖼',
        game:    '🕹',
        eiball:  '🎱',
        animal:  '🐾',
        trash:   '🗑️',
        ticket:  '🎟️',
        open:    '🔓',
        close:   '🔒',
        rename:  '🖋',     
        help:    '🆘',   
        report:  '📞',
        setup:   '📝',
        rules:   '🧾',
        role:    '🗂',
        faq:     '⁉',
        channel:  '©',
        reason:  '📖',
        laugh:   '😅',
        laughing:'🤣',
        system:  '⚙',
        girl:    '👧🏻',
        boy:     '👦🏻',
        profile: '👩🏻‍🎨',
        money:   '💰',
        gender:  '🧬',
        job:     '💼',
        farmer:  '👨🏻‍🌾',
        solder:  '💂🏻‍♂️',
        hacker:  '👨🏻‍💻',
        worker:  '👷🏻‍♂️',
        student: '👨🏻‍🎓',
        fisher:  '🎣',
        officer: '👮🏻‍♂️',
        doctor:  '👨🏻‍⚕️',
        mechanic:'👨🏻‍🔧',
        minner:  '⛏',
        profile: '🧾',
        island:  '🏝',
        hamer:   '🛠',
        add:     '📩',
        plus:    '➕',
        hurt:    '💕',
        off:     '❌',
        reply:   '<:reply_desgine:950701730675445790>',
        error:   '⚠',
        end:     '🔚',
        alert:   '⏰',
        badage:  '📛',
        entry:   '⛔',
        queue:   '📊',
        music:   '🎶',
        tick:    '✅',
        giveaway:'🎉',
        confetti:'🎊',
        maske:   '🎭',
        afk:     '💤',
    },
    discord: {
        token: process.env.TOKEN,
        prefix: process.env.PREFIX,//bot prefix, it's customize you can changed it
        invite: `https://discord.com/oauth2/authorize?client_id=${process.env.USER_ID}&scope=bot+applications.commands+identify+guilds+applications.commands.permissions.update&response_type=code&permissions=2080374975`,
        server_support: process.env.SERVER_LINK,
        server_id: process.env.SERVER_ID,
        server_channel_report: process.env.REPORT_CHANNEL,
        server_channel_status: process.env.STATUS_CHANNEL,      
    },
    status: {
        text: "{prefix}help | ChocolateBoy by Mr.SIN RE#1528 | https://dsc.gg/sizar-team",
        type: "CUSTOM",
        url: "https://www.twitch.tv/sobhan_srza",
        presence: "dnd"
    },  
    vip_role: [
        '', 
        ''
    ],
    filters: [
        '8D', 
        'gate', 
        'haas', 
        'phaser', 
        'treble', 
        'tremolo', 
        'vibrato', 
        'reverse', 
        'karaoke', 
        'flanger', 
        'mcompand', 
        'pulsator', 
        'subboost', 
        'bassboost', 
        'vaporwave', 
        'nightcore', 
        'normalizer', 
        'surrounding'
    ],
    owner: [
        '831934465609302056', 
        '', 
        ''
    ],
    opt: {
        DJ: {
            enabled: false,//IF YOU WANT ONLY DJS TO USE IT, set false to true.
        },
        selfDeaf: false,//IF YOU WANT TO DEAF THE BOT, set false to true.
        maxVol: 100, //You can specify the maximum volume level.
        loopMessage: false,//don't need to touch or changed
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',//don't need to touch or changed
                highWaterMark: 1 << 25,//don't need to touch or changed
            }
        }
    },
    colors: {
      none:        "#2F3136",
      red:         "#ff4d4d",
      green:       "#ddcc33",
      uptime:      "#51ff23",
      brown:       "#d2691e",
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
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
