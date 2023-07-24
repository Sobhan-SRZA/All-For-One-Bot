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
  name: 'serverleave',
  description: 'Leaving guilds with id or guilds below 50 members.',
  category: 'Owner 👑',
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  aliases: ["sv"],
  usage: "",
  messageRun: async (client, message, args, lang, prefix) => {
    try {
      if (!client.config.owner.some(r => r.includes(message.author.id))) return; //errorMessage(client, message, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`);
      await message.reply({ content: `Trying to leave guilds with less than 50 members...` })
        .then(async (msg) => {
          try {
            client.guilds.cache.forEach(guild => {
              if (guild.memberCount < 50) {
                if (client.config.whitelist_guilds.some(r => r.includes(guild.id))) return;
                setTimeout(() => {
                  guild.leave()
                }, 5000)
              }
            })
            await msg.edit({ content: `process is successfully, I have leave guilds for you.` })
          } catch (e) {
            await msg.edit({ content: `\`\`\`js\n${e}\`\`\`` })
            console.log(e)
          }
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