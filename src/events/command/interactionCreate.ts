import { CommandInteractionOptionResolver, Interaction, MessageFlags } from "discord.js";
import DiscordClient from "../../classes/Client";
import Database from "../../classes/Database";
import checkCmdPerms from "../../utils/checkCmdPerms";
import checkCmdCooldown from "../../utils/checkCmdCooldown";
import error from "../../utils/error";

export default async (client: DiscordClient, interaction: Interaction) => {
  try {
    const db = new Database(client.db!);

    // Load Slash Commands
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      // Command Handler
      if (command && command.only_slash) {
        if (interaction.channel!.isDMBased() && !command.data.dm_permission)
          return;

        // Filter Owners Commands
        if (command.only_owner)
          if (!client.config.discord.support.owners.includes(interaction.user.id))
            return await interaction.reply({
              flags: MessageFlags.Ephemeral,
              content: "این کامند فقط برای دولوپر هستش."
            })


        // Check command perms
        if (interaction.guild)
          if (await checkCmdPerms(interaction, command))
            return;

        // Command cooldown
        if (await checkCmdCooldown(interaction, command))
          return;

        // Use flags conditionally
        const ephemeralOption = interaction.options instanceof CommandInteractionOptionResolver
          ? interaction.options.getString("ephemeral") === "true"
          : false;

        const replyFlags = ephemeralOption ? MessageFlags.Ephemeral : undefined;

        // Command Handler 
        const DeferReply = async () => { // This function is for "unknow interaction" error.
          try {
            await interaction.deferReply({
              flags: replyFlags,
              withResponse: true
            });
          } catch {
            await DeferReply();
          }
        };
        if (command.data.options && (command.data.options?.find(a => a.name === "ephemeral") || command.data.options?.filter(a => a.type === 1)?.find(a => a.options?.find(b => b.name === "ephemeral"))))
          await DeferReply();

        await db.add("totalCommandsUsed", 1);
        return await command.run(client, interaction);
      }
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