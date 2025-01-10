const express = require('express');
var clc = require("cli-color");
const app = express();
const port = 3000 || 8080 || 5000;
const stringlength = 69;
app.all('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<html><head> <link href="https://fonts.googleapis.com/css?famiy=Roboto Condensed" rel="stylesheet"> <style>body{font-family: "Roboto Condensed"; font-size: 21px; color: white; background-color: #23272A; margin-left: 5%; margin-top: 2%;}a{color: #5865F2}a:hover{color: #818bff}h1{font-size: 48px;}</style></head><body> <h1>Hosting Active</h1> </p></a><i>Make sure to add the repl.co URL to <a href="https://uptimerobot.com/">UPTIME ROBOT</a> to make Bot 24/7 Online!</i></p> <img height="40" src="https://cdn.discordapp.com/icons/912596015075455016/a_ff5fd78a119d467fbfb89e031f9bb521.gif?size=4096" ><h1>SIZAR Team</h1> <b><a href=https://dsc.gg/sizar-team>Discord Server</a> 😎 |  <a href="https://www.fridaybot.ml">Website</a></b><br/><br/💖 ahref="https://dsc.gg/sizar-team"> <img  height="150" src="https://cdn.discordapp.com/avatars/831934465609302056/310ac40de05a64804fbe7ccfee06e235.png?size=4096"> </a><br/><br/>SUPPORT ME AND MILANIO DEVELOPMENT</a></p></a>You can always Support me by inviting one of my own Discord Bots</p></a><a href="https://dsc.gg/sizar-team"> SIZAR Team </a> | <a href="https://dsc.gg/srza._.gamer"> S.R.Z.A Gamer</a> <head><html>`);
  res.end();
});

function host() {
  app.listen(port, () =>{
    console.log("\n"+
    clc.greenBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`) + `\n` +
    clc.greenBright(`     ┃ ` + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃") + `\n` +
    clc.greenBright(`     ┃ ` + clc.yellowBright(`         /--/  24/7 KeepAlive Server is online!  /--/`) + " ".repeat(-1+stringlength-` ┃ `.length-`         /--/  24/7 KeepAlive Server is online!  /--/`.length)+ "┃") + `\n` +
    clc.greenBright(`     ┃ ` + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃") + `\n` +
    clc.greenBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`) 
    )
    console.log("\n"+
    clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`) + `\n` +
    clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃") + `\n` +
    clc.yellowBright(`     ┃ `) + clc.green(`          Your app listening at ${clc.cyanBright("http://localhost:"+port)}  `) + " ".repeat(-1 + stringlength - ` ┃ `.length - `            Your app listening at http://localhost:${port}`.length) + clc.yellowBright("┃") + `\n` +
    clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃") + `\n` +
    clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`) + `\n`
    )
  });
}
module.exports = host;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/