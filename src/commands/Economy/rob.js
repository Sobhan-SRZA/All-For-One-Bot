const {
    EmbedBuilder,
    ApplicationCommandType
} = require("discord.js");
const robLevel = require("../../storage/economy.json").rob;
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
    name: "rob",
    description: "دزدی از بانک.",
    category: "economy",
    type: ApplicationCommandType.ChatInput,
    cooldown: 60 * 60,
    user_permissions: ["SendMessages"],
    bot_permissions: ["SendMessages", "EmbedLinks"],
    dm_permissions: false,
    only_owner: false,
    only_slash: true,
    only_message: false,

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").CommandInteraction} interaction 
     * @param {Array<string>} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        try {
            const db = client.db;
            if (!await db.has(`users.${interaction.user.id}`)) {
                await interaction.deferReply({ ephemeral: true });
                const cmd = client.application.commands.cache.find(c => c.name === "register");
                return await interaction.editReply({
                    content: `❌| شما هیچ پروفایلی در بات ندارید.\n(با استفاده از کامند </${cmd.name}:${cmd.id}> برای خود پروفایل بسازید.)`
                });
            };

            await interaction.deferReply({ ephemeral: false });
            const profile = await db.get(`users.${interaction.user.id}`);
            const deposit = profile.rob <= 0 ? 100 : robLevel[profile.rob];
            const withdrawal = Math.floor(deposit / 2);
            const random = Math.floor(Math.random() * 2);
            if (random === 0) {
                await db.add(`users.${interaction.user.id}.wallet`, deposit);
            } else {
                await db.sub(`users.${interaction.user.id}.wallet`, withdrawal);
            };

            const embed = new EmbedBuilder()
                .setColor(random === 0 ? "Green" : "Red")
                .setTitle("Economy | Rob")
                .setDescription(random === 0 ? "شما با موفقیت بدون گیر افتادن از بانک دزدی کردید." : "شما توسط پلیس دستگیر شدید.")
                .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
                .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
                .addFields([{
                    name: random === 0 ? "مبلغ واریزی:" : "مبلغ یرداشتی:",
                    value: `${random === 0 ? deposit.toLocaleString() : withdrawal.toLocaleString()} 🪙`,
                    inline: true
                }, {
                    name: "سطح دزدی:",
                    value: `${profile.rob} Level 🔦`,
                    inline: true
                }, {
                    name: "کیف پول:",
                    value: `${profile.wallet.toLocaleString()} 🪙`,
                    inline: true
                }])
                .setTimestamp();

            return await interaction.editReply({
                embeds: [embed]
            });
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