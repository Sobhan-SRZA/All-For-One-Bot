const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
    name: 'about',
    aliases: ['info'],
    category: 'Infos 📊',
    utilisation: '{prefix}about',


  async execute(client, message, args) { 

let infoEmbed = new Discord.MessageEmbed()
      infoEmbed.setColor("RANDOM");
      infoEmbed.setTitle(`Stats from \`${client.user.username}\``);
      infoEmbed.addField(":ping_pong: Ping",`┕\`${Math.round(client.ws.ping)}ms\``,true);

      infoEmbed.addField(":clock1: Uptime", `┕\`${moment.duration(message.client.uptime)}\``,true);
      infoEmbed.addField(":file_cabinet: Memory",`┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}mb\``,true);

      infoEmbed.addField(":homes: Servers",`┕\`${client.guilds.cache.size}\``, true);
      infoEmbed.addField(":busts_in_silhouette: Users",`┕\`${client.users.cache.size}\``,true);
      infoEmbed.addField(":control_knobs: API Latency",`┕\`${message.client.ws.ping}ms\``,true);
      infoEmbed.addField(":robot: Version",`┕\`Omega 5.2.1\``,true);

      infoEmbed.addField(":blue_book: Discord.js",`┕\`v12.2.1\``,true);

          infoEmbed.addField(":green_book: Node",`┕\`16.1.2\``,true);
      infoEmbed.setTimestamp();
      
            message.channel.send(infoEmbed)
    }
}