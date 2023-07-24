const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
const Discord = require("discord.js");
module.exports = {
  name: '8ball',
  description: 'Ask any question from magic 8ball.',
  category: 'Fun 🎭',
  cooldown: 4,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  aliases: ['ball', '8b'],
  usage: "[question]",
  messageRun: async (client, message, args, lang, prefix) => {
    try {
      let mes = client.languages[lang].commands.ball8;
      let question = args.join(" ");
      if (!question) return errorMessage(client, message, '```js\n' + `Please ask your question from magic ball🎱.` + '```');
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
      await message.reply({
        content: `${answer}`
        //embeds: [new EmbedBuilder().setColor("Blue").setFooter({ text: `Requested  By ${message.author.username} • Created By Mr.SIN RE#1528 `, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setTitle(`🎱| 8ball`).setDescription(`**Question: ${question}\n\nAnswer: ${answer}**`)]
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