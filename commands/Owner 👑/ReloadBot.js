module.exports = {
    name: "reloadbot",
    cooldown: 5,
    aliases: ["botreload", "reload", "runbot"],
    category: 'Owner 👑',
    utilisation: '{prefix}reloadbot',
    description: "Reloads the Bot, All Commands Events, etc.",
    usage: "",
  async execute(client, message, args) { 

const fs = require('fs');
const Discord = require('discord.js');
const prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
 var {
  MessageEmbed
} = require(`discord.js`);

    if (!client.config.owner.some(r => r.includes(message.author.id)))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor('RED')
          .setFooter(``)
          .setTitle(`> You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}`)
        ); 

    try {
      const index = require("../../index.js")
      let tempmsg = await message.channel.send(new MessageEmbed()
        .setColor()
        .setFooter()
        .setAuthor("Reloading ...", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif")
        .setTitle(`> Reloading **\`${client.commands.size} Commands\`**\n\n> Reloading **\`2 Events\`**\n\n> Reloading **\`${client.commands.size + 2} Modules/Features\`**`)
      )
      //clear the commands collection
      await client.commands.clear();
      console.log(client.commands) //log that it's empty
      //Delete all files from the cache
      await fs.readdirSync("./commands/").forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
        for (let file of commands) {
          try{
            console.log(`SUCCESS :: ../../commands/${dir}/${file}.js`)
            delete require.cache[require.resolve(`../../commands/${dir}/${file}.js`)]
          }catch{ 
          }  
        }
      })
      //WAIT 1 SEC
      await delay(1000);
      //clear all events
      await client.removeAllListeners()
      //wait 1 Sec
//      await delay(1000);
 
      //Load the basics, (commands, dbs, events, etc.)
      index.requirehandlers();
      //SEND SUCCESS
      console.log(client.commands.map(cmd => cmd.name))
      await tempmsg.edit({embed: new MessageEmbed()
        .setColor()
        .setFooter()
        .setAuthor("Successfully Reloaded:", "https://cdn.discordapp.com/emojis/833101995723194437.gif?v=1")
        .setTitle(`> **\`${client.commands.size} Commands\`**\n\n> **\`2 Events\`**\n\n> **\`${client.commands.size + 2} Modules/Features\`**`)
      })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor()
        .setFooter()
        .setTitle(`> Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
 
    
  }
}