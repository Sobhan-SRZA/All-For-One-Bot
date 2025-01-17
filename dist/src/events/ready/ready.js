"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Database_1 = tslib_1.__importDefault(require("../../classes/Database"));
const post_1 = tslib_1.__importDefault(require("../../functions/post"));
const error_1 = tslib_1.__importDefault(require("../../utils/error"));
const chooseRandom_1 = tslib_1.__importDefault(require("../../functions/chooseRandom"));
const replaceValues_1 = tslib_1.__importDefault(require("../../functions/replaceValues"));
const logger_1 = tslib_1.__importDefault(require("../../functions/logger"));
const os_1 = tslib_1.__importDefault(require("os"));
const firstUpperCase_1 = tslib_1.__importDefault(require("../../functions/firstUpperCase"));
const discord_js_1 = require("discord.js");
exports.default = async (client) => {
    try {
        // Load Slash Commands
        const commands = client.commands
            .filter(a => a.only_slash)
            .map(a => a.data), rest = new discord_js_1.REST()
            .setToken(client.config.discord.token), db = new Database_1.default(client.db);
        // Start to upload all commands to api
        let data;
        (0, post_1.default)("Updating " + String(commands.length).cyan + " (/) command.".green, "S");
        // Create commands
        data = await rest.put(discord_js_1.Routes.applicationCommands(client.user.id), {
            body: commands
        });
        (0, post_1.default)(String(data.length).cyan + " (/) command successfully reloaded.".green, "S");
        // Change Bot Status
        setInterval(async function () {
            if (client.config.discord.status.activity.length < 1)
                return;
            const Presence = (0, chooseRandom_1.default)(client.config.discord.status.presence || ["online"]), Activity = (0, chooseRandom_1.default)(client.config.discord.status.activity), Type = (0, firstUpperCase_1.default)(String((0, chooseRandom_1.default)(client.config.discord.status.type || ["Custom"])).toLowerCase()), stateName = (0, replaceValues_1.default)(Activity, {
                username: client.user.displayName.toLocaleString(),
                servers: client.guilds.cache.size.toLocaleString(),
                members: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
                prefix: client.config.discord.prefix,
                usedCommands: (await db.get("totalCommandsUsed") || 0).toLocaleString()
            });
            client.user.setPresence({
                status: Presence,
                activities: [
                    {
                        type: discord_js_1.ActivityType[Type],
                        name: stateName,
                        state: Type === "Custom" ? stateName : ""
                    }
                ]
            });
        }, 30000);
        (0, post_1.default)("Discord bot is online!".blue + `\n` +
            client.user.tag.cyan + " is now online :)".green, "S");
        (0, logger_1.default)("Working Guilds: ".blue +
            `${client.guilds.cache.size.toLocaleString()} Servers`.cyan + `\n` +
            "Watching Members: ".blue +
            `${client.guilds.cache
                .reduce((a, b) => a + b.memberCount, 0)
                .toLocaleString()} Members`.cyan
            + `\n` +
            "Commands: ".blue +
            `slashCommands[${commands.length}] & messageCommands[${client.commands.filter(a => a.only_message).size}]`.cyan + `\n` +
            "Discord.js: ".blue +
            `v${discord_js_1.version}`.cyan + `\n` +
            "Node.js: ".blue +
            `${process.version}`.cyan + `\n` +
            "Plattform: ".blue +
            `${process.platform} ${process.arch} | ${os_1.default.cpus().map((i) => `${i.model}`)[0]} | ${String(os_1.default.loadavg()[0])}%`.cyan + `\n` +
            "Memory: ".blue +
            `${Math.round(+((os_1.default.totalmem() - os_1.default.freemem()) / 1024 / 1024).toFixed(2))
                .toLocaleString()}/${Math.round(+((os_1.default.totalmem()) / 1024 / 1024).toFixed(2))
                .toLocaleString()} MB | ${(((os_1.default.totalmem() - os_1.default.freemem()) / os_1.default.totalmem()) * 100)
                .toFixed(2)}%`.cyan);
        // Add Slash Commands Id to Commands
        client.commands.forEach(async (command) => {
            const cmd = client.commands.get(command.data.name), slashCommand = (await client.application.commands.fetch({ cache: true }))
                .find(a => a.name === command.data.name);
            return await client.commands.set(cmd.data.name, {
                ...cmd,
                data: {
                    ...cmd.data,
                    id: slashCommand.id
                }
            });
        });
    }
    catch (e) {
        (0, error_1.default)(e);
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
//# sourceMappingURL=ready.js.map