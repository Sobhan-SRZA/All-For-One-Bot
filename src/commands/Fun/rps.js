const {
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    ApplicationCommandType
} = require("discord.js");
const copyRight = require("../../storage/copyRight.json");
const error = require("../../functions/error");
module.exports = {
    name: "rps",
    description: "بازی سنگ کاغذ قیچی با بات.",
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
            const time = 1000 * 60;
            let playerScore = 0;
            let botScore = 0;
            const choices = {
                rock: "✊🏻 سنگ",
                paper: "🖐🏻 کاغذ",
                scissor: "✌🏻 قیچی"
            };
            const endRow = new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId("end").setStyle(ButtonStyle.Primary).setEmoji("⛔").setLabel("پایان").setDisabled(true)]);
            const row = new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId("rock").setStyle(ButtonStyle.Secondary).setEmoji("✊🏻").setLabel("سنگ"), new ButtonBuilder().setCustomId("paper").setStyle(ButtonStyle.Secondary).setEmoji("🖐🏻").setLabel("کاغذ"), new ButtonBuilder().setCustomId("scissor").setStyle(ButtonStyle.Secondary).setEmoji("✌🏻").setLabel("قیچی")]);
            interaction.reply({
                embeds: [new EmbedBuilder().setColor("Blue").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                components: [row]
            })
                .then((msg) => {
                    const collector = msg.createMessageComponentCollector({ time: time });
                    collector.on("collect", async (m) => {
                        if (m.user.id !== interaction.user.id) m.reply({ content: `❌| این دکمه برای تو نیست.`, ephemeral: true });
                        const userChose = m.customId;
                        let botChose;
                        const botPick = Math.floor(Math.random() * 3) + 1;
                        if (botPick === 1) {
                            botChose = "rock"
                        } else if (botPick === 2) {
                            botChose = "paper"
                        } else if (botPick === 3) {
                            botChose = "scissor"
                        }
                        switch (m.customId) {
                            case "rock": {
                                if (botChose === "rock") {
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: مساوی شدیم.**`,
                                        embeds: [new EmbedBuilder().setColor("#ffffff").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                                else if (botChose === "paper") {
                                    botScore++;
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: تو باختی و من بردم💪🏻.**`,
                                        embeds: [new EmbedBuilder().setColor("Red").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                                else {
                                    playerScore++;
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: تو بردی💪🏻 و من باختم.**`,
                                        embeds: [new EmbedBuilder().setColor("Green").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                            } break;
                            case "paper": {
                                if (botChose === "paper") {
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: مساوی شدیم.**`,
                                        embeds: [new EmbedBuilder().setColor("#ffffff").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                                else if (botChose === "scissor") {
                                    botScore++;
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: تو باختی و من بردم💪🏻.**`,
                                        embeds: [new EmbedBuilder().setColor("Red").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                                else {
                                    playerScore++;
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: تو بردی💪🏻 و من باختم.**`,
                                        embeds: [new EmbedBuilder().setColor("Green").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                            } break;
                            case "scissor": {
                                if (botChose === "scissor") {
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: مساوی شدیم.**`,
                                        embeds: [new EmbedBuilder().setColor("#ffffff").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                                else if (botChose === "rock") {
                                    botScore++;
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: تو باختی و من بردم💪🏻.**`,
                                        embeds: [new EmbedBuilder().setColor("Red").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                                else {
                                    playerScore++;
                                    m.update({
                                        content: `انتخاب من: **${choices[botChose]}**\n انتخاب شما: **${choices[userChose]}**\n**نتیجه: تو بردی💪🏻 و من باختم.**`,
                                        embeds: [new EmbedBuilder().setColor("Green").setDescription("برنده: **-**").addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                        components: [row]
                                    })
                                }
                            } break;
                        }
                        if (playerScore === 10) {
                            msg.edit({
                                content: ` `,
                                embeds: [new EmbedBuilder().setColor("Green").setDescription(`برنده: **${interaction.user}**`).addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                components: [endRow]
                            })
                        }
                        else if (botScore === 10) {
                            msg.edit({
                                content: ` `,
                                embeds: [new EmbedBuilder().setColor("Red").setDescription(`برنده: **${client.user}**`).addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                components: [endRow]
                            })
                        }
                    })
                    collector.on("end", async (x) => {
                        if (x.size === 0) {
                            msg.edit({
                                content: ` `,
                                embeds: [new EmbedBuilder().setColor("#ffffff").setDescription(`**هیشکی نیست تا با من مقابله کنه؟!**`)],
                                components: [endRow]
                            })
                        } else if (x.size > 0) {
                            if (botScore === playerScore) {
                                msg.edit({
                                    content: ` `,
                                    embeds: [new EmbedBuilder().setColor("#ffffff").setDescription(`برنده: **ها برابر هست. امتیاز**`).addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                    components: [endRow]
                                })
                            } else if (botScore < playerScore) {
                                msg.edit({
                                    content: ` `,
                                    embeds: [new EmbedBuilder().setColor("Green").setDescription(`برنده: **${interaction.user}**`).addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                    components: [endRow]
                                })
                            } else if (botScore > playerScore) {
                                msg.edit({
                                    content: ` `,
                                    embeds: [new EmbedBuilder().setColor("Red").setDescription(`برنده: **${client.user}**`).addFields([{ name: `امتیاز های بازی`, value: `\`->\` ${interaction.user}: **${playerScore} امتیاز**\n\`->\` ${client.user}: **${botScore} امتیاز**` }])],
                                    components: [endRow]
                                })
                            }
                        }
                    })
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