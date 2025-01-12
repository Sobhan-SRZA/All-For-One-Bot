"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = responseError;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const embed_1 = tslib_1.__importDefault(require("../storage/embed"));
const HexToNumber_1 = tslib_1.__importDefault(require("../functions/HexToNumber"));
const error_1 = tslib_1.__importDefault(require("./error"));
async function responseError(interaction, log, data, isUpdateNeed, message) {
    try {
        if (!data)
            data = {
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setColor((0, HexToNumber_1.default)(embed_1.default.color.red))
                        .setFooter({
                        text: embed_1.default.footer.footerText,
                        iconURL: embed_1.default.footer.footerIcon
                    })
                        .setTitle("An error occurred!")
                        .setDescription(log)
                ]
            };
        if (interaction instanceof discord_js_1.CommandInteraction) {
            data.flags = discord_js_1.MessageFlags.Ephemeral;
            if (isUpdateNeed)
                return await interaction.editReply(data);
            else
                return await interaction.reply(data);
        }
        else {
            if (isUpdateNeed && message)
                return await message.edit(data);
            else
                return await interaction.reply(data);
        }
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
//# sourceMappingURL=responseError.js.map