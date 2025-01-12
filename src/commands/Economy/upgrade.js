const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const economy = require("../../storage/economy.json");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
  name: "upgrade",
  description: "سطح آیتم های خود را افزایش دهید.",
  category: "economy",
  type: ApplicationCommandType.ChatInput,
  cooldown: 30,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: false,
  options: [{
    name: "miners",
    type: ApplicationCommandOptionType.Subcommand,
    description: "خرید و افزایش تعداد ماینر ها."
  }, {
    name: "home",
    type: ApplicationCommandOptionType.Subcommand,
    description: "افزایش سطح خانه."
  }, {
    name: "work",
    type: ApplicationCommandOptionType.Subcommand,
    description: "افزایش سطح کار."
  }, {
    name: "rob",
    type: ApplicationCommandOptionType.Subcommand,
    description: "افزایش سطح دزدی."
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
      if (!await db.has(`users.${interaction.user.id}`)) {
        await interaction.deferReply({ ephemeral: true });
        const cmd = client.application.commands.cache.find(c => c.name === "register");
        return await interaction.editReply({
          content: `❌| شما هیچ پروفایلی در بات ندارید.\n(با استفاده از کامند </${cmd.name}:${cmd.id}> برای خود پروفایل بسازید.)`
        });
      };
      const profile = await db.get(`users.${interaction.user.id}`);
      switch (interaction.options.getSubcommand()) {
        case "miners": {
          const price = economy.miner_price;
          if (profile.miner >= Object.values(economy.miner).length) {
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما بیشترین سطح ممکن را دارید.\n(بیشترین سطح ممکن \`${Object.values(economy.miner).length}\` است.)`
            });
          };

          if (profile.home * 2 <= profile.miner) {
            const cmd = client.application.commands.cache.find(c => c.name === "upgrade");
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما نمیتوانید ماینر هایبیشتری بخرید زیا که بایستی سطح خانه ی خود را افزایش دهید.\n(برای افزایش سطح خانه از کامند </${cmd.name} home:${cmd.id}> استفاده کنید.)`
            });
          };

          if (profile.wallet < price) {
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما پول کافی برای افزایش سطح را ندارید.\n(هزینه ی خرید هر ماینر \`${price.toLocaleString()}\`🪙 است ولی شما فقط \`${profile.wallet.toLocaleString()}\`🪙 دارید.)`
            });
          };

          await interaction.deferReply({ ephemeral: false });
          await db.sub(`users.${interaction.user.id}.wallet`, price);
          await db.add(`users.${interaction.user.id}.miner`, 1);
          const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Economy | Upgrade - Miners")
            .setDescription("سطح ماینر های شما با موفقیت افزایش یافت.")
            .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
            .addFields([{
              name: "مبلغ برداشتی:",
              value: `${price.toLocaleString()} 🪙`,
              inline: true
            }, {
              name: "سطح ماینر:",
              value: `${profile.miner} Level ⛏`,
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
        }

        case "home": {
          const price = economy.home[profile.home + 1];
          if (profile.home >= Object.values(economy.home).length) {
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما بیشترین سطح ممکن را دارید.\n(بیشترین سطح ممکن \`${Object.values(economy.home).length}\` است.)`
            });
          };

          if (profile.wallet < price) {
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما پول کافی برای افزایش سطح را ندارید.\n(مبلغ هزینه ی سطح بعدی \`${price.toLocaleString()}\`🪙 است ولی شما فقط \`${profile.wallet.toLocaleString()}\`🪙 دارید.)`
            });
          };

          await interaction.deferReply({ ephemeral: false });
          await db.sub(`users.${interaction.user.id}.wallet`, price);
          await db.add(`users.${interaction.user.id}.home`, 1);
          const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Economy | Upgrade - Home")
            .setDescription("سطح خانه ی شما با موفقیت افزایش یافت.")
            .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
            .addFields([{
              name: "مبلغ برداشتی:",
              value: `${price.toLocaleString()} 🪙`,
              inline: true
            }, {
              name: "سطح خانه:",
              value: `${profile.home} Level 🏡`,
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
        }

        case "work": {
          const price = economy.work_price;
          if (profile.work >= Object.values(economy.work).length) {
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما بیشترین سطح ممکن را دارید.\n(بیشترین سطح ممکن \`${Object.values(economy.work).length}\` است.)`
            });
          };

          if (profile.wallet < price) {
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما پول کافی برای افزایش سطح را ندارید.\n(مبلغ هزینه ی سطح بعدی \`${price.toLocaleString()}\`🪙 است ولی شما فقط \`${profile.wallet.toLocaleString()}\`🪙 دارید.)`
            });
          };

          await interaction.deferReply({ ephemeral: false });
          await db.sub(`users.${interaction.user.id}.wallet`, price);
          await db.add(`users.${interaction.user.id}.work`, 1);
          const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Economy | Upgrade - Work")
            .setDescription("سطح کار شما با موفقیت افزایش یافت.")
            .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
            .addFields([{
              name: "مبلغ برداشتی:",
              value: `${price.toLocaleString()} 🪙`,
              inline: true
            }, {
              name: "سطح کار:",
              value: `${profile.work} Level 💼`,
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
        }

        case "rob": {
          const price = economy.rob_price;
          if (profile.work >= Object.values(economy.rob).length) {
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما بیشترین سطح ممکن را دارید.\n(بیشترین سطح ممکن \`${Object.values(economy.rob).length}\` است.)`
            });
          };

          if (profile.wallet < price) {
            await interaction.deferReply({ ephemeral: true });
            return await interaction.editReply({
              content: `❌| شما پول کافی برای افزایش سطح را ندارید.\n(مبلغ هزینه ی سطح بعدی \`${price.toLocaleString()}\`🪙 است ولی شما فقط \`${profile.wallet.toLocaleString()}\`🪙 دارید.)`
            });
          };

          await interaction.deferReply({ ephemeral: false });
          await db.sub(`users.${interaction.user.id}.wallet`, price);
          await db.add(`users.${interaction.user.id}.rob`, 1);
          const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Economy | Upgrade - Rob")
            .setDescription("سطح دزدی شما با موفقیت افزایش یافت.")
            .setFooter({ text: `Economy Embed • ${copyRight.footerText}` })
            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
            .addFields([{
              name: "مبلغ برداشتی:",
              value: `${price.toLocaleString()} 🪙`,
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
        }
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