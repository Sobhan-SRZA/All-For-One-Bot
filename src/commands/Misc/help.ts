import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, EmbedBuilder, GuildMember, Message, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import CommandType from "../../types/command";
import error from "../../utils/error";
import DiscordClient from "../../classes/Client";
import response from "../../utils/response";
import getAuthor from "../../utils/getAuthor";
const command: CommandType = {
  data: {
    name: "help",
    description: "لیست دستورات بات.",
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
  },
  category: "member",
  aliases: ["h", "commands"],
  cooldown: 10,
  only_owner: false,
  only_slash: true,
  only_message: true,

  run: async (client, interaction, args) => {
    try {
      const
        user = getAuthor(interaction)!,
        embed = new EmbedBuilder()
          .setAuthor(
            {
              name: `${client.user!.username} Help`
            }
          )
          .setFooter(
            {
              text: `درخواست شده توسط ${user.tag}`,
              iconURL: user.displayAvatarURL({ forceStatic: true })
            }
          )
          .setColor("Blue")
          .setDescription(`## Admin's Commands List:\n${cmds_info_list_str(client, "admin", client.config.discord.prefix)}\n\n## Member's Commands List:\n${cmds_info_list_str(client, "member", client.config.discord.prefix)}`)
          .setThumbnail(client.user!.displayAvatarURL({ forceStatic: true }));

      await response(interaction, {
        embeds: [embed]
      });

      return;

      // Functions
      function cmds_info_list_str(client: DiscordClient, category_name: string, prefix: string) {
        let description = "";
        client.commands
          .filter(c => c.category === category_name)
          .forEach((cmd) => {
            if (cmd.only_slash && cmd.data.options && cmd.data.options.some(op => op.type === 1)) {
              const name = [];
              if (cmd.data.options && cmd.data.options.some(op => op.type === 1))
                cmd.data.options.forEach((option) => {
                  name.push({ name: cmd.data.name + " " + option.name, description: option.description })
                });

              else
                name.push({ name: cmd.data.name, description: cmd.data.description })

              name.forEach(element => {
                description += `\n\n**${cmd.only_slash ?
                  `</${element.name}:${cmd.data.id}>` : ""}${cmd.only_message ?
                    `${prefix}${element.name} ${cmd.usage ? cmd.usage : ""}` : ""}\nDescription: \`${element.description}\`**`;
              });
            }

            else
              description += `\n\n**${cmd.only_slash ?
                `</${cmd.data.name}:${cmd.data.id}>` : ""}${cmd.only_slash && cmd.only_message ? " | " : ""}${cmd.only_message ?
                  `${prefix}${cmd.data.name} ${cmd.usage ? cmd.usage : ""}` : ""}${cmd.aliases && cmd.aliases.length > 0 ?
                    `\nAliases: [${cmd.aliases.map(a => `\`${a}\``).join(", ")}]` : ""}\nDescription: \`${cmd.data.description}\`**`;

          });

        return description;
      }
    } catch (e: any) {
      error(e)
    }
  }
};
export default command;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */