const {
    ButtonBuilder,
    ActionRowBuilder,
    EmbedBuilder,
    ButtonStyle,
    ChannelType,
    StringSelectMenuBuilder,
    ApplicationCommandType,
    ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
    name: "setup",
    description: "ثبت تنظیمات ربات در سرور.",
    category: "admin",
    type: ApplicationCommandType.ChatInput,
    user_permissions: ["ManageGuild", "ManageRoles", "ManageChannels"],
    bot_permissions: ["SendMessages", "EmbedLinks"],
    dm_permissions: false,
    only_owner: false,
    only_admin: false,
    only_slash: true,
    only_message: false,
    options: [
        {
            name: "chat-bot",
            description: "Set the chat bot channels.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "channel",
                description: "Set the chat bot channels.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: true
            }]
        }, {
            name: "custom-command",
            description: "Set the chat bot channels.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "name",
                description: "Place command name.",
                type: ApplicationCommandOptionType.String,
                required: true
            }, {
                name: "message",
                description: "Write command response message.",
                type: ApplicationCommandOptionType.String,
                required: true
            }]
        }, {
            name: "auto-reaction",
            description: "اد کردن چنل هایی که میخواهید در آن ایموجی ها اوتوماتیک ریکشن بشن.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "channel",
                description: "یه چنل بزار.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: true
            }, {
                name: "emoji",
                description: "ایموجی ای که میخوای ری اکت شه رو بزار.",
                type: ApplicationCommandOptionType.String,
                required: true
            }]
        }, {
            name: "auto-thread",
            description: "تنظیم اوتوثرید برای چنل های سرور.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "channel",
                description: "یه چنل بزار.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: true
            }, {
                name: "name",
                description: "اسمی که میخوای اول اسم ثرید بیاد رو بنویس.",
                type: ApplicationCommandOptionType.String,
                required: false
            }]
        }, {
            name: "welcome",
            description: "سیستم ولکام سرور.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "channel",
                description: "چنل ولکام رو بزار.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: true
            }, {
                name: "message",
                description: "یه متن برای پیام ولکام بزار.",
                type: ApplicationCommandOptionType.String,
                required: false
            }]
        }, {
            name: "ticket-message",
            description: "فرستادن مسیج تیکت.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "content",
                type: ApplicationCommandOptionType.String,
                description: "اگر میخواید یه مسیج بنویسید اینجا پر کنید.",
                required: false
            }, {
                name: "file",
                description: "یک فایل آپلود کنید.",
                type: ApplicationCommandOptionType.Attachment,
                required: false,
            }, {
                name: "thumbnail",
                type: ApplicationCommandOptionType.Attachment,
                description: "فقط عکس یا گیف میتوانید آپلود کنید.",
                required: false
            }, {
                name: "image_url",
                type: ApplicationCommandOptionType.Attachment,
                description: "فقط عکس یا گیف میتوانید آپلود کنید..",
                required: false
            }, {
                name: "description",
                type: ApplicationCommandOptionType.String,
                description: "بخش description امبد را پر کنید.",
                required: false
            }, {
                name: "footer_text",
                type: ApplicationCommandOptionType.String,
                description: "بخش فوتر را پر کنید.",
                required: false
            }, {
                name: "footer_iconurl",
                type: ApplicationCommandOptionType.Attachment,
                description: "برای بخش فوتیر عکس یا گیف آپلود کنید.",
                required: false
            }, {
                name: "author_text",
                type: ApplicationCommandOptionType.String,
                description: "پخش بالای امبد را پر کنید.",
                required: false
            }, {
                name: "author_iconurl",
                type: ApplicationCommandOptionType.Attachment,
                description: "برای بخش بالای امبد عکس یا گیف آپلود کنید.",
                required: false
            }, {
                name: "title",
                type: ApplicationCommandOptionType.String,
                description: "تایتل را پر کنید.",
                required: false
            }, {
                name: "timestamp",
                type: ApplicationCommandOptionType.Boolean,
                description: "آیا میخواهید تاریخ روز را در زیر امبد نشان دهد؟",
                required: false
            }, {
                name: "color",
                type: ApplicationCommandOptionType.String,
                description: "رنگ امبد را لطفا با قرار دادن هکس کد تعیین کنید.",
                required: false
            }, {
                name: "channel",
                description: "چنلی که میخواهید مسیج در آنجا فرستاده سود.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: false
            }]
        }, {
            name: "ticket-menu",
            description: "گزینه های داخل منوی تیکت مسیج رو ست کن.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "name",
                description: "اسمش رو وارد کن.",
                type: ApplicationCommandOptionType.String,
                required: true
            }, {
                name: "emoji",
                description: "اگه ایموجی قراره داشته باشه ایموجی رو اد کن.",
                type: ApplicationCommandOptionType.String,
                required: false
            }, {
                name: "role",
                description: "رول ادمین برای این آپشن رو انتخاب کن.",
                type: ApplicationCommandOptionType.Role,
                required: false
            }]
        }, {
            name: "stats",
            description: "برای نشون دادن اطلاعات سرور و باقی چیز ها روی اسم چنل ها.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "type",
                description: "میخوای چه نوعی اطلاعاتی نمایش بدی؟",
                type: ApplicationCommandOptionType.String,
                choices: [{
                    name: "Members Count",
                    value: "gmc"
                }, {
                    name: "Members On Voice Count",
                    value: "gvmc"
                }, {
                    name: "Solar Date",
                    value: "date-fa"
                }, {
                    name: "AD Date",
                    value: "date-en"
                }],
                required: true
            }, {
                name: "channel",
                description: "یه چنل بزار.",
                type: ApplicationCommandOptionType.Channel,
                required: true
            }, {
                name: "name",
                description: "اسم چنل بر اساس نوعی که رای نمایش اطلاعات انتخاب کردی رو با متغیر ها رو بنویس.",
                type: ApplicationCommandOptionType.String,
                required: false
            }]
        }, {
            name: "only-media",
            description: "ثبت چنل های مخصوص عکس و فیلم.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "channel",
                description: "یه چنل وارد کن.",
                type: ApplicationCommandOptionType.Channel,
                channelTypes: [ChannelType.GuildText],
                required: true
            }]
        }
    ],

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
            switch (interaction.options.getSubcommand()) {
                case "chat-bot": {
                    const channel = interaction.options.getChannel("channel");
                    const database = await db.get(`chatBot.${interaction.guild.id}`);
                    await interaction.deferReply({ ephemeral: false });
                    if (database && database.some(a => a === channel.id)) {
                        const collector = await interaction.editReply({
                            content: `قبلا چنل <#${channel.id}> در دیتابیس ذخیره شده است.\nآیا تمایل به حذف آن دارید؟`,
                            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("setup-accept").setEmoji("✅").setLabel("بله").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("setup-cancel").setEmoji("❌").setLabel("خیر").setStyle(ButtonStyle.Secondary))]
                        });
                        const collect = collector.createMessageComponentCollector({ time: 60 * 1000 })
                        collect.on("collect", async (button) => {
                            switch (button.customId) {
                                case "setup-accept": {
                                    await button.deferUpdate();
                                    await db.set(`chatBot.${interaction.guild.id}`, database.filter(a => a !== channel.id));
                                    return await button.editReply({
                                        content: `چنل با موفقیت از دیتابیس حذف شد.`,
                                        components: []
                                    });
                                };
                                case "setup-cancel": {
                                    collect.stop();
                                };
                            }
                        });
                        collect.on("end", async () => {
                            return await interaction.deleteReply();
                        });
                    } else {
                        await db.push(`chatBot.${interaction.guild.id}`, channel.id);
                        const embed = new EmbedBuilder()
                            .setColor("Green")
                            .setTitle("Chat Bot")
                            .setDescription("Successfully your server chat bot channel have setup.")
                            .setFooter({ text: `Admin Embed • ${copyRight.footerText}` })
                            .setThumbnail(author.displayAvatarURL({ forceStatic: true }))
                            .addFields([{
                                name: "Chat Bot Channels:",
                                value: `**${(await db.get(`chatBot.${interaction.guild.id}`)).map(a => `<#${a}>`).join(", ")}**`,
                                inline: false
                            }])
                            .setTimestamp();

                        return await interaction.editReply({
                            embeds: [embed]
                        })
                    }
                }

                case "custom-command": {
                    const cmdName = interaction.options.getString("name");
                    const cmdMessage = interaction.options.getString("message");
                    const data = {
                        name: cmdName,
                        message: cmdMessage
                    };
                    const database = await db.get(`commands.${interaction.guild.id}`);
                    await interaction.deferReply({ ephemeral: false });
                    if (database && database.some(a => a.name === data.name)) {
                        const collector = await interaction.editReply({
                            content: `قبلا کامند \`${data.name}\` در دیتابیس ذخیره شده است.\nآیا تمایل به حذف آن دارید؟`,
                            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("setup-accept").setEmoji("✅").setLabel("بله").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("setup-cancel").setEmoji("❌").setLabel("خیر").setStyle(ButtonStyle.Secondary))]
                        });
                        const collect = collector.createMessageComponentCollector({ time: 60 * 1000 })
                        collect.on("collect", async (button) => {
                            switch (button.customId) {
                                case "setup-accept": {
                                    await button.deferUpdate();
                                    await db.set(`commands.${interaction.guild.id}`, database.filter(a => a.name !== data.name));
                                    return await button.editReply({
                                        content: `کامند با موفقیت از دیتابیس حذف شد.`,
                                        components: []
                                    });
                                };
                                case "setup-cancel": {
                                    return collect.stop();
                                };
                            }
                        });
                        collect.on("end", async () => {
                            return await interaction.deleteReply();
                        });
                    } else {
                        await db.push(`commands.${interaction.guild.id}`, data);
                        const embed = new EmbedBuilder()
                            .setColor("Green")
                            .setTitle("Custom Command")
                            .setDescription("Successfully your custom command have setup.")
                            .setFooter({ text: `Admin Embed • ${copyRight.footerText}` })
                            .setThumbnail(author.displayAvatarURL({ forceStatic: true }))
                            .addFields([{
                                name: "Name:",
                                value: `\`${data.name}\``,
                                inline: false
                            }, {
                                name: "Response:",
                                value: `${data.message}`,
                                inline: false
                            }])
                            .setTimestamp();

                        return await interaction.editReply({
                            embeds: [embed]
                        });
                    }
                    break;
                }


                case "auto-reaction": {
                    const channel = interaction.options.getChannel("channel");
                    const emotes = interaction.options.getString("emoji");
                    const data = {
                        id: channel.id,
                        reactions: emotes.split(" ")
                    };
                    const database = await db.get(`autoReaction.${interaction.guild.id}`);
                    await interaction.deferReply({ ephemeral: false });
                    if (database && database.some(a => a.id === data.id)) {
                        const collector = await interaction.editReply({
                            content: `قبلا چنل <#${data.id}> در دیتابیس ذخیره شده است.\nآیا تمایل به حذف آن دارید؟`,
                            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("setup-accept").setEmoji("✅").setLabel("بله").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("setup-cancel").setEmoji("❌").setLabel("خیر").setStyle(ButtonStyle.Secondary))]
                        });
                        const collect = collector.createMessageComponentCollector({ time: 60 * 1000 })
                        collect.on("collect", async (button) => {
                            switch (button.customId) {
                                case "setup-accept": {
                                    await button.deferUpdate();
                                    await db.set(`autoReaction.${interaction.guild.id}`, database.filter(a => a.id !== data.id));
                                    return await button.editReply({
                                        content: `چنل با موفقیت از دیتابیس حذف شد.`,
                                        components: []
                                    });
                                };
                                case "setup-cancel": {
                                    return collect.stop();
                                };
                            }
                        });
                        collect.on("end", async () => {
                            return await interaction.deleteReply();
                        });
                    } else {
                        await db.push(`autoReaction.${interaction.guild.id}`, data);
                        const embed = new EmbedBuilder()
                            .setColor("Green")
                            .setTitle("ریکشن خودکار")
                            .setDescription("سیستم ریکشن خودکار در تکس چنل مورد نظر با موفقیت ست شد و در دیتابیس ذخیره شد.")
                            .setFooter({ text: `Admin Embed • ${copyRight.footerText}` })
                            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
                            .addFields([{
                                name: "چنل:",
                                value: `**<#${data.id}>**`,
                                inline: false
                            }, {
                                name: "ایموجی ها:",
                                value: `**${data.reactions.join(", ")}**`,
                                inline: false
                            }])
                            .setTimestamp();

                        return await interaction.editReply({
                            embeds: [embed]
                        })
                    };
                    break;
                }

                case "auto-thread": {
                    const channel = interaction.options.getChannel("channel");
                    const name = interaction.options.getString("name");
                    await interaction.deferReply({ ephemeral: false });
                    const data = {
                        id: channel.id,
                        name: name ?? "Comments"
                    };
                    const database = await db.get(`autoThread.${interaction.guild.id}`);
                    if (database && database.some(a => a.id === data.id)) {
                        const collector = await interaction.editReply({
                            content: `قبلا چنل <#${data.channel}> در دیتابیس ذخیره شده است.\nآیا تمایل به حذف آن دارید؟`,
                            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("setup-accept").setEmoji("✅").setLabel("بله").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("setup-cancel").setEmoji("❌").setLabel("خیر").setStyle(ButtonStyle.Secondary))]
                        });
                        const collect = collector.createMessageComponentCollector({ time: 60 * 1000 })
                        collect.on("collect", async (button) => {
                            switch (button.customId) {
                                case "setup-accept": {
                                    await button.deferUpdate();
                                    await db.set(`autoThread.${interaction.guild.id}`, database.filter(a => a.channel !== data.channel));
                                    return await button.editReply({
                                        content: `چنل با موفقیت از دیتابیس حذف شد.`,
                                        components: []
                                    });
                                };
                                case "setup-cancel": {
                                    return collect.stop();
                                };
                            }
                        });
                        collect.on("end", async () => {
                            return await interaction.deleteReply();
                        });
                    } else {
                        await db.push(`autoThread.${interaction.guild.id}`, data);
                        const embed = new EmbedBuilder()
                            .setColor("Green")
                            .setTitle("اوتو ثرید")
                            .setDescription("سیستم اوتو ثرید برای چنل مورد نظر با موفقیت انجام شد.")
                            .setFooter({ text: `Admin Embed • ${copyRight.footerText}` })
                            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
                            .addFields([{
                                name: "چنل:",
                                value: `**<#${data.id}>**`,
                                inline: false
                            }, {
                                name: "اسم ثرید:",
                                value: `\`${data.name}\``,
                                inline: false
                            }])
                            .setTimestamp();

                        return await interaction.editReply({
                            embeds: [embed]
                        });
                    };
                    break;
                }

                case "welcome": {
                    const channel = interaction.options.getChannel("channel");
                    const message = interaction.options.getString("message");
                    const data = {
                        channel: channel.id,
                        message: message ?? "Dear {member} Welcome to **{guild}** Server 👋🏻 ♥"
                    };
                    const database = await db.get(`welcome.${interaction.guild.id}`);
                    const variables = [
                        {
                            name: "{member}",
                            description: "منشن شدن یوزری که جوین شده."
                        },
                        {
                            name: "{memberName}",
                            description: "نمایش اسم یوزری که جوین شده."
                        },
                        {
                            name: "{guild}",
                            description: "نمایش اسم سرور"
                        },
                        {
                            name: "{next}",
                            description: "رفتن به لاین یا خط بعدی."
                        },
                        {
                            name: "{count}",
                            description: "نمایش تعداد ممبرای سرور."
                        }

                    ];
                    await interaction.deferReply({ ephemeral: false });
                    if (database && database.channel === data.channel) {
                        const collector = await interaction.editReply({
                            content: `قبلا چنل <#${data.channel}> در دیتابیس ذخیره شده است.\nآیا تمایل به حذف آن دارید؟`,
                            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("setup-accept").setEmoji("✅").setLabel("بله").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("setup-cancel").setEmoji("❌").setLabel("خیر").setStyle(ButtonStyle.Secondary))]
                        });
                        const collect = collector.createMessageComponentCollector({ time: 60 * 1000 })
                        collect.on("collect", async (button) => {
                            switch (button.customId) {
                                case "setup-accept": {
                                    await button.deferUpdate();
                                    await db.delete(`welcome.${interaction.guild.id}`);
                                    return await button.editReply({
                                        content: `چنل با موفقیت از دیتابیس حذف شد.`,
                                        components: []
                                    });
                                };
                                case "setup-cancel": {
                                    return collect.stop();
                                };
                            }
                        });
                        collect.on("end", async () => {
                            return await interaction.deleteReply();
                        });
                    } else {
                        await db.set(`welcome.${interaction.guild.id}`, data);
                        const embed = new EmbedBuilder()
                            .setColor("Green")
                            .setTitle("خوش آمدگویی")
                            .setDescription("سیستم ولکامینگ سرور با موفقیت ست شد و در دیتابیس ذخیره شد.")
                            .setFooter({ text: `Admin Embed • ${copyRight.footerText}` })
                            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
                            .addFields([{
                                name: "چنل:",
                                value: `**<#${data.channel}>**`,
                                inline: false
                            }, {
                                name: "پیغام همراه با عکس:",
                                value: `\`${data.message}\``,
                                inline: false
                            }, {
                                name: "متغیرها:",
                                value: `**${variables.map(a => `\`${a.name}\` | ${a.description}`).join("\n")}**`,
                                inline: false
                            }])
                            .setTimestamp();

                        return await interaction.editReply({
                            embeds: [embed]
                        })
                    }
                    break;
                }

                case "ticket-message": {
                    const text = interaction.options.getString("content");
                    const channel = interaction.options.getChannel("channel") || interaction.channel;
                    const description = interaction.options.getString("description");
                    const color = interaction.options.getString("color");
                    const title = interaction.options.getString("title");
                    const image = interaction.options.getAttachment("image_url");
                    const footer_text = interaction.options.getString("footer_text");
                    const footer_iconURL = interaction.options.getAttachment("footer_iconurl");
                    const author_text = interaction.options.getString("author_text");
                    const author_iconURL = interaction.options.getAttachment("author_iconurl");
                    const timestamp = interaction.options.getBoolean("timestamp");
                    const thumbnail = interaction.options.getAttachment("thumbnail");
                    const file = interaction.options.getAttachment("file");
                    const embed = new EmbedBuilder();
                    if (color) {
                        embed.setColor(`${color}`);
                    };
                    if (description) {
                        embed.setDescription(`${description.replaceAll("{next}", "\n")}`)
                    };
                    if (thumbnail) {
                        embed.setThumbnail(`${thumbnail.url}`)
                    };
                    if (image) {
                        embed.setImage(`${image.url}`)
                    };
                    if (timestamp === true) {
                        embed.setTimestamp(new Date())
                    };
                    if (title) {
                        embed.setTitle(`${title.replaceAll("{next}", "\n")}`)
                    };
                    if (!author_iconURL && author_text) {
                        embed.setAuthor({
                            name: `${author_text.replaceAll("{next}", "\n")}`
                        })
                    };
                    if (author_iconURL && !author_text) {
                        return await interaction.reply({
                            content: `شما نمیتوانید یک آثور فقط با عکس داشته باشید دوباره تلاش کنید.\nدفه ی بعد بخش author_text رو پر کن.`,
                            ephemeral: true
                        })
                    };
                    if (author_iconURL && author_text) {
                        embed.setAuthor({
                            name: `${author_text.replaceAll("{next}", "\n")}`,
                            iconURL: `${author_iconURL.url}`
                        });
                    };
                    if (!footer_iconURL && footer_text) {
                        embed.setFooter({
                            text: `${footer_text.replaceAll("{next}", "\n")}`
                        });
                    };
                    if (footer_iconURL && !footer_text) {
                        return await interaction.reply({
                            content: `شما نمیتوانید یک فوتر فقط با عکس داشته باشید دوباره تلاش کنید.\nدفه ی بعد بخش footer_text رو پر کن.`,
                            ephemeral: true
                        })
                    };
                    if (footer_iconURL && footer_text) {
                        embed.setFooter({
                            text: `${footer_text.replaceAll("{next}", "\n")}`,
                            iconURL: `${footer_iconURL.url}`
                        })
                    };
                    const embeds = embed.data.description || embed.data.title || embed.data.author || embed.data.footer || embed.data.image || embed.data.thumbnail;
                    if (embeds || text || file) {
                        await interaction.reply({
                            content: `مسیج شما با موفقیت در چنل ${channel} ارسال شد.`,
                            ephemeral: true
                        });
                        const message = await channel.send({
                            content: text ? text.replaceAll("{next}", "\n") : " ",
                            embeds: embeds ? [embed] : [],
                            files: file ? [file] : []
                        });
                        return await db.set(`ticket.${interaction.guild.id}`, {
                            channel: channel.id,
                            id: message.id
                        });
                    } else if (!embeds && !text && !file) {
                        return await interaction.reply({
                            content: `شما نمیتوانید بدون هیچ محتوایی یه مسیج در چنل بفرستید.`,
                            ephemeral: true
                        })
                    }
                    break;
                }

                case "ticket-menu": {
                    const name = interaction.options.getString("name");
                    const emoji = interaction.options.getString("emoji");
                    const role = interaction.options.getRole("role");
                    const admin = role ? `${role.id}` : "noRoleToAddHere";

                    const ticket = await db.get(`ticket.${interaction.guild.id}`);
                    if (!ticket) return await interaction.reply({
                        content: "لطفا ابتدا مسیج تیکت را بفرستید تا بات اوتوماتیک خودش به طور مستقیم به مسیج منو رو اد کنه.",
                        ephemeral: true
                    });

                    const channel = interaction.guild.channels.cache.get(ticket.channel);
                    if (!channel) return await interaction.reply({
                        content: "چنلی که در دیتابیس ست شده توی سرور پیدا نشد.\nلطفا دوباره مسیج تیکت رو ست کنید.",
                        ephemeral: true
                    });

                    const message = await channel.messages.fetch(ticket.id).catch(e => e);
                    if (!message || !message.id || !message.components || message.channel.id !== channel.id) return await interaction.reply({
                        content: `مسیجی که در دیتابیس ست شده توی چنل ${channel} پیدا نشد.\nلطفا دوباره مسیج تیکت رو ست کنید.`,
                        ephemeral: true
                    });

                    const emote = emoji ? emoji.match(/((?<!\\)<:[^:]+:(\d+)>)|\p{Emoji_Presentation}|\p{Extended_Pictographic}/gmu) : null;
                    if (emote && emote.length <= 0) return await interaction.reply({
                        content: `لطفا یک ایموجی قابل قبول وارد کنید.`,
                        ephemeral: true
                    });

                    if (message && message.components && message.components.length > 0) {
                        const actionRow = message.components[0];
                        const menu = new StringSelectMenuBuilder(actionRow.components[0].data);
                        if (menu.options.some(a => a.data.label === name)) {
                            const collector = await interaction.editReply({
                                content: `از قبل یه آپشن با اسم **${name}** ساخته شده آیا میخواهید حذفش کنید؟`,
                                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("setup-accept").setEmoji("✅").setLabel("بله").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("setup-cancel").setEmoji("❌").setLabel("خیر").setStyle(ButtonStyle.Secondary))],
                                ephemeral: true,
                                fetchReply: true
                            });
                            const collect = collector.createMessageComponentCollector({ time: 60 * 1000 })
                            collect.on("collect", async (button) => {
                                switch (button.customId) {
                                    case "setup-accept": {
                                        await button.deferUpdate();
                                        const options = menu.options.filter(a => a.data.label !== name);
                                        menu.setOptions(options);
                                        let row;
                                        if (options.length > 0) row = [new ActionRowBuilder().addComponents(menu)];
                                        else row = [];
                                        await message.edit({
                                            components: row
                                        });
                                        return await button.editReply({
                                            content: `آپشن با موفقیت از مسیج حذف شد.`,
                                            components: []
                                        });
                                    };
                                    case "setup-cancel": {
                                        return collect.stop()
                                    };
                                }
                            });
                            collect.on("end", async () => {
                                return await interaction.deleteReply();
                            });
                        } else {
                            let option = {
                                label: name,
                                value: `ticket-${admin}-${name}`
                            };
                            if (emoji && emote.length > 0) {
                                option.emoji = emote[0]
                            };
                            menu.addOptions(option);
                            await message.edit({
                                components: [new ActionRowBuilder().addComponents(menu)]
                            });
                            return await interaction.reply({
                                content: `آپشن با موفقیت روی منوی مسیج تیکت اد شد.`,
                                ephemeral: true
                            });
                        };
                    } else {
                        let option = {
                            label: name,
                            value: `ticket-${admin}-${name}`
                        };
                        if (emoji && emote.length > 0) {
                            option.emoji = emote[0]
                        };
                        const menu = new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("ticket")
                                    .setPlaceholder("Click here to open a ticket!")
                                    .addOptions(option)
                                    .setMaxValues(1)
                            );

                        await message.edit({ components: [menu] });
                        return await interaction.reply({
                            content: `منو با موفقیت روی مسیج تیکت اد شد.`,
                            ephemeral: true
                        });
                    }
                    break;
                }

                case "stats": {
                    const channel = interaction.options.getChannel("channel");
                    const name = interaction.options.getString("name");
                    const type = interaction.options.getString("type");
                    const variables = [];
                    let cleanName;
                    await interaction.deferReply({ ephemeral: false });
                    const database = await db.get(`stats.${interaction.guild.id}`);
                    if (database && database.some(a => a.channel === channel.id)) {
                        const collector = await interaction.editReply({
                            content: `قبلا چنل <#${channel.id}> در دیتابیس ذخیره شده است.\nآیا تمایل به حذف آن دارید؟`,
                            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("accept").setEmoji("✅").setLabel("بله").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("cancel").setEmoji("❌").setLabel("خیر").setStyle(ButtonStyle.Secondary))]
                        });
                        const collect = collector.createMessageComponentCollector({ time: 60 * 1000 })
                        collect.on("collect", async (button) => {
                            switch (button.customId) {
                                case "accept": {
                                    await button.deferUpdate();
                                    await db.set(`stats.${interaction.guild.id}`, database.filter(a => a.channel !== channel.id));
                                    return await button.editReply({
                                        content: `چنل با موفقیت از دیتابیس حذف شد.`,
                                        components: []
                                    });
                                };
                                case "cancel": {
                                    return collect.stop();
                                };
                            }
                        });
                        collect.on("end", async () => {
                            await interaction.deleteReply();
                        });
                    } else {
                        if (type === "gmc") {
                            cleanName = "Members {count}";
                            variables.push({
                                name: "{count}",
                                description: "تعداد ممبرای توی سرور با این جایگزین میشه."
                            });
                        } else if (type === "gvmc") {
                            cleanName = "Voice Players {count}";
                            variables.push({
                                name: "{count}",
                                description: "تعداد افرادی که توی ویس حاضر هستن با این جایگزین میشه."
                            });
                        } else {
                            cleanName = "Today Date {year}/{month}/{day}";
                            variables.push({
                                name: "{year}",
                                description: "سال حاضر رو نشون میده."
                            });
                            variables.push({
                                name: "{month}",
                                description: "ماه حاضر رو نشون میده."
                            });
                            variables.push({
                                name: "{day}",
                                description: "روز حاضر رو نشون میده."
                            });
                            variables.push({
                                name: "{hour}",
                                description: "ساعت حاضر رو نشون میده."
                            });
                            variables.push({
                                name: "{minute}",
                                description: "دقیقه حاضر رو نشون میده."
                            });
                        };
                        const data = {
                            channel: channel.id,
                            type: type,
                            name: name ?? cleanName
                        };
                        await db.push(`stats.${interaction.guild.id}`, data);
                        const embed = new EmbedBuilder()
                            .setColor("Green")
                            .setTitle("اطلاعات")
                            .setDescription("سیستم نمایش اطلاعات بر روی اسم چنل با موفقیت در دیتابیس سیو شد.")
                            .setFooter({ text: `Admin Embed • ${copyRight.footerText}` })
                            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
                            .addFields([{
                                name: "چنل:",
                                value: `**<#${data.channel}>**`,
                                inline: false
                            }, {
                                name: "نوع:",
                                value: `\`${data.type}\``,
                                inline: false
                            }, {
                                name: "اسم:",
                                value: `\`${data.name}\``,
                                inline: false
                            }, {
                                name: "متغیر ها:",
                                value: `**${variables.map(a => `\`${a.name}\` | ${a.description}`).join("\n")}**`,
                                inline: false
                            }])
                            .setTimestamp();

                        return await interaction.editReply({
                            embeds: [embed]
                        });
                    }
                    break;
                }
                case "only-media": {
                    const channel = interaction.options.getChannel("channel");
                    const data = channel.id;
                    const database = await db.get(`onlyMedia.${interaction.guild.id}`);
                    await interaction.deferReply({ ephemeral: false });
                    if (database && database.includes(data)) {
                        const collector = await interaction.editReply({
                            content: `قبلا چنل <#${data}> در دیتابیس ذخیره شده است.\nآیا تمایل به حذف آن دارید؟`,
                            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("accept").setEmoji("✅").setLabel("بله").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("cancel").setEmoji("❌").setLabel("خیر").setStyle(ButtonStyle.Secondary))]
                        });
                        const collect = collector.createMessageComponentCollector({ time: 60 * 1000 })
                        collect.on("collect", async (button) => {
                            switch (button.customId) {
                                case "accept": {
                                    await button.deferUpdate();
                                    await db.pull(`onlyMedia.${interaction.guild.id}`, data);
                                    return await button.editReply({
                                        content: `چنل با موفقیت از دیتابیس حذف شد.`,
                                        components: []
                                    });
                                };
                                case "cancel": {
                                    return collect.stop();
                                };
                            }
                        });
                        collect.on("end", async () => {
                            await interaction.deleteReply()
                        });
                    } else {
                        await db.push(`onlyMedia.${interaction.guild.id}`, data);
                        const embed = new EmbedBuilder()
                            .setColor("Green")
                            .setTitle("فقط مدیا")
                            .setDescription("چنل مورد نظر تحت عنوان فقط برای مدیا (عکس و ویدیو) باموفقیت در دیتابیس ذخیره شد.")
                            .setFooter({ text: `Admin Embed • ${copyRight.footerText}` })
                            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
                            .addFields([{
                                name: "چنل:",
                                value: `**<#${data}>**`,
                                inline: false
                            }])
                            .setTimestamp();

                        return await interaction.editReply({
                            embeds: [embed]
                        })
                    }
                    break;
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