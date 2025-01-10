const {
    ApplicationCommandType,
    ApplicationCommandOptionType
} = require("discord.js");
const {
    useQueue,
    useMainPlayer
} = require("discord-player");
const error = require("../../functions/error");
const response = require("../../functions/response");
module.exports = {
    name: "play",
    description: "پخش موزیک در ویس چنل.",
    category: "music",
    type: ApplicationCommandType.ChatInput,
    cooldown: 5,
    aliases: ["p"],
    user_permissions: ["SendMessages"],
    bot_permissions: ["SendMessages", "EmbedLinks", "Connect", "Speak"],
    dm_permissions: false,
    only_owner: false,
    only_slash: true,
    only_message: true,
    options: [{
        name: "track",
        description: "لطفا نام خواننده یا آهنگ و یا لینک وارد کنید.",
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").CommandInteraction} interaction 
     * @param {Array<string>} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        try {
            let query = interaction.user ? interaction.options.getString("track") : args.join(" ");
            const member = interaction.guild.members.cache.get(interaction.member.id);
            const player = useMainPlayer();
            const queue = useQueue(interaction.guild.id);
            const channel = member?.voice?.channel;
            if (!query) return await response(interaction, { content: "You have to write a music name or place a url." });

            if (!channel) return await response(interaction, { content: "You have to join a voice channel first." });

            if (queue && queue.channel.id !== channel.id)
                return await response(interaction, { content: "I'm already playing in a different voice channel!" });

            if (!channel.viewable)
                return await response(interaction, { content: "I need `View Channel` permission." });

            if (!channel.joinable)
                return await response(interaction, { content: "I need `Connect Channel` permission." });

            if (channel.full)
                return await response(interaction, { content: "Can't join, the voice channel is full." });

            if (member.voice.deaf)
                return await response(interaction, { content: "You cannot run this command while deafened." });

            if (interaction.guild.members.me?.voice?.mute)
                return await response(interaction, { content: "Please unmute me before playing." });

            if (query.startsWith("https://on.soundcloud.com")) {
                const results = await fetch(query.split(" ")[0]);
                query = results.url;
            };

            const searchResult = await player
                .search(query, { requestedBy: member })
                .catch(error);

            if (!searchResult.hasTracks())
                return await response(interaction, { content: `No track was found for ${query}!` });

            const { track } = await player.play(channel, searchResult, {
                nodeOptions: {
                    metadata: {
                        channel: interaction.channel,
                        author: member
                    }
                }
            });

            return await response(interaction, { content: `This object founded **${track.title}** from **${track.author}**!` });
        } catch (e) {
            error(e);
        }
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