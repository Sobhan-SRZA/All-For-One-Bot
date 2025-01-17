"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const error_1 = tslib_1.__importDefault(require("../../utils/error"));
const getAuthor_1 = tslib_1.__importDefault(require("../../utils/getAuthor"));
const Database_1 = tslib_1.__importDefault(require("../../classes/Database"));
const HexToNumber_1 = tslib_1.__importDefault(require("../../functions/HexToNumber"));
const embed_1 = tslib_1.__importDefault(require("../../storage/embed"));
const DatabaseTables_1 = require("../../classes/DatabaseTables");
const setup = {
    data: {
        name: "setup",
        description: "تنظیمات ربات در سرور.",
        type: discord_js_1.ApplicationCommandType.ChatInput,
        default_member_permissions: new discord_js_1.PermissionsBitField([
            discord_js_1.PermissionFlagsBits.SendMessages,
        ]),
        default_bot_permissions: new discord_js_1.PermissionsBitField([
            discord_js_1.PermissionFlagsBits.SendMessages,
            discord_js_1.PermissionFlagsBits.EmbedLinks
        ]),
        dm_permission: true,
        nsfw: false,
        options: [
            {
                name: "bot-channels",
                description: "چنلی که بات فقط در آنجا کار کند.",
                type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "white-list",
                        description: "چنلی که کامند های بات باید کار کند.",
                        type: discord_js_1.ApplicationCommandOptionType.Channel,
                        channel_types: [discord_js_1.ChannelType.GuildText]
                    },
                    {
                        name: "black-list",
                        description: "چنلی که کامند های بات نباید کار کند.",
                        type: discord_js_1.ApplicationCommandOptionType.Channel,
                        channel_types: [discord_js_1.ChannelType.GuildText]
                    },
                    {
                        name: "ephemeral",
                        description: "آیا می‌خواهید این پیام مخفی بماند؟",
                        type: discord_js_1.ApplicationCommandOptionType.String,
                        choices: [
                            {
                                name: "بله",
                                value: "true"
                            },
                            {
                                name: "خیر",
                                value: "false"
                            }
                        ],
                        required: false
                    }
                ]
            }
        ]
    },
    category: "admin",
    aliases: ["set", "st"],
    cooldown: 10,
    only_owner: false,
    only_slash: true,
    only_message: true,
    run: async (client, interaction, args) => {
        try {
            const user = (0, getAuthor_1.default)(interaction), db = new Database_1.default(client.db), Subcommand = interaction instanceof discord_js_1.CommandInteraction && interaction.options instanceof discord_js_1.CommandInteractionOptionResolver ? interaction.options.getSubcommand() : args[0];
            switch (Subcommand) {
                case "bot-channels": {
                    const whiteListChannel = interaction instanceof discord_js_1.CommandInteraction && interaction.options instanceof discord_js_1.CommandInteractionOptionResolver ? interaction.options.getChannel("white-list") : args[1], blackListChannel = interaction instanceof discord_js_1.CommandInteraction && interaction.options instanceof discord_js_1.CommandInteractionOptionResolver ? interaction.options.getChannel("black-list") : args[2], database = new DatabaseTables_1.BotChannels(), embed = new discord_js_1.EmbedBuilder()
                        .setAuthor({ name: "Admin Panel | bot-channels" })
                        .setColor((0, HexToNumber_1.default)(embed_1.default.color.theme));
                    if (!whiteListChannel && !blackListChannel) {
                        return;
                    }
                    if (whiteListChannel) { }
                    break;
                }
                default: {
                    break;
                }
            }
        }
        catch (e) {
            (0, error_1.default)(e);
        }
    }
};
exports.default = setup;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=setup.js.map