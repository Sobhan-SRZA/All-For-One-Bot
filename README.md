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

## ♾ All For One Discord Bot Source

  <a href="https://dsc.gg/persian-caesar">
    <img align="right" src ="https://cdn.discordapp.com/icons/1054814674979409940/0f4df37209685530a9c8577578ca8e58.png?size=4096" width=25% >
  </a>
Hi there👋🏻

In this project, we built a discord bot that has all the features of other bots. 

This bot has features such as ticketing system, giveaway system, music system, backup system, social media alert system, moderation system, fun system, economy system, and it also has more features, but it was not mentioned because the text was too long.

To support the project, please promote it and give it a star⭐. 

this source bot writes with love and somuch works❤️‍🔥, so please give **star ⭐** to this project❤️

<details><summary> Some Images About The Bot📌 </summary>
soon📪
</details>

---

## 🍴 How Install

for setup your bot, you need put bot secret "Token" in `.env` file and replaced it with `BOT_TOKEN` after that for add bot prefix you need go again in and put your bot `prefix` in `.env` file then replaced it with `BOT_PREFIX` then for working your bot well you have to put bot client id in last file and replaced it with `BOT_CLIENT_ID` 
```js
token="PLACE_BOT_TOKEN"
prefix="PLACE_BOT_PREFIX"
clientId="USER_CLIENT_ID"
mongoURL="PLACE_MONGODB_DATABASE_URL"
```

if you need so much configuration about the bot you can go in to the `config.js` file and edit some parameters for customizing your bot.
```js
//an example code from "config/bot.js"
module.exports = {
  discord: {
    token: process.env.token,
    prefix: process.env.prefix,
    invite: `https://discord.com/oauth2/authorize?client_id=${process.env.clientId}&scope=bot+applications.commands&permissions=8`,
    server_support: "https://discord.gg/P4XxUmebDa",
    server_id: "1054814674979409940",
    server_channel_report: "1054814677806370927",
    server_channel_status: "1054814677806370928",
    server_channel_stats: "1128650802236497940",
    topgg: `https://top.gg/bot/${process.env.clientId}/vote`
  },
  //... etc
}

```

- if you didn't install source packages you need for install all packages open that👉🏻 `install.bat`

Packages  |  Version  |  Install
------------- | ------------- | -------------
[@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas) | Lastest ^0.1.41 | `npm install @napi-rs/canvas`
[mongoose](https://www.npmjs.com/package/mongoose) | Lastest ^7.1.1 | `npm install mongoose`
[axios](https://www.npmjs.com/package/axios) | Lastest ^1.3.5 | `npm install axios`
[quickmongo](https://www.npmjs.com/package/quickmongo) | Lastest ^5.2.0 | `npm install quickmongo`
[discord-html-transcripts](https://www.npmjs.com/package/discord-html-transcripts) | Lastest ^3.1.3 | `npm install discord-html-transcripts`
[quick.db](https://www.npmjs.com/package/quick.db)  | Latest ^9.1.6  | `npm install quick.db`
[cli-color](https://www.npmjs.com/package/cli-color) | Lastest ^2.0.2 | `npm install cli-color`
[discord.js](https://www.npmjs.com/package/discord.js) | Lastest ^14.11.0 | `npm install discord.js`
[cpu-stat](https://www.npmjs.com/package/cpu-stat) | Lastest ^2.0.1 | `npm install cpu-stat`
[dotenv](https://www.npmjs.com/package/dotenv) | Lastest ^16.0.1 | `npm install dotenv`
[express](https://www.npmjs.com/package/express) | Lastest ^4.18.1 | `npm install express`
[fs](https://www.npmjs.com/package/fs) | Lastest ^0.0.1-security | `npm install fs`
[moment](https://www.npmjs.com/package/moment) | Lastest ^2.29.4 | `npm install moment`



- if the source packages needs updates you can open that file for update there👉🏻 `update.bat`

- if you install packages and want run your source you have to open that👉🏻 `run.bat`

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

<details><summary> How install bot on our pc? </summary>

[Run bot on pc](https://github.com/Sobhan-SRZA/All-For-One-Bot/assets/90289153/24ca2e3d-845d-4e4e-8b17-b6e8485b9459)

</details>




---

# **📫 Contact me in :** &nbsp;

<p align="center">
  <a href="https://zil.ink/sobhan.srza">
    <img align="left" src ="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/main/source/social-media.png" width = 50% >
  </a>
  <a href="https://discord.gg/WMhke7BW7J">
    <img alt="Discord" src="https://img.shields.io/static/v1?message=Discord&logo=discord&label=&color=7289d9&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  <a href="https://t.me/pc_clubs">
    <img alt="Telegram" src="https://img.shields.io/static/v1?message=Telegram&logo=telegram&label=&color=229ED9&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  <a href="https://www.instagram.com/pc__clubs/">
    <img alt="Instagram" src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=C13584&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  </a>
  <a href="https://www.twitch.tv/sobhan_srza">
    <img alt="Twitch" src="https://img.shields.io/static/v1?message=Twitch&logo=twitch&label=&color=6441A4&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  <a href="https://b2n.ir/pc-club">
    <img alt="YouTube" src="https://img.shields.io/static/v1?message=YouTube&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
  <a href="https://github.com/Sobhan-SRZA">
    <img alt="Github" src="https://img.shields.io/static/v1?message=Github&logo=github&label=&color=000000&logoColor=white&labelColor=&style=flat" height="30" />
  </a>
</p>
<p align="right">
  <a href="https://discord.gg/P4XxUmebDa" target="_blank"> 
    <img src="https://discord.com/api/guilds/912596015075455016/widget.png?style=banner2" alt="sizar-team.png">
  </a>
</p>
<p align="center">
  <a href="https://discord.com/users/831934465609302056" target="_blank">
    <img alt="My Discord Account" src="https://discord.c99.nl/widget/theme-1/831934465609302056.png"  />
  </a>
</p>
