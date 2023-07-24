const express = require('express');
const clc = require("cli-color");
const app = express();
const stringlength = 69;
module.exports = async (client) => {
  let port = client.config.source.port;
  app.use(express.static("public"));
  app.get("/", (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.sendFile(__dirname + "/app/index.html");
  });

  const listener = app.listen(port, () => {
    console.log("\n" +
      clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`) + `\n` +
      clc.yellowBright(`     ┃ ` + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃") + `\n` +
      clc.yellowBright(`     ┃ ` + clc.greenBright(`         /--/  24/7 KeepAlive Server is online!  /--/`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `         /--/  24/7 KeepAlive Server is online!  /--/`.length) + "┃") + `\n` +
      clc.yellowBright(`     ┃ ` + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃") + `\n` +
      clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`) + `\n`
    )
    console.log("\n" +
      clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`) + `\n` +
      clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃") + `\n` +
      clc.yellowBright(`     ┃ `) + clc.greenBright(`          Your app listening at ${clc.cyanBright("http://localhost:" + port || listener.address().port)}  `) + " ".repeat(-1 + stringlength - ` ┃ `.length - `            Your app listening at ${"http://localhost:" + port || listener.address().port}`.length) + clc.yellowBright("┃") + `\n` +
      clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃") + `\n` +
      clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`) + `\n`
    )
  });
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */