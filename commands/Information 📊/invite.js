const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
const Discord = require("discord.js");
module.exports = {
  name: 'invite',
  description: 'Invite the bot to your own guild.',
  category: 'Information 📊',
  type: Discord.ApplicationCommandType.ChatInput,
  cooldown: 2,
  aliases: ['in', 'invite me'],
  usage: "",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  options: [{
    name: "ephemeral",
    description: "Hide this message from everyone.",
    type: Discord.ApplicationCommandOptionType.String,
    choices: [{
      name: 'Enable',
      value: 'true'
    }, {
      name: 'Disable',
      value: 'false'
    }],
    required: false
  }],
  interactionRun: async (client, interaction, args, lang, prefix) => {
    let mes = client.languages[lang].commands.invite;
    try {
      await interaction.followUp({
        components: [new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setLabel(mes.button.btn1).setEmoji(client.emotes.invite).setURL(`${client.config.discord.invite}`)), new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setLabel(mes.button.btn2).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))],
        embeds: [new Discord.EmbedBuilder().setThumbnail(client.user.displayAvatarURL({ format: "png" })).setTitle(mes.embed.title).setDescription(mes.embed.description.replaceAll("{link}", client.config.discord.invite)).setURL(`${client.config.discord.server_support}`).setColor(client.colors.theme)]
      });
    } catch (e) {
      console.log(e)
      errorMessage(client, interaction, '```js\n' + e + '```')
    }
  },
  messageRun: async (client, message, args, lang, prefix) => {
    try {
      let mes = client.languages[lang].commands.invite;
      await message.reply({
        components: [new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setLabel(mes.button.btn1).setEmoji(client.emotes.invite).setURL(`${client.config.discord.invite}`)), new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setLabel(mes.button.btn2).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))],
        embeds: [new Discord.EmbedBuilder().setThumbnail(client.user.displayAvatarURL({ format: "png" })).setTitle(mes.embed.title).setDescription(mes.embed.description.replaceAll("{link}", client.config.discord.invite)).setURL(`${client.config.discord.server_support}`).setColor(client.colors.theme)]
      });
    } catch (e) {
      console.log(e)
      errorMessage(client, message, '```js\n' + e + '```')
    }
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