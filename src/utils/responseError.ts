import { CommandInteraction, EmbedBuilder, InteractionReplyOptions, Message, MessageEditOptions, MessageFlags, MessageReplyOptions } from "discord.js";
import EmbedData from "../storage/embed";
import HexToNumber from "../functions/HexToNumber";
import error from "./error";

export default async function responseError(
  interaction: CommandInteraction | Message,
  log?: string,
  data?: InteractionReplyOptions | MessageReplyOptions,
  isUpdateNeed?: boolean,
  message?: Message
) {
  try {
    if (!data)
      data = {
        embeds: [
          new EmbedBuilder()
            .setColor(HexToNumber(EmbedData.color.red))
            .setFooter(
              {
                text: EmbedData.footer.footerText,
                iconURL: EmbedData.footer.footerIcon
              }
            )
            .setTitle("An error occurred!")
            .setDescription(log!)
        ]
      };

    if (interaction instanceof CommandInteraction) {
      data.flags = MessageFlags.Ephemeral;
      if (isUpdateNeed)
        return await interaction.editReply(data as InteractionReplyOptions);

      else return await interaction.reply(data as InteractionReplyOptions);
    }

    else {
      if (isUpdateNeed && message) return await message.edit(data as MessageEditOptions);

      else return await interaction.reply(data as MessageReplyOptions);
    }
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