const error = require("../../functions/error")

module.exports = {
  name: 'ahelp',
  aliases: ['ansfw', 'an', 'ah'],
  category: 'Nsfw 🔞',
  description: 'shows command of "Nsfw 🔞 | Anime" category.',
  utilisation: '{prefix}ahelp',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    try {
      const Discord = require("discord.js")

      const db = client.db;

      const prefix = await db.get(`prefix_${message.guild.id}`) || client.config.discord.prefix;

      let commands = message.client.commands.array();
      function commandsData(commands) {
        const content = commands.map(i => '`' + prefix + i.name + '`').join(' , ')
        return '' + content + '';
      };
      const cmds = commands.filter(c => c.category === 'Nsfw 🔞 | Anime');
      const ahelpEmbed = new Discord.MessageEmbed()
        .setColor(client.colors.none)
        .setDescription(`**Baraie Estefade Kardan Az Command Ha Matn Zir Ra Negah Konid.\n  \n${commandsData(client.commands.filter(c => c.category === 'Nsfw 🔞 | Anime'))}**`)
        .setTitle("Nsfw 🔞 | Anime \n Commands:")
        .setTimestamp()
        .setFooter('Nsfw command | Anime Help');
      if (cmds.length < 25)
        cmds.forEach((cmd) => {
          ahelpEmbed.addField(
            `**${prefix}${cmd.name}**`,
            `**Description: \`${cmd.description}\` | Aliases:** \`(${cmd.aliases ? `${cmd.aliases}` : ""})\``,
            true
          );
        });
        
      if (message.channel.nsfw === true) {
        message.channel.send(ahelpEmbed)
      } else {
        message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/")
      }


    } catch (e) {
      error(e)
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