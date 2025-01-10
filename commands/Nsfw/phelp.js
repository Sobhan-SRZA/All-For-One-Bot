const Discord = require('discord.js');

module.exports = {
  name: 'phelp',
  aliases: ['ph'],
  category: 'Nsfw 🔞',
  utilisation: '{prefix}phelp',
  description: 'shows command of "Nsfw 🔞 | Porn" category.',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const db = client.db;

    const prefix = await db.get(`prefix_${message.guild.id}`) || client.config.discord.prefix;

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
      .setFooter(`Nsfw Help || more info ${prefix}help || Made by mr.sinre |`, message.author.displayAvatarURL())
    commands.filter(c => c.category === 'Nsfw 🔞 | Porn').forEach((cmd) => {
      phelpEmbed.addField(
        `**${prefix}${cmd.name}**`,
        `**Description: \`${cmd.description}\` | Aliases:** \`(${cmd.aliases ? `${cmd.aliases}` : ""})\``,
        true
      );
    });


    if (message.channel.nsfw === true) {
      message.channel.send(phelpEmbed);
    } else {
      message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/")
    }

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