"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const error_1 = tslib_1.__importDefault(require("../../utils/error"));
const response_1 = tslib_1.__importDefault(require("../../utils/response"));
const getAuthor_1 = tslib_1.__importDefault(require("../../utils/getAuthor"));
const command = {
    data: {
        name: "help",
        description: "لیست دستورات بات.",
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
    },
    category: "member",
    aliases: ["h", "commands"],
    cooldown: 10,
    only_owner: false,
    only_slash: true,
    only_message: true,
    run: async (client, interaction, args) => {
        try {
            const user = (0, getAuthor_1.default)(interaction), embed = new discord_js_1.EmbedBuilder()
                .setAuthor({
                name: `${client.user.username} Help`
            })
                .setFooter({
                text: `درخواست شده توسط ${user.tag}`,
                iconURL: user.displayAvatarURL({ forceStatic: true })
            })
                .setColor("Blue")
                .setDescription(`## Admin's Commands List:\n${cmds_info_list_str(client, "admin", client.config.discord.prefix)}\n\n## Member's Commands List:\n${cmds_info_list_str(client, "member", client.config.discord.prefix)}`)
                .setThumbnail(client.user.displayAvatarURL({ forceStatic: true }));
            await (0, response_1.default)(interaction, {
                embeds: [embed]
            });
            return;
            // Functions
            function cmds_info_list_str(client, category_name, prefix) {
                let description = "";
                client.commands
                    .filter(c => c.category === category_name)
                    .forEach((cmd) => {
                    if (cmd.only_slash && cmd.data.options && cmd.data.options.some(op => op.type === 1)) {
                        const name = [];
                        if (cmd.data.options && cmd.data.options.some(op => op.type === 1))
                            cmd.data.options.forEach((option) => {
                                name.push({ name: cmd.data.name + " " + option.name, description: option.description });
                            });
                        else
                            name.push({ name: cmd.data.name, description: cmd.data.description });
                        name.forEach(element => {
                            description += `\n\n**${cmd.only_slash ?
                                `</${element.name}:${cmd.data.id}>` : ""}${cmd.only_message ?
                                `${prefix}${element.name} ${cmd.usage ? cmd.usage : ""}` : ""}\nDescription: \`${element.description}\`**`;
                        });
                    }
                    else
                        description += `\n\n**${cmd.only_slash ?
                            `</${cmd.data.name}:${cmd.data.id}>` : ""}${cmd.only_slash && cmd.only_message ? " | " : ""}${cmd.only_message ?
                            `${prefix}${cmd.data.name} ${cmd.usage ? cmd.usage : ""}` : ""}${cmd.aliases && cmd.aliases.length > 0 ?
                            `\nAliases: [${cmd.aliases.map(a => `\`${a}\``).join(", ")}]` : ""}\nDescription: \`${cmd.data.description}\`**`;
                });
                return description;
            }
        }
        catch (e) {
            (0, error_1.default)(e);
        }
    }
};
exports.default = command;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=help.js.map