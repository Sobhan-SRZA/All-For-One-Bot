const SnakeGame = require('snakecord');
module.exports = {
  name: "snake",
  aliases: ["mar","maze","marbazi"],
  description: "sknake maze game with rection.",
  category: 'Fun 🎭 | Minigame',
  usage: "[name | nickname | mention | ID]",  

async execute(client, message, args) { 
const snakeGame = new SnakeGame({
    title: 'Snake Game',
    color: client.colors.none,
    timestamp: true,
    gameOverTitle: "Game Over"
});
 snakeGame.newGame(message);

  }
}