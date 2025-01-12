import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, GuildMember, Message, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import CommandType from "../../types/command";
import error from "../../utils/error";
import DiscordClient from "../../classes/Client";
import response from "../../utils/response";
import getAuthor from "../../utils/getAuthor";
import Database from "../../classes/Database";
import HexToNumber from "../../functions/HexToNumber";
import EmbedData from "../../storage/embed";
const setup: CommandType = {
  data: {
    name: "setup",
    description: "تنظیمات ربات در سرور.",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
    ]),
    default_bot_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks
    ]),
    dm_permission: true,
    nsfw: false,
    options: [
      {
        name: "bot-channels",
        description: "چنلی که بات فقط در آنجا کار کند.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "white-list",
            description: "چنلی که کامند های بات باید کار کند.",
            type: ApplicationCommandOptionType.Channel,
            channel_types: [ChannelType.GuildText]
          },
          {
            name: "black-list",
            description: "چنلی که کامند های بات نباید کار کند.",
            type: ApplicationCommandOptionType.Channel,
            channel_types: [ChannelType.GuildText]
          },
          {
            name: "ephemeral",
            description: "آیا می‌خواهید این پیام مخفی بماند؟",
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "بله",
                value: "true"
              },
              {
                name: "خیر",
                value: "false"
              }
            ],
            required: false
          }
        ]
      }
    ]
  },
  category: "admin",
  aliases: ["set", "st"],
  cooldown: 10,
  only_owner: false,
  only_slash: true,
  only_message: true,

  run: async (client, interaction, args) => {
    try {
      const
        user = getAuthor(interaction)!,
        db = new Database(client.db!),
        Subcommand = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getSubcommand() : args![0];

      switch (Subcommand) {
        case "bot-channels": {
          const
            whiteListChannel = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getChannel("white-list") : args![1],
            blackListChannel = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getChannel("black-list") : args![2],
            embed = new EmbedBuilder()
              .setAuthor({ name: "Admin Panel | bot-channels" })
              .setColor(HexToNumber(EmbedData.color.theme));

          if (!whiteListChannel && !blackListChannel) {
            return;
          }

          if (whiteListChannel) { }
          break;
        }

        default: {
          break;
        }
      }

    } catch (e: any) {
      error(e)
    }
  }
};
export default setup;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */