"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkCmdPerms;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const error_1 = tslib_1.__importDefault(require("./error"));
async function checkCmdPerms(interaction, command, prefix = null, args = null) {
    try {
        const mentionCommand = prefix
            ? `\`${prefix + command.data.name}${command.data.options?.some((a) => a.type === 1 && a.name === args?.[0])
                ? ` ${command.data.options.find((a) => a.name === args[0]).name}`
                : ""}\``
            : `</${command.data.name}${interaction instanceof discord_js_1.CommandInteraction && interaction.options?.data.some((a) => a.type === 1)
                ? ` ${interaction.options.data.find((a) => a.type === 1).name}`
                : ""}:${command.data.id}>`;
        const channel = interaction.channel;
        if (channel && channel.isTextBased() && channel instanceof discord_js_1.GuildChannel) {
            if (!channel
                .permissionsFor(interaction.client.user)
                ?.has(command.data.default_bot_permissions ?? [])) {
                if (interaction instanceof discord_js_1.CommandInteraction && !interaction.replied)
                    await interaction.reply({
                        flags: discord_js_1.MessageFlags.Ephemeral,
                        embeds: [
                            new discord_js_1.EmbedBuilder()
                                .setDescription(`ربات که من باشم دسترسی لازم برای ران کردن کامند ${mentionCommand} رو ندارم!!\nدسترسی های لازم: [${new discord_js_1.PermissionsBitField(command.data.default_bot_permissions)
                                .toArray()
                                .map((a) => `"${a}"`)
                                .join(", ")}]`)
                                .setColor("Orange")
                        ],
                    });
                else
                    await interaction.reply({
                        embeds: [
                            new discord_js_1.EmbedBuilder()
                                .setDescription(`ربات که من باشم دسترسی لازم برای ران کردن کامند ${mentionCommand} رو ندارم!!\nدسترسی های لازم: [${new discord_js_1.PermissionsBitField(command.data.default_bot_permissions)
                                .toArray()
                                .map((a) => `"${a}"`)
                                .join(", ")}]`)
                                .setColor("Orange")
                        ],
                    });
                return true;
            }
        }
        const member = interaction.member;
        if (member && member instanceof discord_js_1.GuildMember) {
            if (!member?.permissions.has(command.data.default_member_permissions ?? [])) {
                if (interaction instanceof discord_js_1.CommandInteraction && !interaction.replied)
                    await interaction.reply({
                        flags: discord_js_1.MessageFlags.Ephemeral,
                        embeds: [
                            new discord_js_1.EmbedBuilder()
                                .setDescription(`ببین پسر خوب تو دسترسی های لازم برای استفاده از کامند ${mentionCommand} رو نداری!!\nدسترسی های لازم: [${new discord_js_1.PermissionsBitField(command.data.default_member_permissions)
                                .toArray()
                                .map(a => `"${a}"`)
                                .join(", ")}]`)
                                .setColor("Orange")
                        ]
                    });
                else
                    await interaction.reply({
                        embeds: [
                            new discord_js_1.EmbedBuilder()
                                .setDescription(`ببین پسر خوب تو دسترسی های لازم برای استفاده از کامند ${mentionCommand} رو نداری!!\nدسترسی های لازم: [${new discord_js_1.PermissionsBitField(command.data.default_member_permissions)
                                .toArray()
                                .map(a => `"${a}"`)
                                .join(", ")}]`)
                                .setColor("Orange")
                        ]
                    });
                return true;
            }
            ;
        }
        return false;
    }
    catch (e) {
        (0, error_1.default)(e);
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
//# sourceMappingURL=checkCmdPerms.js.map