import { EmbedBuilder, Guild, GuildMember, TextChannel, WebhookClient, WebhookMessageCreateOptions } from "discord.js";
import DiscordClient from "../classes/Client";
import GetInvite from "./GetInvite";
import config from "../../config";
import error from "./error";
import EmbedData from "../storage/embed";
import HexToNumber from "../functions/HexToNumber";

export default async function SendGuildAlert({
  client,
  guild,
  guildChannel = null,
  isWebhook = false,
  description = "**-# The total number of servers I’m in is now `{guilds}`.**",
  isLeaved = false
}: {
  client: DiscordClient,
  guild: Guild,
  guildChannel?: TextChannel | null,
  isWebhook?: boolean,
  description?: string,
  isLeaved?: boolean
}) {
  try {
    let
      channel: WebhookClient | TextChannel | null,
      owner: GuildMember,
      invite = await GetInvite(guild),
      messageData: WebhookMessageCreateOptions = {};

    if (isWebhook) {
      channel = new WebhookClient({ url: config.discord.support.webhook.url });
      messageData.avatarURL = config.discord.support.webhook.avatar;
      messageData.username = config.discord.support.webhook.username;
      if (config.discord.support.webhook.threads.status)
        messageData.threadId = config.discord.support.webhook.threads.status;
    }

    else if (guildChannel)
      channel = guildChannel;

    else if (!channel! || !guildChannel && !isWebhook)
      error(Error("You didn't add channel or webhook enable."))

    try {
      owner = await guild.fetchOwner() || (await (await guild.fetch()).fetchOwner());
    } catch { }
    const guildCreatedAt = Date.parse(guild.createdAt.toString()) / 1000;
    const embed = new EmbedBuilder()
      .setDescription(description.replace("{guilds}", await client.guilds.cache.size.toLocaleString()))
      .addFields(
        [
          {
            name: `${EmbedData.emotes.default.owner}| Owner:`,
            value: `${EmbedData.emotes.default.reply} **${owner!.user} | \`${owner!.user?.tag}\` | \`${owner!.user?.id || guild.ownerId}\`**`,
            inline: false
          },
          {
            name: `${EmbedData.emotes.default.server}| Guild:`,
            value: `${EmbedData.emotes.default.reply} **${invite ? `[${guild.name}](${invite.url})` : `${guild.name}`} | \`${guild.id}\` | \`${guild.memberCount}\` Members**`,
            inline: false
          },
          {
            name: `${EmbedData.emotes.default.date}| Created At:`,
            value: `${EmbedData.emotes.default.reply} **<t:${guildCreatedAt}:D> | <t:${guildCreatedAt}:R>**`,
            inline: false
          }
        ]
      )
      .setColor(HexToNumber(isLeaved ? EmbedData.color.redlight : EmbedData.color.greenlight || EmbedData.color.theme))
      .setThumbnail(guild.iconURL({ forceStatic: true }))
      .setFooter(
        {
          text: client.user!.tag,
          iconURL: client.user!.displayAvatarURL({ forceStatic: true })
        }
      )
      .setTimestamp(Date.now());

    try {
      embed.setAuthor(
        {
          name: owner!.user.tag,
          iconURL: owner!.user.displayAvatarURL({ forceStatic: true })
        }
      )
    } catch { }

    messageData.embeds = [embed];
    return await channel!.send(messageData);
  } catch (e: any) {
    error(e)
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