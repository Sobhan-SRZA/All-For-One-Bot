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
  name: 'serverlist',
  description: 'Get list of all servers bot join.',
  category: 'Owner 👑',
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  aliases: ["sl"],
  usage: "",
  messageRun: async (client, message, args, lang, prefix) => {
    try {
      if (!client.config.owner.some(r => r.includes(message.author.id))) return; //errorMessage(client, message, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`);
      const backId = 'back'
      const forwardId = 'forward'
      const backButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        label: 'Back',
        emoji: '⬅️',
        customId: backId
      })
      const forwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        label: 'Forward',
        emoji: '➡️',
        customId: forwardId
      })
      const guilds = [...client.guilds.cache.values()]
      let page = 1;
      const generateEmbed = async start => {
        const current = guilds.sort((a, b) => b.memberCount - a.memberCount).slice(start, start + 12)
        let embed = new EmbedBuilder({
          title: `Page - ${page}/${Math.ceil(client.guilds.cache.size / 12)} | All Guilds: ${(guilds.length).toLocaleString()}`,
          fields: await Promise.all(
            current.sort((a, b) => b.memberCount - a.memberCount).map(async guild => ({
              name: `${guild.name}`,
              value: `**ID:** \`${guild.id}\`\n**Owner:** \`${(await guild.fetchOwner()).user.tag}\`\n**Members:**         __${(guild.memberCount).toLocaleString()}__`,
              inline: true
            }))
          )
        })
        return embed.setColor(client.colors.theme)
      }
      const canFitOnOnePage = guilds.length <= 12;
      const msg = await message.reply({
        embeds: [await generateEmbed(0)],
        components: canFitOnOnePage ? [] : [new ActionRowBuilder({ components: [forwardButton] })]
      })
      if (canFitOnOnePage) return;
      const collector = msg.createMessageComponentCollector({
        filter: ({ user }) => user.id === message.author.id,
        time: 60000
      })

      let currentIndex = 0;
      collector.on('collect', async int => {
        int.customId === backId ? (currentIndex -= 12) : (currentIndex += 12)
        int.customId === backId ? (page -= 1) : (page += 1)
        await int.deferUpdate()
        await int.editReply({
          embeds: [await generateEmbed(currentIndex)],
          components: [new ActionRowBuilder({ components: [...(currentIndex ? [backButton] : []), ...(currentIndex + 12 < guilds.length ? [forwardButton] : [])] })]
        })
      })
      collector.on('end', async () => {
        await msg.edit({ components: [] })
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