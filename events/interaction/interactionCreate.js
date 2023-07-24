const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ChannelType,
  Collection,
  PermissionsBitField,
  ApplicationCommandOptionType,
} = require("discord.js");
const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
const clc = require("cli-color");
module.exports = async (client, interaction) => {
  try {
    let db = client.db;
    let lang = await db.has(`guild_${interaction.guild.id}.language`) ? await db.get(`guild_${interaction.guild.id}.language`) : client.config.default_language;
    let prefix = await db.has(`guild_${interaction.guild.id}.prefix`) ? await db.get(`guild_${interaction.guild.id}.prefix`) : `${client.prefix}`;

    //========== Check Perms
    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has([PermissionsBitField.Flags.EmbedLinks])) return interaction.reply({ content: `${client.emotes.error}| I am missing the Permission to \`EmbedLinks\` in guild.`, ephemeral: true })

    //======== 
    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);
      if (command) {
        const args = [];

        for (let option of interaction.options.data) {
          if (option.type === ApplicationCommandOptionType.Subcommand) {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
            })
          } else if (option.value) args.push(option.value);
        }
        if (command.toggleOff) {
          return await interaction.reply({
            embeds: [new EmbedBuilder().setTitle(`${client.emotes.badage}| **That Command Has Been Disabled By The Developers! Please Try Later.**`).setColor(client.colors.red)],
            ephemeral: true
          }).catch((e) => {
            console.log(e)
          });
        }
        let bot_perms = [];
        command?.botPermissions.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]))
        let user_perms = [];
        command?.userPermissions.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]))
        if (!interaction.guild.members.me.permissions.has([bot_perms] || [])) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`${client.emotes.x}| **I don't have permission to respond </${client.application.commands.cache.find(c => c.name === command.name).name}:${client.application.commands.cache.find(c => c.name === command.name).id}> command!! \nPermissions need: [${command?.botPermissions.map(p => `\`${p}\``).join(", ")}]**`).setColor(client.colors.orange)], ephemeral: true }).catch((e) => { console.log(e) });

        if (!interaction.member.permissions.has([user_perms] || [])) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`${client.emotes.error}| **You don't have  permission to use </${client.application.commands.cache.find(c => c.name === command.name).name}:${client.application.commands.cache.find(c => c.name === command.name).id}> command!! \nPermissions need: [${command?.userPermissions.map(p => `\`${p}\``).join(", ")}]**`).setColor(client.colors.red)], ephemeral: true }).catch((e) => { console.log(e) });

        //======== Slash Command Cooldown ========
        if (!client.slashCooldowns.has(command.name)) {
          client.slashCooldowns.set(command.name, new Collection());
        }
        const now = Date.now();
        const timestamps = client.slashCooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 5) * 1000;
        if (timestamps.has(interaction.user.id)) {
          const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return interaction.reply({
              embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`**${client.emotes.alert}| Please wait <t:${Math.floor((new Date().getTime() + Math.floor(timeLeft * 1000)) / 1000)}:R> before reusing the </${client.application.commands.cache.find(c => c.name === command.name).name}:${client.application.commands.cache.find(c => c.name === command.name).id}> command!**`)],
              ephemeral: true
            })
          }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        //======== Slash Command Handler ========
        if (command) {
          await interaction.deferReply({ ephemeral: interaction.options.getString("ephemeral") === "true" ? true : false });
          command.interactionRun(client, interaction, args, lang, prefix);
        }
      } else {
        return;
      }
    }
    if (interaction.isUserContextMenuCommand()) {
      const command = client.slashCommands.get(interaction.commandName);
      if (command) {
        await interaction.deferReply({ ephemeral: interaction.options.getString("ephemeral") === "true" ? true : false });
        command.interactionRun(client, interaction, lang, prefix);
      }
    }
  } catch (e) {
    console.log(e)
    errorMessage(client, interaction, '```js\n' + e + '```')
  }
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */