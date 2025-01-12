const {
  EmbedBuilder,
  PermissionsBitField,
  ApplicationCommandOptionType,
  Collection
} = require("discord.js");
const error = require("../../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CommandInteraction} interaction 
 * @returns 
 */
module.exports = async (client, interaction) => {
  try {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command) {
        const args = [];
        for (let option of interaction.options.data) {
          if (option.type === ApplicationCommandOptionType.Subcommand) {
            if (option.name) args.push(option.name);

            option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
            })
          } else if (option.value) args.push(option.value);
        };

        if (command.only_owner) {
          if (!client.config.owners.includes(interaction.user.id)) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`این کامند جیززه پسر خوب برو پی بچه بازی آفرین گل پسر.`).setColor("Orange")], ephemeral: true }).catch((e) => { console.log(e) })
        };

        const fcmd = client.application.commands.cache.find(c => c.name === command.name);
        const mentionCommand = `</${fcmd.name}${interaction.options.data.some(a => a.type === ApplicationCommandOptionType.Subcommand) ? ` ${interaction.options.data.find(a => a.type === ApplicationCommandOptionType.Subcommand).name}` : ""}:${fcmd.id}>`;
        if (interaction.guild) {
          const bot_perms = [];
          const user_perms = [];
          command.bot_permissions.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]));
          command.user_permissions.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]));
          if (!interaction.guild.members.me.permissions.has([bot_perms] || [])) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`ربات که من باشم دسترسی لازم برای ران کردن کامند ${mentionCommand} رو ندارم!!\nدسترسی های لازم: [${command.bot_perms.map(p => `\`${p}\``).join(", ")}]`).setColor("Orange")], ephemeral: true }).catch((e) => { error(e) });

          if (!interaction.member.permissions.has([user_perms] || [])) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`ببین پسر خوب تو دسترسی های لازم برای استفاده از کامند ${mentionCommand} رو نداری!! \nدسترسی های لازم: [${command.user_perms.map(p => `\`${p}\``).join(", ")}]`).setColor("Red")], ephemeral: true }).catch((e) => { console.log(e) });
        };

        // Cooldown
        if (!client.cooldowns.has(command.name)) {
          client.cooldowns.set(command.name, new Collection());
        };

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
        if (timestamps.has(interaction.user.id)) {
          const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
          if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);
            return await interaction.reply({ content: `شما به دلیل اسپم از کامند ${mentionCommand} محروم شدید و تا <t:${expiredTimestamp}:R> دیگر میتوانید دوباره از آن استفاده کنید.`, ephemeral: true });
          }
        };

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        // Command Handler 
        command.run(client, interaction, args);
      } else {
        return;
      }
    }
  } catch (e) {
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