const {
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    ApplicationCommandType
} = require("discord.js");
const error = require("../../functions/error");
const axios = require("axios");
module.exports = {
    name: "fal",
    description: "اول نیت کن بعدش این کامند رو ران کن.",
    category: "fun",
    cooldown: 5,
    type: ApplicationCommandType.ChatInput,
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
            const res = await axios.get(`https://api.falehafez.org/`);
            const poem = res.data.poem.join(` / `);
            const explain = res.data.explanation;
            return await interaction.reply({
                embeds: [new EmbedBuilder().setColor('Yellow').setTitle(`📖| فال حافظ`).setDescription(`نیت کن و بعد کلیک کن`)],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("fun-falhafez").setLabel(`گرفتن  فال`).setEmoji(`🔖`).setStyle(ButtonStyle.Primary))],
                fetchReply: true
            }).then((msg) => {
                const collector = msg.createMessageComponentCollector({ time: 30 * 1000 });
                collector.on("collect", async (m) => {
                    if (m.user.id !== interaction.user.id) m.reply({ content: `این فال برای شما نیست`, ephemeral: true });
                    if (m.customId === "fun-falhafez") {
                        m.update({
                            embeds: [new EmbedBuilder().setColor('Aqua').setTitle(`📖| فال حافظ`).addFields([{ name: `شعر:`, value: `${poem}` }, { name: `معنی:`, value: `${explain}` }]).setImage("https://cdn.discordapp.com/attachments/944668553439760434/1098229688352129034/image.jpeg")],
                            components: []
                        })
                    }
                });
                collector.on("end", () => {
                    msg.edit({
                        components: []
                    })
                });
            })
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