const Discord = require('discord.js');

module.exports = {
    name: 'phelp',
    aliases: ['ph'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}phelp',
    description: 'shows command of "Nsfw 🔞 | Porn" category.',

  async execute(client, message, args) { 
var prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;

 let commands = message.client.commands.array();
function commandsData(commands) {
  const content = commands.map(i => '`' + prefix + i.name + '`').join(' , ')
  return '' + content + '';
}
  const phelpEmbed = new Discord.MessageEmbed()
     .setTitle("Nsfw 🔞 | Porn \n Commands:")
     .setTimestamp()
     .setDescription(`**Baraie Estefade Kardan Az Command Ha Matn Zir Ra Negah Konid.\n \n${commandsData(client.commands.filter(c => c.category === 'Nsfw 🔞 | Porn'))}**`)
     .setColor(client.colors.none)
     .setFooter(`Nsfw Help || more info ${prefix}help || Made by Mr.SIN RE#1528 |`,message.author.displayAvatarURL())
     commands.filter(c => c.category === 'Nsfw 🔞 | Porn').forEach((cmd) => {
      phelpEmbed.addField(
        `**${prefix}${cmd.name}**`,
        `**Description: \`${cmd.description}\` | Aliases:** \`(${cmd.aliases ? `${cmd.aliases}` : ""})\``,
        true
      );
    });


      if (message.channel.nsfw === true) {
   message.channel.send(phelpEmbed);
  }else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }

}
}