const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  PermissionsBitField,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  AttachmentBuilder
} = require('discord.js');
const {
  getAPI,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
const {
  createCanvas,
  loadImage
} = require('@napi-rs/canvas');
module.exports = {
  name: 'image',
  description: 'This is an image service that has fun and edit commands.',
  category: 'Fun 🎭',
  type: ApplicationCommandType.ChatInput,
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  options: [{
    name: "kiss",
    description: "Kiss some one you like it.",
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: "user",
      description: "Who do you want to kiss?",
      type: ApplicationCommandOptionType.User,
      required: true
    }, {
      name: "type",
      description: "What type of kissing method you want?",
      type: ApplicationCommandOptionType.String,
      choices: [{
        name: 'Gay',
        value: 'gay'
      }, {
        name: 'Lesbian',
        value: 'lesbian'
      }],
      required: true
    }]
  }, {
    name: "anime",
    description: "Use anime methods by api.",
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: "user",
      description: "Who do you want to use?",
      type: ApplicationCommandOptionType.User,
      required: true
    }, {
      name: "type",
      description: "What type of anime method you want?",
      type: ApplicationCommandOptionType.String,
      choices: [{
        name: 'Slap',
        value: 'slap'
      }, {
        name: 'Hug',
        value: 'hug'
      }, {
        name: 'Kiss',
        value: 'kiss'
      }, {
        name: 'Pat',
        value: 'pat'
      }, {
        name: 'Feed',
        value: 'feed'
      }],
      required: true
    }]
  }],
  interactionRun: async (client, interaction, args, lang, prefix) => {
    let mes = client.languages[lang].commands.ball8;
    switch (interaction.options.getSubcommand()) {
      case "kiss": {
        let member = interaction.options.getMember("user");
        let type = interaction.options.getString("type");
        let canvas = createCanvas(1024, 600);
        let ctx = canvas.getContext('2d');
        switch (type) {
          case "gay": {
            let bg = await loadImage(client.images.gayKiss);
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.arc(375, 140, 125, 0, Math.PI * 2, true);
            ctx.arc(715, 145, 125, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            let user = await loadImage(member.displayAvatarURL({ extension: "jpg", size: 4096 }));
            ctx.drawImage(user, 250, 15, 250, 250);

            let author = await loadImage(interaction.user.displayAvatarURL({ extension: "jpg", size: 4096 }));
            ctx.drawImage(author, 590, 20, 250, 250);
            interaction.followUp({
              embeds: [new EmbedBuilder().setTitle(`OMG!!!`).setDescription(`\`${interaction.user.username}\` start kissing **${member.user.username}**`).setColor(client.colors.pink).setTimestamp().setImage(`attachment://kiss.png`)],
              files: [new AttachmentBuilder(await canvas.encode('png'), { name: 'kiss.png' })]
            })
          } break;
          case "lesbian": {
            let bg = await loadImage(client.images.lesbianKiss);
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.arc(375, 300, 125, 0, Math.PI * 2, true);
            ctx.arc(715, 170, 125, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            let user = await loadImage(member.displayAvatarURL({ extension: "jpg", size: 4096 }));
            ctx.drawImage(user, 250, 175, 250, 250);

            let author = await loadImage(interaction.user.displayAvatarURL({ extension: "jpg", size: 4096 }));
            ctx.drawImage(author, 590, 45, 250, 250);
            interaction.followUp({
              embeds: [new EmbedBuilder().setTitle(`OMG!!!`).setDescription(`\`${interaction.user.username}\` start kissing **${member.user.username}**`).setColor(client.colors.pink).setTimestamp().setImage(`attachment://kiss.png`)],
              files: [new AttachmentBuilder(await canvas.encode('png'), { name: 'kiss.png' })]
            })
          } break;
        }
      } break;
      case "anime": {
        let member = interaction.options.getMember("user");
        let type = interaction.options.getString("type");
        switch (type) {
          case "kiss": {
            let image = await getAPI(`https://nekos.life/api/kiss`);
            interaction.followUp({
              embeds: [new EmbedBuilder().setTitle(`OMG!!!`).setDescription(`\`${interaction.user.username}\` start kissing **${member.user.username}**`).setColor(client.colors.pink).setFooter({ text: `This image maked by "nekos.life" api.` }).setTimestamp().setImage(`attachment://kiss.gif`)],
              files: [new AttachmentBuilder(image.url, { name: 'kiss.gif' })]
            })
          } break;
          case "hug": {
            let image = await getAPI(`https://nekos.life/api/hug`);
            interaction.followUp({
              embeds: [new EmbedBuilder().setTitle(`OMG!!!`).setDescription(`\`${interaction.user.username}\` start hugging **${member.user.username}**`).setColor(client.colors.pink).setFooter({ text: `This image maked by "nekos.life" api.` }).setTimestamp().setImage(`attachment://hug.gif`)],
              files: [new AttachmentBuilder(image.url, { name: 'hug.gif' })]
            })
          } break;
          case "slap": {
            let image = await getAPI(`https://nekos.life/api/v2/img/slap`);
            interaction.followUp({
              embeds: [new EmbedBuilder().setTitle(`OMG!!!`).setDescription(`\`${interaction.user.username}\` get slap to **${member.user.username}**`).setColor(client.colors.pink).setFooter({ text: `This image maked by "nekos.life" api.` }).setTimestamp().setImage(`attachment://slap.gif`)],
              files: [new AttachmentBuilder(image.url, { name: 'slap.gif' })]
            })
          } break;
          case "pat": {
            let image = await getAPI(`https://nekos.life/api/v2/img/pat`);
            interaction.followUp({
              embeds: [new EmbedBuilder().setTitle(`OMG!!!`).setDescription(`\`${interaction.user.username}\` start caressing to **${member.user.username}**`).setColor(client.colors.pink).setFooter({ text: `This image maked by "nekos.life" api.` }).setTimestamp().setImage(`attachment://pat.gif`)],
              files: [new AttachmentBuilder(image.url, { name: 'pat.gif' })]
            })
          } break;
          case "feed": {
            let image = await getAPI(`https://nekos.life/api/v2/img/feed`);
            interaction.followUp({
              embeds: [new EmbedBuilder().setTitle(`OMG!!!`).setDescription(`\`${interaction.user.username}\` is feeding\ **${member.user.username}**`).setColor(client.colors.pink).setFooter({ text: `This image maked by "nekos.life" api.` }).setTimestamp().setImage(`attachment://feed.gif`)],
              files: [new AttachmentBuilder(image.url, { name: 'feed.gif' })]
            })
          } break;
        }
      } break;
      case "": {

      } break;
      case "": {

      } break;
    }
  },
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