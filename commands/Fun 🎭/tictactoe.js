const { 
  tictactoe 
} = require('easy-games-js')
module.exports = {
    name: 'tictactoe',
    aliases: ['doz','tictactoe'],
    category: 'Fun 🎭 | Minigame',
    description: "playing tic tac toe with users.",
    usage: "[name | nickname | mention | ID]",  
   async execute(client, message, args) {
  
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!mention) return message.channel.send("**Please mention someone**")
    if(mention.id == message.author.id) return message.channel.send("**Please mention someone else**")
    const tic = new tictactoe(mention, message)
    tic.init({ PROVIDE_MEMBER: "Please provide a  member", ACCEPT_CHALLENGE: "{user} Do you accept this challange?", DOESNT_PLAY: "looks like {user} doesnt wanna play", WICH_SIDE: "**{user}, Which Side Do You Pick? Type \`End\` To Forfeit!**", GAME_OVER: "Times up!", END: "end", INACTIVITY: "game ended due to inactivity!", WINNER: "Congrats u have won {winner} and earned 70 coins ", DRAW: "Its a draw"})

    }
}