"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const config_1 = tslib_1.__importDefault(require("../../config"));
const embed_1 = tslib_1.__importDefault(require("../storage/embed"));
const HexToNumber_1 = tslib_1.__importDefault(require("../functions/HexToNumber"));
const post_1 = tslib_1.__importDefault(require("../functions/post"));
function error(error) {
    try {
        if (config_1.default.source.logger && config_1.default.discord.support.webhook.url) {
            const date = Date.parse(Date.now().toString()) / 1000, data = {
                avatarURL: config_1.default.discord.support.webhook.avatar,
                username: config_1.default.discord.support.webhook.username
            }, webhook = new discord_js_1.WebhookClient({
                url: config_1.default.discord.support.webhook.url
            }), embed = new discord_js_1.EmbedBuilder()
                .setColor((0, HexToNumber_1.default)(embed_1.default.color.theme))
                .setAuthor({
                name: `${error.message}`
            })
                .setFooter({
                text: embed_1.default.footer.footerText,
                iconURL: embed_1.default.footer.footerIcon
            })
                .setTitle(`${embed_1.default.emotes.default.error}| An error occurred!!`)
                .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
                .addFields([
                {
                    name: `${embed_1.default.emotes.default.entry}| Name:`,
                    value: `${error.name}`
                }
            ]);
            if (error.code)
                embed.addFields([
                    {
                        name: `${embed_1.default.emotes.default.prohibited}| Code:`,
                        value: `${error.code}`
                    }
                ]);
            if (error.status)
                embed.addFields([
                    {
                        name: `${embed_1.default.emotes.default.globe}| httpStatus:`,
                        value: `${error.status}`
                    }
                ]);
            embed.addFields([
                {
                    name: `${embed_1.default.emotes.default.clock}| Timestamp:`,
                    value: `**<t:${date}:D> | <t:${date}:R>**`
                }
            ]);
            if (error.stack && error.stack.length > 4087) {
                data.content = `**${embed_1.default.emotes.default.entry}| Name: \`${error.name}\`${error.code ?
                    `\n${embed_1.default.emotes.default.prohibited}| Code: \`${error.code}\`` : ""}${error.status ?
                    `\n${embed_1.default.emotes.default.globe}| httpStatus: \`${error.status}\`` : ""}\n${embed_1.default.emotes.default.clock}| Timestamp: <t:${date}:D> | <t:${date}:R>**`;
                data.files = [
                    new discord_js_1.AttachmentBuilder(Buffer.from(error.stack), {
                        name: "error_message.txt",
                        description: error.name,
                    })
                ];
            }
            else
                data.embeds = [embed];
            if (config_1.default.discord.support.webhook.threads.bugs)
                data.threadId = config_1.default.discord.support.webhook.threads.bugs;
            return webhook.send(data);
        }
        else
            console.log(error);
    }
    catch (e) {
        (0, post_1.default)("Error logger to discord webhook have bug!!", "E", "red", "red");
        console.log(e);
        (0, post_1.default)("Main Error:", "E", "red", "red");
        console.log(error);
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
//# sourceMappingURL=error.js.map