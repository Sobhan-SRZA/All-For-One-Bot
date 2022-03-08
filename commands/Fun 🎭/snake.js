module.exports = {
  name: "mar",
  aliases: ["snake","maze","marbazi"],
  category: "Fun 🎭",
  description: "sknake maze mini Game",
  usage: "trash @User",

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