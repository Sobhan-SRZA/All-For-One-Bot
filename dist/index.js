"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
require("colors");
// Support .env args
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Load discord client
const Client_1 = tslib_1.__importDefault(require("./src/classes/Client"));
const error_1 = tslib_1.__importDefault(require("./src/utils/error"));
const post_1 = tslib_1.__importDefault(require("./src/functions/post"));
const fs_1 = require("fs");
const client = new Client_1.default(), handle = (0, fs_1.readdirSync)(__dirname + "/src/handlers").filter(file => file.endsWith(".js")), packageJSON = JSON.parse((0, fs_1.readFileSync)("./package.json", "utf8"));
// Login 
const main = async () => {
    try {
        // Load Handlers 
        let amount = 0;
        (0, post_1.default)("Welcome to ".cyan + (packageJSON.name).blue + "! | Version: ".cyan + (packageJSON.version).blue + "\n" +
            "Coded By ".cyan + ("Sobhan-SRZA").yellow + " & ".cyan + ("Persian Caesar").yellow + " With ".cyan + ("❤️").red + "\n" +
            `Discord: ${("Mr.Sinre").blue}` + " | ".cyan + `${("mr.sinre").blue}` + " | ".cyan + `${("https://dsc.gg/persian-caesar").blue}`, "W", "magenta", "cyan");
        (0, post_1.default)("Logging into the BOT...", "S");
        for (const file of handle) {
            const handlerFile = await Promise.resolve(`${`./src/handlers/${file}`}`).then(s => tslib_1.__importStar(require(s)));
            const handler = handlerFile.default || handlerFile;
            await handler(client);
            amount++;
        }
        (0, post_1.default)((String(amount)).cyan + " Handler Is Loaded!!".green, "S");
        if (client.token)
            await client
                .login(client.token)
                .catch(e => {
                (0, post_1.default)("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!!", "E", "red", "red");
                (0, error_1.default)(e);
            });
        else
            (0, post_1.default)("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!!", "E", "red", "red");
    }
    catch (e) {
        (0, error_1.default)(e);
        await client.destroy();
        process.exit(1);
    }
};
void main();
// Load Anti Crash
if (client.config.source.anti_crash) {
    process.on("unhandledRejection", (e) => (0, error_1.default)(e));
    process.on("rejectionHandled", (e) => (0, error_1.default)(e));
    process.on("uncaughtException", (e) => (0, error_1.default)(e));
    process.on("uncaughtExceptionMonitor", (e) => (0, error_1.default)(e));
}
// Export client
exports.default = client;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=index.js.map