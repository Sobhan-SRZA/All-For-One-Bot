"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("../../config"));
const discord_js_1 = require("discord.js");
class DiscordClient extends discord_js_1.Client {
    commands;
    cooldowns;
    config;
    db;
    constructor(options) {
        if (!options)
            options = {
                intents: [
                    "AutoModerationConfiguration",
                    "AutoModerationExecution",
                    "DirectMessagePolls",
                    "DirectMessageReactions",
                    "DirectMessageTyping",
                    "DirectMessages",
                    "GuildBans",
                    "GuildEmojisAndStickers",
                    "GuildInvites",
                    "GuildMembers",
                    "GuildMessagePolls",
                    "GuildMessageReactions",
                    "GuildMessageTyping",
                    "GuildMessages",
                    "GuildModeration",
                    "GuildScheduledEvents",
                    "GuildVoiceStates",
                    "GuildWebhooks",
                    "Guilds",
                    "MessageContent"
                ],
                partials: [
                    discord_js_1.Partials.Channel,
                    discord_js_1.Partials.GuildMember,
                    discord_js_1.Partials.GuildScheduledEvent,
                    discord_js_1.Partials.Message,
                    discord_js_1.Partials.Reaction,
                    discord_js_1.Partials.ThreadMember,
                    discord_js_1.Partials.User
                ],
                allowedMentions: {
                    repliedUser: true
                }
            };
        super(options);
        this.commands = new discord_js_1.Collection();
        this.cooldowns = new discord_js_1.Collection();
        this.config = config_1.default;
        this.token = this.config.discord.token;
        this.db = null;
    }
}
exports.default = DiscordClient;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=Client.js.map