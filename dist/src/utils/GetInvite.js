"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetInvite;
const discord_js_1 = require("discord.js");
async function GetInvite(guild) {
    const inviteData = {
        reason: "Invite the developers",
        maxAge: 0
    };
    try {
        return guild.invites?.cache?.find(a => a.inviterId === guild.client.user.id) ||
            await guild.widgetChannel?.createInvite(inviteData) ||
            await guild.rulesChannel?.createInvite(inviteData) ||
            await guild.channels?.cache
                ?.filter(a => a.type === discord_js_1.ChannelType.GuildText && a.viewable)
                ?.random(1)[0]?.createInvite(inviteData) ||
            guild.invites?.cache?.first();
    }
    catch {
        return null;
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
//# sourceMappingURL=GetInvite.js.map