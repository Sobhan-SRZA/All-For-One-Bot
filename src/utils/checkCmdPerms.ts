import { CommandInteraction, EmbedBuilder, GuildChannel, GuildMember, Message, MessageFlags, PermissionsBitField } from "discord.js";
import CommandType from "../types/command";
import error from "./error";

export default async function checkCmdPerms(
  interaction: CommandInteraction | Message,
  command: CommandType,
  prefix: string | null = null,
  args: string[] | null = null
): Promise<boolean | void> {
  try {
    const mentionCommand = prefix
      ? `\`${prefix + command.data.name}${command.data.options?.some((a) => a.type === 1 && a.name === args?.[0])
        ? ` ${command.data.options.find((a) => a.name === args![0])!.name}`
        : ""
      }\``
      : `</${command.data.name}${interaction instanceof CommandInteraction && interaction.options?.data.some((a) => a.type === 1)
        ? ` ${interaction.options.data.find((a) => a.type === 1)!.name}`
        : ""
      }:${command.data.id}>`;

    const channel = interaction.channel;
    if (channel && channel.isTextBased() && channel instanceof GuildChannel) {
      if (
        !channel
          .permissionsFor(interaction.client.user!)
          ?.has(command.data.default_bot_permissions ?? [])
      ) {
        if (interaction instanceof CommandInteraction && !interaction.replied)
          await interaction.reply({
            flags: MessageFlags.Ephemeral,
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `ربات که من باشم دسترسی لازم برای ران کردن کامند ${mentionCommand} رو ندارم!!\nدسترسی های لازم: [${new PermissionsBitField(
                    command.data.default_bot_permissions
                  )
                    .toArray()
                    .map((a) => `"${a}"`)
                    .join(", ")}]`
                )
                .setColor("Orange")
            ],
          });

        else
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `ربات که من باشم دسترسی لازم برای ران کردن کامند ${mentionCommand} رو ندارم!!\nدسترسی های لازم: [${new PermissionsBitField(
                    command.data.default_bot_permissions
                  )
                    .toArray()
                    .map((a) => `"${a}"`)
                    .join(", ")}]`
                )
                .setColor("Orange")
            ],
          });


        return true;
      }
    }

    const member = interaction.member;
    if (member && member instanceof GuildMember) {
      if (!member?.permissions.has(command.data.default_member_permissions ?? [])) {
        if (interaction instanceof CommandInteraction && !interaction.replied)
          await interaction.reply({
            flags: MessageFlags.Ephemeral,
            embeds: [
              new EmbedBuilder()
                .setDescription(`ببین پسر خوب تو دسترسی های لازم برای استفاده از کامند ${mentionCommand} رو نداری!!\nدسترسی های لازم: [${new PermissionsBitField(command.data.default_member_permissions)
                  .toArray()
                  .map(a => `"${a}"`)
                  .join(", ")
                  }]`)
                .setColor("Orange")
            ]
          });

        else
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(`ببین پسر خوب تو دسترسی های لازم برای استفاده از کامند ${mentionCommand} رو نداری!!\nدسترسی های لازم: [${new PermissionsBitField(command.data.default_member_permissions)
                  .toArray()
                  .map(a => `"${a}"`)
                  .join(", ")
                  }]`)
                .setColor("Orange")
            ]
          });

        return true;
      };
    }

    return false;
  } catch (e: any) {
    error(e);
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