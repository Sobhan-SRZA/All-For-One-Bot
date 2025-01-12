import CommandType from "../types/command";
import config from "../../config";
import { QuickDB } from "quick.db";
import { Client, ClientOptions, Collection, Partials } from "discord.js";

export default class DiscordClient extends Client {
    commands: Collection<string, CommandType>;
    cooldowns: Collection<string, Collection<string, number>>;
    config;
    db: QuickDB | null;
    constructor(options?: ClientOptions) {
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
                    Partials.Channel,
                    Partials.GuildMember,
                    Partials.GuildScheduledEvent,
                    Partials.Message,
                    Partials.Reaction,
                    Partials.ThreadMember,
                    Partials.User
                ],
                allowedMentions: {
                    repliedUser: true
                }
            };

        super(options);
        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.config = config;
        this.token = this.config.discord.token;
        this.db = null;
    }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */