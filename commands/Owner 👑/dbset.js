const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'dbset',
  description: 'Setup datas on db storage.',
  category: 'Owner 👑',
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  aliases: ["ds"],
  usage: "",
  messageRun: async (client, message, args, lang, prefix) => {
    try {
      if (!client.config.owner.some(r => r.includes(message.author.id))) return; //errorMessage(client, message, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`);
      let arg = args[0];
      if (!arg) return errorMessage(client, message, `> do not forget database arg.`);
      let setup = args.slice(1).join(" ")
      if (!setup) return errorMessage(client, message, `> do not forget database setupping datas.`);
      await client.db.set(arg, JSON.stringify(setup)).then(() => {
        message.reply({
          content: `Data is successfully setuped.`
        })
      })
    } catch (e) {
      errorMessage(client, message, `\`\`\`js\n${e}\n\`\`\``)
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