<div align="center">
  <img src="https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/86180967-1d78-4267-8da0-6e01063bf9b6">
</div>

---

<div align="center">
    <img src="https://badges.aleen42.com/src/node.svg">
    <img src="https://img.shields.io/github/v/release/Sobhan-SRZA/All-For-One-Bot?label=Version">
    <div>
        <img src="https://img.shields.io/github/license/Sobhan-SRZA/All-For-One-Bot?label=License">
        <img src="https://img.shields.io/github/last-commit/Sobhan-SRZA/All-For-One-Bot?label=Last Commit">
        <img src="https://img.shields.io/github/release-date/Sobhan-SRZA/All-For-One-Bot?label=Last Release">
        <img src="https://img.shields.io/github/downloads/Sobhan-SRZA/All-For-One-Bot/total?label=Downloads">
    </div>
    <img src="https://img.shields.io/github/forks/Sobhan-SRZA/All-For-One-Bot?label=Forks">
    <img src="https://img.shields.io/github/stars/Sobhan-SRZA/All-For-One-Bot?label=Stars">
    <img src="https://img.shields.io/github/watchers/Sobhan-SRZA/All-For-One-Bot?label=Watchers">
    <img src="https://img.shields.io/github/languages/code-size/Sobhan-SRZA/All-For-One-Bot?label=Code Size">
    <img src="https://img.shields.io/github/directory-file-count/Sobhan-SRZA/All-For-One-Bot?label=Files">
    <div>
        <img style="display:block;margin-left:auto;margin-right:auto;width:30%;" src="https://github-readme-stats.vercel.app/api/pin/?username=Sobhan-SRZA&repo=All-For-One-Bot&theme=react">
    </div>
</div>

# ♾ All For One Discord Bot Source

  <a href="https://dsc.gg/persian-caesar">
    <img align="right" src ="https://cdn.discordapp.com/icons/1054814674979409940/0f4df37209685530a9c8577578ca8e58.png?size=4096" width=25% >
  </a>

## Overview

Hi there👋🏻

In this project, we built a discord bot that has all the features of other bots. 

This bot has features such as ticketing system, giveaway system, music system, backup system, social media alert system, moderation system, fun system, economy system, and it also has more features, but it was not mentioned because the text was too long.

To support the project, please promote it and give it a star⭐. 

this source bot writes with love and somuch works❤️‍🔥, so please give **star ⭐** to this project❤️

<details><summary> Some Images About The Bot📌 </summary>
  
![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/ab203f3a-8de8-40db-a243-e8af6afdda04)
  
![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/3f72802b-b64d-411b-a9ea-720c999be53c)

![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/69642dc5-e4dc-40f2-9e35-149370ba4884)

![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/723bab90-d245-4213-b8f7-632578f02c8b)

![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/2c62ab62-0fb7-4d57-be5e-2fda4323630c)

![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/c6ae11b8-abeb-4686-a04c-4b8087d9b5ee)

![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/2a9d4c3d-3d35-46e9-b9c7-a7649a71dba4)

![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/de07d7ad-5a58-4bf0-91a0-dc05c2c86596)

![Bot ScreenShots](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/ef892953-3cd3-4073-b8a2-072b02e26527)

</details>

---

## Features
- **Ticket System 🎫**
- **Music 🎶 (Actually it's broked because main package doesn't support it.)**
- **Giveaway System 🎁**
- **Fun Commands 🎈**
- **Moderating System ⚙**
- **VIP Commands 💎 (It's just nitro generating command also it's fake nitro.)**
- **Logs All Moderaton Staff in Channel 🪵**
- **Custom Prefix 🧀**
- **Commands For Only Bot Owners 👑 (Like change bot name or profile avatar thingy.)**
- **NSFW Commands 🔞 (Using free api)**
- **Information Commands 📫 (Like role, bot, user and server information.)**
- **Get Witch User You Want Avatar Image Or Banner Thingy 🍤**
- **⚠ Alert!! - This source code only works with `discord.js` version `12` so much features maybe doesn't work any more. - Don't worry new version of bot for `discord.js` version `14` as soon will be uploaded.**

---

## How Install

- If you need so much configuration about the bot you can go in to the `config.js` or `example.env` file and edit some parameters for customizing your bot.
- Alert !! - if you add your values in `example.env` file fastest you can rename it to `.env`. 

Preview of `example.env` file:
```shell
# Discord robot token and message commands prefix section.
token=""
prefix=""

# Discord webhook url for debug all error in embed message section.
webhook_url=""
webhook_username=""
webhook_avatar=""

# Discord server channels Id and main server Id section.
server_support=""
support_server_id=""
status_channel_id=""
report_channel_id=""
```

Preview of `config.js` file:
```js
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
}
```

A table to shows you what packages are used in this source code.

