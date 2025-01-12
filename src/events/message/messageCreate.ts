import { ChannelType, Message, PermissionsBitField, TextChannel } from "discord.js";
import DiscordClient from "../../classes/Client";
import error from "../../utils/error";
import checkCmdPerms from "../../utils/checkCmdPerms";
import checkCmdCooldown from "../../utils/checkCmdCooldown";
import Database from "../../classes/Database";

export default async (client: DiscordClient, message: Message) => {
    try {
        const db = new Database(client.db!);

        // Filter dm channels
        if (message.channel.type === ChannelType.DM) return;

        // Filter webhooks
        if (!message || message?.webhookId) return;

        // Filter the bots
        if (message.author?.bot) return;

        // Command Prefix & args
        const
            stringPrefix = `${client.config.discord.prefix}`,
            prefixRegex = new RegExp(
                `^(<@!?${client.user!.id}>|${stringPrefix.toString().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\s*`
            );

        // Send prefix to channel
        if (!prefixRegex.test(message.content.toLowerCase()))
            return;

        const [prefix] = message.content.toLowerCase().match(prefixRegex)!;
        if (message.content.toLowerCase().indexOf(prefix) !== 0)
            return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift()!.toLowerCase();
        if (!commandName) {
            if (prefix.startsWith("<@")) {
                return await message.reply({
                    content: `پریفیکس ربات: \`${stringPrefix}\` | \`${stringPrefix}help\``,
                });
            }
            return;
        };

        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                cmd => cmd.aliases && cmd.aliases.includes(commandName)
            );

        // Command Handler
        if (command && command.only_message) {
            if (message.channel.isDMBased() && !command.data.dm_permission)
                return;

            // Start to Typing
            await (message.channel as TextChannel).sendTyping();

            // Filter Owners Commands
            if (command.only_owner)
                if (!client.config.discord.support.owners.includes(message.author.id))
                    return;

            // Check Perms
            if (message.guild)
                if (await checkCmdPerms(message, command, stringPrefix, args))
                    return;

            // Cooldown
            if (await checkCmdCooldown(message, command, stringPrefix, args))
                return;

            // Command Handler
            await db.add("totalCommandsUsed", 1);
            return await command.run(client, message, args);
        }
    } catch (e: any) {
        error(e);
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