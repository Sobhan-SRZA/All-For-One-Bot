import { Collection, CommandInteraction, EmbedBuilder, Message, MessageFlags } from "discord.js";
import CommandType from "../types/command";
import client from "../../index";
import error from "./error";
export default async function checkCmdCooldown(
  interaction: CommandInteraction | Message,
  command: CommandType,
  prefix: string | null = null,
  args: string[] | null = null
): Promise<boolean | void> {
  try {
    const
      userId = (interaction instanceof CommandInteraction ? interaction.user.id : interaction.author?.id),
      mentionCommand = prefix
        ? `\`${prefix + command.data.name}${command.data.options?.some((a) => a.type === 1 && a.name === args?.[0])
          ? ` ${command.data.options.find((a) => a.name === args![0])!.name}`
          : ""
        }\``
        : `</${command.data.name}${interaction instanceof CommandInteraction && interaction.options?.data.some((a) => a.type === 1)
          ? ` ${interaction.options.data.find((a) => a.type === 1)!.name}`
          : ""
        }:${command.data.id}>`;
    if (!client.cooldowns.has(command.data.name))
      client.cooldowns.set(command.data.name, new Collection());

    const
      timestamps = client.cooldowns.get(command.data.name)!,
      defaultCooldownDuration = 3,
      cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(userId)) {
      const expirationTime = timestamps.get(userId)! + cooldownAmount;
      if (Date.now() < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        if (interaction instanceof CommandInteraction && !interaction.replied)
          await interaction.reply({
            flags: MessageFlags.Ephemeral,
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `**-# به دلیل استفاده بیش از حد، شما موقتا از دستور ${mentionCommand} محروم شده‌اید. دوباره پس از <t:${expiredTimestamp}:R> می‌توانید از آن استفاده کنید.**`
                )
                .setColor("Orange")
            ],
          });

        else
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `**-# به دلیل استفاده بیش از حد، شما موقتا از دستور ${mentionCommand} محروم شده‌اید. دوباره پس از <t:${expiredTimestamp}:R> می‌توانید از آن استفاده کنید.**`
                )
                .setColor("Orange")
            ],
          });

        return true;
      };
    };

    timestamps.set(userId, Date.now());
    setTimeout(() => timestamps.delete(userId), cooldownAmount);

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