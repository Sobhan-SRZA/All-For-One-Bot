import { CommandInteraction, InteractionReplyOptions, Message, MessageReplyOptions } from "discord.js";
import error from "./error";

export default async function response(interaction: CommandInteraction | Message, data: InteractionReplyOptions | MessageReplyOptions) {
  try {
    if (interaction instanceof CommandInteraction)
      return await interaction.editReply(data as InteractionReplyOptions);

    else return await interaction.reply(data as MessageReplyOptions);
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