| Packages                                                             | Version         | Install                         |
| -------------------------------------------------------------------- | --------------- | ------------------------------- |
| [@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas)     | Version ^0.1.50 | `npm install @napi-rs/canvas`   |
| [akaneko](https://www.npmjs.com/package/akaneko)                     | Version ^5.3.0  | `npm install akaneko`           |
| [aki-api](https://www.npmjs.com/package/aki-api)                     | Version ^6.0.9  | `npm install aki-api`           |
| [axios](https://www.npmjs.com/package/axios)                         | Version ^1.6.7  | `npm install axios`             |
| [cli-color](https://www.npmjs.com/package/cli-color)                 | Version ^2.0.4  | `npm install cli-color`         |
| [cpu-stat](https://www.npmjs.com/package/cpu-stat)                   | Version ^2.0.1  | `npm install cpu-stat`          |
| [dateformat](https://www.npmjs.com/package/dateformat)               | Version ^5.0.3  | `npm install dateformat`        |
| [discord-buttons](https://www.npmjs.com/package/discord-buttons)     | Version ^4.0.0  | `npm install discord-buttons`   |
| [discord-giveaways](https://www.npmjs.com/package/discord-giveaways) | Version ^4.5.1  | `npm install discord-giveaways` |
| [discord-player](https://www.npmjs.com/package/discord-player)       | Version ^4.1.4  | `npm install discord-player`    |
| [discord.js](https://www.npmjs.com/package/discord.js)               | Version ^12.5.3 | `npm install discord.js`        |
| [dotenv](https://www.npmjs.com/package/dotenv)                       | Version ^16.4.5 | `npm install dotenv`            |
| [easy-games-js](https://www.npmjs.com/package/easy-games-js)         | Version ^1.2.1  | `npm install easy-games-js`     |
| [mathjs](https://www.npmjs.com/package/mathjs)                       | Version ^12.4.0 | `npm install mathjs`            |
| [moment](https://www.npmjs.com/package/moment)                       | Version ^2.30.1 | `npm install moment`            |
| [ms](https://www.npmjs.com/package/ms)                               | Version ^2.1.3  | `npm install ms`                |
| [nekos.life](https://www.npmjs.com/package/nekos.life)               | Version ^3.0.0  | `npm install nekos.life`        |
| [node-fetch](https://www.npmjs.com/package/node-fetch)               | Version ^3.3.2  | `npm install node-fetch`        |
| [novelcovid](https://www.npmjs.com/package/novelcovid)               | Version ^3.0.2  | `npm install novelcovid`        |
| [quick.db](https://www.npmjs.com/package/quick.db)                   | Latest ^9.1.7   | `npm install quick.db`          |
| [random-puppy](https://www.npmjs.com/package/random-puppy)           | Version ^1.1.0  | `npm install random-puppy`      |
| [rss-parser](https://www.npmjs.com/package/rss-parser)               | Version ^3.13.0 | `npm install rss-parser`        |
| [snakecord](https://www.npmjs.com/package/snakecord)                 | Version ^1.0.9  | `npm install snakecord`         |
| [superagent](https://www.npmjs.com/package/superagent)               | Version ^8.1.2  | `npm install superagent`        |
| [express](https://www.npmjs.com/package/express)                     | Version ^4.18.1 | `npm install express`           |

- For start the bot after putting all values in `.env` file or in `config.js` just open this file 👉🏻 `run.bat`.

- EZPZ your Music bot are installed and running around 🕺

<details><summary> How run bot in replit or heroco? </summary>
that was so easy, after you click that buttons👇🏻 you will create some project like this source with importing this source🎓 and after that with installing bot packages, and place bot some important objects run your bot.

<p align="center">

  <a href="https://heroku.com/deploy?template=https://github.com/Sobhan-SRZA/All-For-One-Bot/">
    <img align="center" alt="Deploy on Herokucd" src ="https://www.herokucdn.com/deploy/button.svg" >
  </a>

  <a href="https://glitch.com/edit/#!/import/github/Sobhan-SRZA/All-For-One-Bot/">
    <img align="center" alt="Remix on Glitch" src ="https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg" >
  </a>

  <a href="https://repl.it/github/Sobhan-SRZA/All-For-One-Bot/">
    <img align="center" alt="Use on Replit" src ="https://repl.it/badge/github/Sobhan-SRZA/All-For-One-Bot/" >
  </a>
</p>

</details>

---

## Contact

<div align="center">
  <a href="http://sobhan.epizy.com/" target="_blank">
    <img align="left" src ="https://github.com/Sobhan-SRZA/Sobhan-SRZA/raw/main/source/social-media.png" width = 50% >
  </a>
  <a href="https://t.me/pc_clubs" target="_blank">
    <img alt="Telegram" src="https://img.shields.io/static/v1?message=Telegram&logo=telegram&label=&color=229ED9&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  <a href="https://www.instagram.com/pc__clubs/" target="_blank">
    <img alt="Instagram" src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=C13584&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  </a>
  <a href="https://www.twitch.tv/sobhan_srza" target="_blank">
    <img alt="Twitch" src="https://img.shields.io/static/v1?message=Twitch&logo=twitch&label=&color=6441A4&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  <a href="https://www.youtube.com/@mr_sinre?app=desktop&sub_confirmation=1" target="_blank">
    <img alt="YouTube" src="https://img.shields.io/static/v1?message=YouTube&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  <a href="https://github.com/Sobhan-SRZA" target="_blank">
    <img alt="Github" src="https://img.shields.io/static/v1?message=Github&logo=github&label=&color=000000&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
</p>
<p align="left">
  <a href="https://discord.gg/P4XxUmebDa" target="_blank"> 
    <img src="https://discord.com/api/guilds/1054814674979409940/widget.png?style=banner2" alt="pc-development.png">
  </a>
</p>
<p align="right">
  <a href="https://discord.gg/54zDNTAymF" target="_blank"> 
    <img src="https://discord.com/api/guilds/1181764925874507836/widget.png?style=banner2" alt="pc-club.png">
  </a>
</p>
<p align="center">
  <a href="https://discord.com/users/865630940361785345" target="_blank">
    <img alt="My Discord Account" src="https://discord.c99.nl/widget/theme-1/865630940361785345.png"  />
  </a>
</p>
</div>
