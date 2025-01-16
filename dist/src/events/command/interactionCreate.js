"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Database_1 = tslib_1.__importDefault(require("../../classes/Database"));
const checkCmdPerms_1 = tslib_1.__importDefault(require("../../utils/checkCmdPerms"));
const checkCmdCooldown_1 = tslib_1.__importDefault(require("../../utils/checkCmdCooldown"));
const error_1 = tslib_1.__importDefault(require("../../utils/error"));
exports.default = async (client, interaction) => {
    try {
        const db = new Database_1.default(client.db);
        // Load Slash Commands
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            // Command Handler
            if (command && command.only_slash) {
                if (interaction.channel.isDMBased() && !command.data.dm_permission)
                    return;
                // Filter Owners Commands
                if (command.only_owner)
                    if (!client.config.discord.support.owners.includes(interaction.user.id))
                        return await interaction.reply({
                            flags: discord_js_1.MessageFlags.Ephemeral,
                            content: "این کامند فقط برای دولوپر هستش."
                        });
                // Check command perms
                if (interaction.guild)
                    if (await (0, checkCmdPerms_1.default)(interaction, command))
                        return;
                // Command cooldown
                if (await (0, checkCmdCooldown_1.default)(interaction, command))
                    return;
                // Use flags conditionally
                const ephemeralOption = interaction.options instanceof discord_js_1.CommandInteractionOptionResolver
                    ? interaction.options.getString("ephemeral") === "true"
                    : false;
                const replyFlags = ephemeralOption ? discord_js_1.MessageFlags.Ephemeral : undefined;
                // Command Handler 
                const DeferReply = async () => {
                    try {
                        await interaction.deferReply({
                            flags: replyFlags,
                            withResponse: true
                        });
                    }
                    catch {
                        await DeferReply();
                    }
                };
                if (command.data.options && (command.data.options?.find(a => a.name === "ephemeral") || command.data.options?.filter(a => a.type === 1)?.find(a => a.options?.find(b => b.name === "ephemeral"))))
                    await DeferReply();
                await db.add("totalCommandsUsed", 1);
                return await command.run(client, interaction);
            }
        }
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
//# sourceMappingURL=interactionCreate.js.map