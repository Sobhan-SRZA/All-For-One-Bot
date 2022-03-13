# Language: FA😼
## 📡آدرس های من در اینترنت
آدرس [توییچ](https://www.twitch.tv/sobhan_srza)
 
آدرس کانال [تلگرام من](https://t.me/SobhanSRZA)

آدرس [اینستگرام](https://www.instagram.com/srza._.gamer)
 
آدرس [آپارات](https://www.aparat.com/Sobhan.SRZA)

آدرس [یوتوب](https://b2n.ir/srza.-.gamer)

آدرس [دیسکورد](https://discord.gg/bNpqrdXNNn)

آدرس [یوتوب](https://b2n.ir/srza._.action)



# Language: EN🏈
## My addresses in cyberspace 👇🏼🙃📡


[Twich](https://www.twitch.tv/sobhan_srza) address
 
My [Telegram](https://t.me/SobhanSRZA) Channel Address

[Instegram](https://www.instagram.com/srza._.gamer) address
 
Address of the [Aparat](https://www.aparat.com/Sobhan.SRZA)

[YouTube](https://b2n.ir/srza.-.gamer) address

[Discord](https://discord.gg/bNpqrdXNNn)address

[YouTube](https://b2n.ir/srza._.action) address

# Music-bot
A complete code to download for a music bot. Using a module (discord-player) 🎧

Looking for a code for a music bot ? This fully open source code is made for your project !

If you need help with this project, to get support faster you can join the help server by just clicking [here](https://discord.gg/devsclub).

## ⚡ Installation
[![Deploy on Herokucd](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Sobhan-SRZA/Moderation-Bot/)

[![Use on Replit](https://repl.it/badge/github/Sobhan-SRZA/Moderation-Bot/)](https://repl.it/github/Sobhan-SRZA/Moderation-Bot/)

Well, let's start by downloading the code.
Go to the folder `config` then the file `bot.js`.
For the bot to be able to start, please complete the file with your credentials as follows :

- For emojis

```js
emojis: {
    off: '❌',
    error: '⚠',
    queue: '📊',
    music: '🎶',
    success: '✔',
    report: '📞',
}
```

- For configuration

```js
discord: {
   token: process.env.TOKEN,
   prefix: process.env.PREFIX,
   invite: `https://discord.com/api/oauth2/authorize?client_id=${process.env.USER_ID}&permissions=1644972474359&scope=bot%20applications.commands`,
   server_support: "Your-Server-Link",
}
```

- `token`, the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section.
- `prefix`, the prefix that will be set to use the bot.
- `activity`, the activity of the bot.

In the console, type `npm install` to install all dependencies.

- To start the bot :

```
#With Node
node index.js
npm start #Indicated in package.json

#With pm2
pm2 start index.js --name "MusicBot"
```

All you have to do is turn on your bot !

## 🎵 Music commands

```
play <name/URL> => play music in a voice channel.
search <name> => open a panel to choose a music and then play it.
pause => pause the current music.
resume => puts the current music back on.
queue => see the next songs.
clear-queue => remove music in the queue.
shuffle => to mix the queue.
nowplaying => see music in progress.
loop => to enable or disable the repeat function.
volume <1 - 100> => change the volume.
skip => skip to next music.
stop => stop all music.
filter <filter> => add / remove filter.
w-filters => see filters.
```

## 🧰 Help commands

```
help => see the list of available commands.
report => sent a report message of bot bugs to support.

```

## 💡 Information commands
```
uptime => see a time of bot online in discord.
invite => sent a bot invite link.
about => see some information about bot.
debug => see number of voice connections.
ping => see the bot latency.
```
## 🏓 Utilities (to change the code)

Find all the functions available on the official code [right here](https://github.com/Sobhan-SRZA/Moderation-Bot).

This is used with [discord.js](https://www.npmjs.com/package/discord.js) and [discord-player](https://www.npmjs.com/package/discord-player).


[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=Sobhan-SRZA&repo=Moderation-Bot&theme=dracula)](https://github.com/Sobhan-SRZA/Moderation-Bot/)

