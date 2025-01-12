const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
const fs = require("fs");
module.exports = {
    name: "video",
    description: "دریافت و ارسال ویدیو های حق.",
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
            
            // const files = fs.readFileSync("./src/storage/nsfw").filter(file => file.endsWith(".json") && file !== "nekoApiTypes.json");
            // const file = files[Math.floor(Math.random() * files.length)];
            // const videos = require(`../../storage/nsfw/${file}`);
            const videos = require("../../storage/nsfw/random.json");
            const video = videos[Math.floor(Math.random() * videos.length)];
            const hideURL = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ _ ";
            return await interaction.reply({
                content: `محتوای شما یافت شد یا حق ✋🏻 (مواظب باش خودتو خفه نکنی)\n${hideURL}${video}`
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