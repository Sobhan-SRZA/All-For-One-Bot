/**
 * @license
  BSD 3-Clause License

  Copyright (c) 2024, the respective contributors, as shown by Persian Caesar and Sobhan.SRZA (mr.sinre) file.

  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

  * Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// Add color to console messages.
import "colors";

// Support .env args
import { config } from "dotenv";
config();

// Load discord client
import DiscordClient from "./src/classes/Client";
import error from "./src/utils/error";
import post from "./src/functions/post";
import { readdirSync, readFileSync } from "fs";

const
    client = new DiscordClient(),
    handle = readdirSync(__dirname + "/src/handlers").filter(file => file.endsWith(".js")),
    packageJSON: { name: string; version: string; } = JSON.parse(readFileSync("./package.json", "utf8"));

// Load Handlers 
let amount = 0;
post(
    "Welcome to ".cyan + (packageJSON.name).blue + "! | Version: ".cyan + (packageJSON.version).blue + "\n" +
    "Coded By ".cyan + ("Sobhan-SRZA").yellow + " & ".cyan + ("Persian Caesar").yellow + " With ".cyan + ("❤️").red + "\n" +
    `Discord: ${("Mr.Sinre").blue}` + " | ".cyan + `${("mr.sinre").blue}` + " | ".cyan + `${("https://dsc.gg/persian-caesar").blue}`,
    "W",
    "magenta",
    "cyan"
);
post("Logging into the BOT...", "S");
(async () => {
    for (const file of handle) {
        const handlerFile = await import(`./src/handlers/${file}`);
        const handler = handlerFile.default || handlerFile;
        await handler(client);
        amount++;
    }
    post((String(amount)).cyan + " Handler Is Loaded!!".green, "S");
})();

// Login 
if (client.token)
    client
        .login(client.token)
        .catch(e => {
            post("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!!", "E", "red", "red");
            error(e);
        });

else
    post("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!!", "E", "red", "red");

// Load Anti Crash
if (client.config.source.anti_crash) {
    process.on("unhandledRejection", (e: any) => error(e));
    process.on("rejectionHandled", (e: any) => error(e));
    process.on("uncaughtException", (e: any) => error(e));
    process.on("uncaughtExceptionMonitor", (e: any) => error(e));
}

// Export client
export default client;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */