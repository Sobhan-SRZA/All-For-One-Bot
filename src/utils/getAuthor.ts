import { CommandInteraction, Message } from "discord.js";
import error from "./error";

export default function getAuthor(interaction: CommandInteraction | Message) {
  try {
    if (interaction instanceof CommandInteraction)
      return interaction.user;

    else
      return interaction.author;
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