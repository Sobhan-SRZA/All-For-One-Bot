const {
  MessageEmbed
} = require("discord.js");
module.exports = {
  name: "uptime", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Infos 📊",
  description: "Returns the duration on how long the Bot is online", //the command description for helpcmd [OPTIONAL]
  async execute(client, message, args) { 

    let seconds = Math.floor(client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    
    const embed  = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`📈 **I have been online for: **\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``)
    
    return message.channel.send(embed)
   
  }
}
