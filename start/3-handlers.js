const fs = require('fs');
var clc = require("cli-color");
module.exports = async (client) => {
//======== Loading Handlers =========
var FilesLength = new Map();
var Files = [ "extra_events.js", "nickname_changer.js", "youtube_video_alarm.js", /*"twitch_live_news.js",*/ "rank_system.js", "counter.js", /*"join_to_create.js"*/, "chatbot.js", "giveaway_events.js", "slash_command_handler.js", client.config.source.keep_alive ?  "keep_alive.js" : null , client.config.source.anti_crash ? "anti_crash.js" : null ];
Files
  .filter(Boolean)
  .forEach((handler) => {
    require(`./../handlers/${handler}`)(client);
    FilesLength.set(handler);
});  
try {
    const stringlength = 69;
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(FilesLength.size)} Handlers Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${FilesLength.size} Handlers Is Loaded!!`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */