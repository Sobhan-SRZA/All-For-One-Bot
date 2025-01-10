const {
   MessageEmbed
} = require('discord.js');
const {
   NeedHelpButtons,
   logsEmbed,
   NeedHelpMenu,
   commandsData,
   errorEmbed,
   successEmbed,
   CustomErrorEmbed
 } = require('../../functions/functions.js');
module.exports = {
   name: 'say',
   description: 'sending your words in embed.',
   aliases: ['say'],
   category: 'Fun 🎭 | Minigame',
   usage: '[text]',
  async execute(client, message, args) {
     if(!args){
      message.reply({
         embeds: [errorEmbed(
            message,
            "my brother for using this command you have to write some text.",
            client
         )]
      }) 
     }
     const embed = new MessageEmbed()
           .setImage()
           .setDescription(`${args.slice().join(' ')}`)
           .setColor(client.colors.none)
      message.reply({embeds:[embed]}) 
   }
}