const { MessageEmbed, WebhookClient } = require("discord.js");
const post = require("./post");
const config = require("../config");

/**
 * 
 * @param {Error} error 
 * @returns
 */
module.exports = function (error) {
    try {
        if (config.webhook.url) {
            const [id, token] = config.webhook.url.replace("https://discord.com/api/webhooks/", "").split("/");
            const webhook = new WebhookClient(id, token);
            const embed = new MessageEmbed()
                .setAuthor(`${error.message}`)
                .setTitle(`⚠️| An error occurred`)
                .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
                .setColor("RED")
                .setFooter("Build with ♥ by mr.sinre", "https://cdn.discordapp.com/avatars/865630940361785345/d0c85fbbdb0ee9f105336a041904e7d8.png?size=4096")
                .addFields({ name: `📛| Name:`, value: `${error.name}` });

            if (error.code) embed.addFields({ name: `🚫| Code:`, value: `${error.code}` });

            if (error.status) embed.addFields({ name: `🌐| httpStatus:`, value: `${error.status}` });

            embed.addFields({ name: `🕰| Timestamp:`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**` });
            let data = {
                embeds: [embed]
            };
            if (config.webhook.avatar) data.avatarURL = config.webhook.avatar;
            if (config.webhook.username) data.username = config.webhook.username;

            return webhook.send(data);
        } else {
            console.log(error);
        };
    } catch (e) {
        post("Error logger to discord webhook have bug!!", "E", "red", "redBright");
        console.log(e);
        post("Main Error:", "E", "red", "redBright");
        console.log(error);
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