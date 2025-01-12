const {
    EmbedBuilder,
    ApplicationCommandType,
    ApplicationCommandOptionType,
    AttachmentBuilder
} = require("discord.js");
const error = require("../../functions/error");
const firstUpperCase = require("../../functions/firstUpperCase");
const copyRight = require("../../storage/copyRight.json");
const generate = require("../../functions/generators/generateFilterImage");
const meme = require("../../functions/generators/generateMemeImage");
module.exports = {
    name: "generate",
    description: "ساخت عکس با ورودی های شما.",
    category: "fun",
    type: ApplicationCommandType.ChatInput,
    user_permissions: ["SendMessages"],
    bot_permissions: ["SendMessages", "EmbedLinks"],
    dm_permissions: false,
    only_owner: false,
    only_admin: false,
    only_slash: true,
    only_message: false,
    options: [{
        name: "type",
        type: ApplicationCommandOptionType.String,
        description: "چه سبکی میخوای عکس بسازی؟",
        choices: [{
            name: "Blur",
            value: "blur"
        }, {
            name: "Gay",
            value: "gay"
        }, {
            name: "Greyscale",
            value: "greyscale"
        }, {
            name: "Invert",
            value: "invert"
        }, {
            name: "Sepia",
            value: "sepia"
        }, {
            name: "Ad",
            value: "ad"
        }, {
            name: "Affect",
            value: "affect"
        }, {
            name: "Batslap",
            value: "batslap"
        }, {
            name: "Beautiful",
            value: "beautiful"
        }, {
            name: "Bed",
            value: "bed"
        }, {
            name: "Bobross",
            value: "bobross"
        }, {
            name: "DiscordBlack",
            value: "discordblack"
        }, {
            name: "DiscordBlue",
            value: "discordblue"
        }, {
            name: "Facepalm",
            value: "facepalm"
        }, {
            name: "Spank",
            value: "spank"
        }, {
            name: "DoubleStonk",
            value: "doublestonk"
        }, {
            name: "Stonk",
            value: "stonk"
        }, {
            name: "Tatoo",
            value: "tatoo"
        }, {
            name: "Thomas",
            value: "thomas"
        }, {
            name: "Delete",
            value: "delete"
        }, {
            name: "Trash",
            value: "trash"
        }, {
            name: "Wanted",
            value: "wanted"
        }],
        required: true
    }, {
        name: "user-1",
        type: ApplicationCommandOptionType.User,
        description: "یه یوزر رو برای اعمال افکت ها پیدا کن.",
        required: false
    }, {
        name: "user-2",
        type: ApplicationCommandOptionType.User,
        description: "فقط برای سبک های DoubleStonk, Spank, Bed, Batslap لازمه.",
        required: false
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
            const db = client.db;
            const type = interaction.options.getString("type");
            const user1 = interaction.options.getUser("user-1") || interaction.user;
            const user2 = interaction.options.getUser("user-2");
            await interaction.deferReply({ fetchReply: true })
            switch (type) {
                case "blur": {
                    const image = new generate().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setBlur(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "gay": {
                    const image = new generate().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setGay(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "greyscale": {
                    const image = new generate().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setGreyscale(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "invert": {
                    const image = new generate().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setInvert(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "sepia": {
                    const image = new generate().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setSepia(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "ad": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setAd(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "affect": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setAffect(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "affect": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setAffect(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "batslap": {
                    if (!user2) return await interaction.editReply({
                        content: "شما یوزر دوم را انتخاب نکردید لطفا دوباره تلاش کنید."
                    });

                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setSecondUserAvatar(user2.displayAvatarURL({ extension: "png", size: 4096 })).setBatslap(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "beautiful": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setBeautiful(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "bed": {
                    if (!user2) return await interaction.editReply({
                        content: "شما یوزر دوم را انتخاب نکردید لطفا دوباره تلاش کنید."
                    });

                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setSecondUserAvatar(user2.displayAvatarURL({ extension: "png", size: 4096 })).setBed(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "bobross": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setBobross(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "delete": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setDelete(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "discordblack": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setDiscordBlack(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "discordblue": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setDiscordBlue(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "doublestonk": {
                    if (!user2) return await interaction.editReply({
                        content: "شما یوزر دوم را انتخاب نکردید لطفا دوباره تلاش کنید."
                    });

                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setSecondUserAvatar(user2.displayAvatarURL({ extension: "png", size: 4096 })).setDoubleStonk(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "facepalm": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setFacepalm(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "spank": {
                    if (!user2) return await interaction.editReply({
                        content: "شما یوزر دوم را انتخاب نکردید لطفا دوباره تلاش کنید."
                    });

                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setSecondUserAvatar(user2.displayAvatarURL({ extension: "png", size: 4096 })).setSpank(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "stonk": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setStonk(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "tatoo": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setTatoo(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "thomas": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setThomas(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "trash": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setTrash(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                case "wanted": {
                    const image = new meme().setUserAvatar(user1.displayAvatarURL({ extension: "png", size: 4096 })).setWanted(true);
                    const embed = new EmbedBuilder()
                        .setImage(`attachment://${type}.png`)
                        .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                        .setColor("Gold")
                        .setTitle("ساخت عکس | " + firstUpperCase(type))
                        .setDescription("عکس شما ساخته شد یا حق.")
                        .setTimestamp();

                    return await interaction.editReply({
                        embeds: [embed],
                        files: [new AttachmentBuilder(await image.generate(), { name: type + ".png" })]
                    });
                    break;
                }

                default: {
                    return await interaction.editReply({
                        content: "یافت نشد."
                    })
                }
            };

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