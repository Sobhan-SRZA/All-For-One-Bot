const {
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    Collection,
    ThreadAutoArchiveDuration
} = require("discord.js");
const error = require("../../functions/error");
const chatBot = require("../../functions/chatBot");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @returns 
 */
module.exports = async (client, message) => {
    try {
        const db = client.db;
        // Filter dm channels
        if (message.channel.type === ChannelType.DM) return;

        // Filter webhooks
        if (!message || message?.webhookId) return;

        // Auto Thread
        if (await db.has(`autoThread.${message.guild.id}`)) {
            const autoReaction = await db.get(`autoThread.${message.guild.id}`);
            autoReaction.forEach(async channel => {
                if (message.channelId === channel.id) {
                    return await message.startThread({
                        name: `${message.author.displayName} ${channel.name}`,
                        autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
                        reason: channel.name
                    }).then(async (thread) => {
                        await thread.join();
                    });
                }
            })
        };

        // Auto Reaction
        if (await db.has(`autoReaction.${message.guild.id}`)) {
            const autoReaction = await db.get(`autoReaction.${message.guild.id}`);
            autoReaction.forEach(async channel => {
                if (message.channelId === channel.id) {
                    channel.reactions.forEach((emote, index) => {
                        setTimeout(async () => await message.react(emote), 100 * index);
                    })
                }
            })
        };


        // Only Media
        if (await db.has(`onlyMedia.${message.guild.id}`)) {
            const onlyMedia = await db.get(`onlyMedia.${message.guild.id}`);
            onlyMedia.forEach(async channel => {
                if (message.channelId === channel) {
                    if (message.embeds.some(a => ["image", "video"].includes(a.data.type)) || message.attachments.first()) return;
                    else return await message.delete()
                }
            })
        };

        // Filter the bots
        if (message.author?.bot) return;

        // Chat bot with mention option.
        if (await db.has(`chatBot.${message.guild.id}`)) {
            if ((await db.get(`chatBot.${message.guild.id}`)).includes(message.channel.id) || message.mentions.members.has(client.user)) {
                message.channel.sendTyping();
                const content = message.content.replace(message.mentions.users.first(), "").toLocaleString();
                const answer = await chatBot(content, message.author);
                return await message.reply({
                    content: answer
                });
            }
        };

        // Custom commands
        if (await db.has(`commands.${message.guild.id}`)) {
            const customCmd = await db.get(`commands.${message.guild.id}`);
            customCmd.forEach(async command => {
                if (message.content.includes(command.name)) {
                    return await message.reply({
                        content: command.message.toString()
                    });
                }
            })
        };

        // Command Prefix & args
        const Tprefix = `${client.config.prefix}`;
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Tprefix.toString())})\\s*`);
        if (!prefixRegex.test(message.content)) return;

        const [prefix] = message.content.match(prefixRegex);
        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        if (!commandName) return;

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // Command Handler
        if (command && command.only_message) {

            // Check Perms
            if (command.only_owner) {
                if (!client.config.owners.includes(message.author.id)) return;
            };

            const mentionCommand = `\`${prefix + command.name}\``;
            if (message.guild) {
                const bot_perms = [];
                const user_perms = [];
                command.bot_permissions.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]));
                command.user_permissions.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]));
                if (!message.guild.members.me.permissions.has([bot_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(`ربات که من باشم دسترسی لازم برای ران کردن کامند ${mentionCommand} رو ندارم!!\nدسترسی های لازم: [${command.bot_perms.map(p => `\`${p}\``).join(", ")}]`).setColor("Orange")] }).catch((e) => { error(e) });

                if (!message.member.permissions.has([user_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(`ببین پسر خوب تو دسترسی های لازم برای استفاده از کامند ${mentionCommand} رو نداری!! \nدسترسی های لازم: [${command.user_perms.map(p => `\`${p}\``).join(", ")}]`).setColor("Red")] }).catch((e) => { error(e) });
            };

            // Cooldown
            if (!client.cooldowns.has(command.name)) {
                client.cooldowns.set(command.name, new Collection());
            };

            const now = Date.now();
            const timestamps = client.cooldowns.get(command.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    return message.reply({ content: `شما به دلیل اسپم از کامند ${mentionCommand} محروم شدید و تا <t:${expiredTimestamp}:R> دیگر میتوانید دوباره از آن استفاده کنید.` });
                }
            };

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            // Command Handler
            message.channel.sendTyping();
            setTimeout(() => {
                command.run(client, message, args);
            }, 100);
        };
    } catch (e) {
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