"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkCmdCooldown;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const index_1 = tslib_1.__importDefault(require("../../index"));
const error_1 = tslib_1.__importDefault(require("./error"));
async function checkCmdCooldown(interaction, command, prefix = null, args = null) {
    try {
        const userId = (interaction instanceof discord_js_1.CommandInteraction ? interaction.user.id : interaction.author?.id), mentionCommand = prefix
            ? `\`${prefix + command.data.name}${command.data.options?.some((a) => a.type === 1 && a.name === args?.[0])
                ? ` ${command.data.options.find((a) => a.name === args[0]).name}`
                : ""}\``
            : `</${command.data.name}${interaction instanceof discord_js_1.CommandInteraction && interaction.options?.data.some((a) => a.type === 1)
                ? ` ${interaction.options.data.find((a) => a.type === 1).name}`
                : ""}:${command.data.id}>`;
        if (!index_1.default.cooldowns.has(command.data.name))
            index_1.default.cooldowns.set(command.data.name, new discord_js_1.Collection());
        const timestamps = index_1.default.cooldowns.get(command.data.name), defaultCooldownDuration = 3, cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
        if (timestamps.has(userId)) {
            const expirationTime = timestamps.get(userId) + cooldownAmount;
            if (Date.now() < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                if (interaction instanceof discord_js_1.CommandInteraction && !interaction.replied)
                    await interaction.reply({
                        flags: discord_js_1.MessageFlags.Ephemeral,
                        embeds: [
                            new discord_js_1.EmbedBuilder()
                                .setDescription(`**-# به دلیل استفاده بیش از حد، شما موقتا از دستور ${mentionCommand} محروم شده‌اید. دوباره پس از <t:${expiredTimestamp}:R> می‌توانید از آن استفاده کنید.**`)
                                .setColor("Orange")
                        ],
                    });
                else
                    await interaction.reply({
                        embeds: [
                            new discord_js_1.EmbedBuilder()
                                .setDescription(`**-# به دلیل استفاده بیش از حد، شما موقتا از دستور ${mentionCommand} محروم شده‌اید. دوباره پس از <t:${expiredTimestamp}:R> می‌توانید از آن استفاده کنید.**`)
                                .setColor("Orange")
                        ],
                    });
                return true;
            }
            ;
        }
        ;
        timestamps.set(userId, Date.now());
        setTimeout(() => timestamps.delete(userId), cooldownAmount);
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
//# sourceMappingURL=checkCmdCooldown.js.map