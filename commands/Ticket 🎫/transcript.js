const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  PermissionsBitField,
  TextInputStyle,
  ButtonStyle,
  ChannelType,
  ComponentType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require('discord.js');
const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
const Transcript = require('discord-html-transcripts');
module.exports = {
  name: "transcript",
  description: "Create a transcript from the channel.",
  category: 'Ticket 🎫',
  cooldown: 10,
  userPermissions: [ "SendMessages", "ManageChannels" ],
  botPermissions: [ "SendMessages", "EmbedLinks", "ManageChannels", "ViewChannel", "ReadMessageHistory" ],
  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {
    let db = client.db;
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
    await interaction.followUp({
        embeds: [new EmbedBuilder().setColor(client.colors.theme).setDescription(`Creating transcript of ${interaction.channel} for you and this will send you from dm so please wait as it may take a long time.`).setTitle(`${client.emotes.hamer}| Build Transcript For You`)],
        ephemeral: true
    })
    let file = await Transcript.createTranscript(interaction.channel, {
          limit: -1,
          returnType: 'attachment',
          filename: `transcript-${interaction.channel.name}.html`,
          saveImages: false,
          footerText: `Exported {number} message{s}.`,
          poweredBy: false
    })
    await interaction.user.send({
          files: [file],
          embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`Creating the \`${interaction.channel.name}\` tikcet of ${interaction.guild.name} transcript have successfull.`).setTitle(`${client.emotes.success}| Successfully Transcript Created`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
    })
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