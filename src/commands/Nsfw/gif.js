const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
const getDataFromNeko = require("../../functions/getDataFromNeko");
module.exports = {
    name: "gif",
    description: "دریافت و ارسال گیف های حق از api و نشان دادن آن به صورت رندوم.",
    category: "nsfw",
    cooldown: 5,
    user_permissions: ["SendMessages"],
    bot_permissions: ["SendMessages", "EmbedLinks"],
    dm_permissions: false,
    only_owner: false,
    only_slash: false,
    only_message: true,

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").CommandInteraction} interaction 
     * @param {Array} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        try {
            if (!interaction.channel.nsfw) return interaction.reply({ content: `پسر خوب اینجا که برای بچه سالاست پاشو برو چنل هایی که NSFW اش روشن باهشه موش کور.` });

            const data = await getDataFromNeko("pgif");
            try {
                if (data.message) {
                    return await interaction.reply({
                        embeds: [new EmbedBuilder().setColor("#2B2D31").setTitle(`گیف های حق و آغشته به پورن به صورت شانسی`).setDescription(`مراقب چشات باش`).setTimestamp().setImage(data.message).setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })]
                    })
                };
            } catch (e) {
                error(e)
            }

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