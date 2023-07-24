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
  HelpCategoryEmbed,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
const {
  createCanvas,
  loadImage
} = require('@napi-rs/canvas');
module.exports = {
  name: 'minigame',
  description: 'A minigames for play with bot or others.',
  category: 'Fun 🎭',
  type: ApplicationCommandType.ChatInput,
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  options: [{
    name: "8ball",
    description: "Ask any question from magic 8ball.",
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: "input",
      description: "Write your question.",
      type: ApplicationCommandOptionType.String,
      required: true
    }, {
      name: "ephemeral",
      description: "Hide this message from everyone.",
      type: ApplicationCommandOptionType.String,
      choices: [{
        name: 'Enable',
        value: 'true'
      }, {
        name: 'Disable',
        value: 'false'
      }],
      required: false
    }],
  }],
  interactionRun: async (client, interaction, args, lang, prefix) => {
    let mes = client.languages[lang].commands.ball8;
    switch (interaction.options.getSubcommand()) {
      case "8ball": {
        //let question = interaction.options.getString("input");
        let eightball = [
          'It is certain.',
          'It is decidedly so.',
          'Without a doubt.',
          'Yes definitely.',
          'You may rely on it.',
          'As I see it, yes.',
          'Most likely.',
          'Outlook good.',
          'Yes.',
          'Signs point to yes.',
          'Reply hazy try again.',
          'Ask again later.',
          'Better not tell you now.',
          'Cannot predict now.',
          'Concentrate and ask again.',
          'Don\'t count on it.',
          'My reply is no.',
          'My sources say no.',
          'Outlook not so good.',
          'Very doubtful.',
          'No way.',
          'Maybe',
          'The answer is hiding inside you',
          'No.',
          'Depends on the mood of the CS god',
          'No',
          'Yes',
          'Hang on',
          'It\'s over',
          'It\'s just the beginning',
          'Good Luck',
        ];
        let answer = eightball[Math.floor(Math.random() * Math.floor(eightball.length))];
        interaction.followUp({
          content: `${answer}`
          //embeds: [new EmbedBuilder().setColor("Blue").setFooter({ text: `Requested  By ${interaction.user.username} • Created By Mr.SIN RE#1528 `, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(`🎱| 8ball`).setDescription(`**Question: ${question}\n\nAnswer: ${answer}**`)]
        });
      } break;
      case "": {

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