const {
  EmbedBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require("discord.js");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
module.exports = {
  name: "top",
  description: "یوزر های برتر در سیستم اوکونومی.",
  category: "economy",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10,
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
      let db = client.db;

      if (!await db.has(`users`)) {
        await interaction.deferReply({ ephemeral: true });
        return await interaction.editReply({
          content: `❌| هیچ یوزری وجود ندارد.`
        });
      };
      let users = Object.values(await db.get(`users`));
      await interaction.deferReply({ ephemeral: false });
      let backButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        label: "<",
        customId: "back"
      });

      let forwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        label: ">",
        customId: "forward"
      });

      let dubbleBackButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        label: "<<",
        customId: "dubble_back"
      });

      let dubbleForwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        label: ">>",
        customId: "dubble_forward"
      });

      let page = 1;
      let generateEmbed = async (array, start) => {
        let current = array.sort((a, b) => b.wallet - a.wallet).slice(start, start + 12);
        let embed = new EmbedBuilder({
          title: `صفحه - ${page}/${Math.ceil(array.length / 12)} | تعداد یوزر ها: ${(array.length).toLocaleString()}`,
          footer: {
            text: copyRight.footerText,
            icon_url: copyRight.footerIcon
          },
          fields: await Promise.all(
            current.sort((a, b) => b.wallet - a.wallet).map((user, index) => ({
              name: `${((page * 12) - 12) + ++index}• ${user.name}`,
              value: `**کیف پول:** \`${user.wallet.toLocaleString()}\` 🪙`,
              inline: true
            }))
          )
        });
        return embed.setColor("Yellow");
      };
      let canFitOnOnePage = users.length <= 12;
      await interaction.editReply({
        embeds: [await generateEmbed(users, 0)],
        components: canFitOnOnePage ? [] : [new ActionRowBuilder({ components: [dubbleBackButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), dubbleForwardButton.setDisabled(false)] })]
      })
      let embedMessage = await interaction.fetchReply();
      if (canFitOnOnePage) return;
      let collector = embedMessage.createMessageComponentCollector({
        filter: ({ user }) => user.id === interaction.user.id,
        time: 60000
      })

      let currentIndex = 0;
      collector.on("collect", async int => {
        let lastPage = Math.ceil(users.length / 12);
        if (int.customId === "back") {
          (currentIndex -= 12);
          (page -= 1);
        } else if (int.customId === "forward") {
          (currentIndex += 12);
          (page += 1);
        };
        int.customId === "dubble_back" ? (page = 1) : null;
        int.customId === "dubble_forward" ? (page = lastPage) : null;
        await int.update({
          embeds: [await generateEmbed(users, currentIndex)],
          components: [new ActionRowBuilder({
            components: [
              ...(page >= lastPage ?
                [dubbleBackButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), dubbleForwardButton.setDisabled(true)]
                : page <= 1 ?
                  [dubbleBackButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), dubbleForwardButton.setDisabled(false)]
                  : [dubbleBackButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), dubbleForwardButton.setDisabled(false)])
            ]
          })]
        })
      });
      collector.on("end", async () => {
        return await interaction.editReply({
          components: []
        });
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