import { ChannelType, Guild, TextChannel } from "discord.js";

export default async function GetInvite(guild: Guild) {
  const inviteData = {
    reason: "Invite the developers",
    maxAge: 0
  };
  try {
    return guild.invites?.cache?.find(a => a.inviterId === guild.client.user.id) ||
      await guild.widgetChannel?.createInvite(inviteData) ||
      await guild.rulesChannel?.createInvite(inviteData) ||
      await (
        guild.channels?.cache
          ?.filter(a => a.type === ChannelType.GuildText && a.viewable)
          ?.random(1)[0] as TextChannel
      )?.createInvite(inviteData) ||
      guild.invites?.cache?.first();
  } catch {
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