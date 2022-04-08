module.exports = {
    name: 'changename',
    aliases: ['changename','name','setname'],
    category: 'Owner 👑',
    utilisation: '{prefix}changename',
  async execute(client, message, args) { 

const Discord = require('discord.js');
const prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
    try {
    if (!client.config.owner.some(r => r.includes(message.author.id)))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor('RED')
          .setFooter(``)
          .setTitle(`> You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}`)
        );

      if(!args[0])
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(`RED`)
          .setFooter(``)
          .setTitle(`> You need to add a new Bot Name`)
          .setDescription(`Useage: \`${prefix}changename <New Bot Name>\``)
        );

     if(args.join(" ").length > 32){
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

         }catch(e) {
	console.log(e)
      return message.channel.send(`${client.emotes.error} **| Error, ${e}**`);
        }

  }
}