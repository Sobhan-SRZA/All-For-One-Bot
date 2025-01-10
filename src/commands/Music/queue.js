const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { useQueue } = require("discord-player");
const error = require("../../functions/error");
const copyRight = require("../../storage/copyRight.json");
const { ButtonBuilder } = require("discord-gamecord/utils/utils");
const response = require("../../functions/response");
module.exports = {
  name: "queue",
  description: "Show tracks in the queue.",
  category: "music",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks", "Connect", "Speak"],
  dm_permissions: false,
  only_owner: false,
  only_slash: true,
  only_message: true,
  // options: [
  //   {
  //     name: "page",
  //     description: "The page number of the queue",
  //     type: ApplicationCommandOptionType.Number,
  //     required: false
  //   }
  // ],

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {Array<string>} args 
   * @returns 
   */
  run: async (client, interaction, args) => {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return await response(interaction, {
        content: "I’m currently not playing in this server.",
        ephemeral: true
      });

    const memberChannelId = interaction.member?.voice?.channelId;
    const queueChannelId = queue?.channel.id;
    if (!memberChannelId)
      return await response(interaction, {
        content: "You need to join a voice channel first!",
        ephemeral: true
      });

    if (memberChannelId !== queueChannelId)
      return await response(interaction, {
        content: "You must be in the same voice channel as me!",
        ephemeral: true
      });

    if (!queue.size) return await response(interaction, "There is no track in the queue.");

    // let page = interaction.options.getNumber("page", false) ?? 1;

    const multiple = 12;

    // const maxPages = Math.ceil(queue.size / multiple);

    // if (page < 1 || page > maxPages) page = 1;

    // const end = page * multiple;
    // const start = end - multiple;

    const tracks = queue.tracks.toArray();

    // const embed = new EmbedBuilder()
    //   .setDescription(
    //     `${tracks
    //       .map(
    //         (track, i) =>
    //           `${start + ++i} - [${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`
    //       )
    //       .join("\n")}`
    //   )
    //   .setFooter({
    //     text: `Page ${page} of ${maxPages} | track ${start + 1} to ${end > queue.size ? `${queue.size}` : `${end}`
    //       } of ${queue.size}`,
    //     iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
    //   });

    // return await response(interaction, { ephemeral: true, embeds: [embed] }).catch(error);

    if (interaction.user) await interaction.deferReply({ ephemeral: false });

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
    let generateEmbed = async (array, number) => {
      let current = array.slice(number, number + multiple);
      let embed = new EmbedBuilder({
        title: `${page}/${Math.ceil(array.length / multiple)} | Queue Size: ${(array.length).toLocaleString()}`,
        footer: {
          text: copyRight.footerText,
          icon_url: copyRight.footerIcon
        },
        description:
          `${tracks
            .map(
              (track, i) =>
                `${((page * multiple) - multiple) + ++i} - [${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`
            )
            .join("\n")}`
        // fields: await Promise.all(
        //   current.map((track, index) => ({
        //     name: `${((page * multiple) - multiple) + ++index}• [${track.title}](${track.url})`,
        //     value: `**${track.author} ~ [${track.requestedBy.toString()}]**`,
        //     inline: true
        //   }))
        // )
      });
      return embed.setColor("Yellow");
    };
    let canFitOnOnePage = tracks.length <= multiple;
    let embedMessage = await response(interaction, {
      embeds: [await generateEmbed(tracks, 0)],
      components: canFitOnOnePage ? [] : [new ActionRowBuilder({ components: [dubbleBackButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), dubbleForwardButton.setDisabled(false)] })],
      fetchReply: true
    });
    if (canFitOnOnePage) return;
    let collector = embedMessage.createMessageComponentCollector({
      filter: ({ user }) => user.id === interaction.user.id,
      time: 60000
    })

    let currentIndex = 0;
    collector.on("collect", async int => {
      let lastPage = Math.ceil(tracks.length / multiple);
      if (int.customId === "back") {
        (currentIndex -= multiple);
        (page -= 1);
      } else if (int.customId === "forward") {
        (currentIndex += multiple);
        (page += 1);
      };
      int.customId === "dubble_back" ? (page = 1) : null;
      int.customId === "dubble_forward" ? (page = lastPage) : null;
      await int.update({
        embeds: [await generateEmbed(tracks, currentIndex)],
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
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/