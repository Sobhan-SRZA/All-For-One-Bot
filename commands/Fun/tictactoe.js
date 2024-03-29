module.exports = {
  name: 'tictactoe',
  description: 'text to emoji converter',
  aliases: ['doz', 'tictactoe'],
  category: 'Fun 🎭',
  utilisation: '{prefix}tictactoe',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mention) return message.channel.send("**Please mention someone**")
    if (mention.id == message.author.id) return message.channel.send("**Please mention someone else**")
    const { tictactoe } = require('easy-games-js')
    const tic = new tictactoe(mention, message)
    tic.init({ PROVIDE_MEMBER: "Please provide a  member", ACCEPT_CHALLENGE: "{user} Do you accept this challange?", DOESNT_PLAY: "looks like {user} doesnt wanna play", WICH_SIDE: "**{user}, Which Side Do You Pick? Type \`End\` To Forfeit!**", GAME_OVER: "Times up!", END: "end", INACTIVITY: "game ended due to inactivity!", WINNER: "Congrats u have won {winner} and earned 70 coins ", DRAW: "Its a draw" })

  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */