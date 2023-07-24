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
  aliases: ['trans','transcript ticket'],
  usage: "",
  userPermissions: [ "SendMessages", "ManageChannels" ],
  botPermissions: ["SendMessages", "EmbedLinks", "ViewChannel", "ReadMessageHistory"],
  run: async (client, message, args, lang, prefix) => {
    let db = client.db;
    let admin_roles = await db.get(`guild_${message.guild.id}.admin_roles`);
    if (!message.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !message.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
    await message.reply({
        embeds: [new EmbedBuilder().setColor(client.colors.theme).setDescription(`Creating transcript of ${message.channel} for you and this will send you from dm so please wait as it may take a long time.`).setTitle(`${client.emotes.hamer}| Build Transcript For You`)]
    })
    let file = await Transcript.createTranscript(message.channel, {
          limit: -1,
          returnType: 'attachment',
          filename: `transcript-${message.channel.name}.html`,
          saveImages: false,
          footerText: `Exported {number} message{s}.`,
          poweredBy: false
    })
    await message.author.send({
          files: [file],
          embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`Creating the \`${message.channel.name}\` tikcet of ${message.guild.name} transcript have successfull.`).setTitle(`${client.emotes.success}| Successfully Transcript Created`).setAuthor({ name: `${message.channel.name} • ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })],
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