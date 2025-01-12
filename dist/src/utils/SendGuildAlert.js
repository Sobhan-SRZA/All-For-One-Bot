"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SendGuildAlert;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const GetInvite_1 = tslib_1.__importDefault(require("./GetInvite"));
const config_1 = tslib_1.__importDefault(require("../../config"));
const error_1 = tslib_1.__importDefault(require("./error"));
const embed_1 = tslib_1.__importDefault(require("../storage/embed"));
const HexToNumber_1 = tslib_1.__importDefault(require("../functions/HexToNumber"));
async function SendGuildAlert({ client, guild, guildChannel = null, isWebhook = false, description = "**-# The total number of servers I’m in is now `{guilds}`.**", isLeaved = false }) {
    try {
        let channel, owner, invite = await (0, GetInvite_1.default)(guild), messageData = {};
        if (isWebhook) {
            channel = new discord_js_1.WebhookClient({ url: config_1.default.discord.support.webhook.url });
            messageData.avatarURL = config_1.default.discord.support.webhook.avatar;
            messageData.username = config_1.default.discord.support.webhook.username;
            if (config_1.default.discord.support.webhook.threads.status)
                messageData.threadId = config_1.default.discord.support.webhook.threads.status;
        }
        else if (guildChannel)
            channel = guildChannel;
        else if (!channel || !guildChannel && !isWebhook)
            (0, error_1.default)(Error("You didn't add channel or webhook enable."));
        try {
            owner = await guild.fetchOwner() || (await (await guild.fetch()).fetchOwner());
        }
        catch { }
        const guildCreatedAt = Date.parse(guild.createdAt.toString()) / 1000;
        const embed = new discord_js_1.EmbedBuilder()
            .setDescription(description.replace("{guilds}", await client.guilds.cache.size.toLocaleString()))
            .addFields([
            {
                name: `${embed_1.default.emotes.default.owner}| Owner:`,
                value: `${embed_1.default.emotes.default.reply} **${owner.user} | \`${owner.user?.tag}\` | \`${owner.user?.id || guild.ownerId}\`**`,
                inline: false
            },
            {
                name: `${embed_1.default.emotes.default.server}| Guild:`,
                value: `${embed_1.default.emotes.default.reply} **${invite ? `[${guild.name}](${invite.url})` : `${guild.name}`} | \`${guild.id}\` | \`${guild.memberCount}\` Members**`,
                inline: false
            },
            {
                name: `${embed_1.default.emotes.default.date}| Created At:`,
                value: `${embed_1.default.emotes.default.reply} **<t:${guildCreatedAt}:D> | <t:${guildCreatedAt}:R>**`,
                inline: false
            }
        ])
            .setColor((0, HexToNumber_1.default)(isLeaved ? embed_1.default.color.redlight : embed_1.default.color.greenlight || embed_1.default.color.theme))
            .setThumbnail(guild.iconURL({ forceStatic: true }))
            .setFooter({
            text: client.user.tag,
            iconURL: client.user.displayAvatarURL({ forceStatic: true })
        })
            .setTimestamp(Date.now());
        try {
            embed.setAuthor({
                name: owner.user.tag,
                iconURL: owner.user.displayAvatarURL({ forceStatic: true })
            });
        }
        catch { }
        messageData.embeds = [embed];
        return await channel.send(messageData);
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
//# sourceMappingURL=SendGuildAlert.js.map