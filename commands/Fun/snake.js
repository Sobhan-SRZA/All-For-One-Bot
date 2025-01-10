module.exports = {
  name: "mar",
  aliases: ["snake", "maze", "marbazi"],
  category: "Fun 🎭",
  description: "sknake maze mini Game",
  usage: "trash @User",


  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const SnakeGame = require('snakecord');
    const Discord = require("discord.js");
    const snakeGame = new SnakeGame({
      title: 'Snake Game',
      color: "RANDOM",
      timestamp: true,
      gameOverTitle: "Game Over"
    });
    snakeGame.newGame(message);

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