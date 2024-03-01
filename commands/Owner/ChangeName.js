module.exports = {
  name: 'changename',
  aliases: ['changename', 'name', 'setname'],
  category: 'Owner 👑',
  utilisation: '{prefix}changename',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    const Discord = require('discord.js');
      db = client.db;

    const prefix = await db.get(`prefix_${message.guild.id}`) || client.config.discord.prefix;
    try {
      if (!client.config.owners.some(r => r.includes(message.author.id)))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor('RED')
          .setFooter(``)
          .setTitle(`> You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${client.config.owners.map(id => `<@${id}>`)}`)
        );

      if (!args[0])
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(`RED`)
          .setFooter(``)
          .setTitle(`> You need to add a new Bot Name`)
          .setDescription(`Useage: \`${prefix}changename <New Bot Name>\``)
        );

      if (args.join(" ").length > 32) {
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(`RED`)
          .setFooter(`  `)
          .setTitle(`> Bot Name too long, can't have more then 32 Letters!`)
        );
      }
      client.user.setUsername(args.join(` `)).then((user) => {
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(`RED`)
          .setFooter(`  `)
          .setTitle(`> Changed my Name to: \`${user.username}\``)
        );
      })

    } catch (e) {
      console.log(e)
      return message.channel.send(`${client.emotes.error} **| Error, ${e}**`);
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