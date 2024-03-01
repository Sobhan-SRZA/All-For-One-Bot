module.exports = {
  name: "changeavtar",
  cooldown: 5,
  aliases: ['cha', 'setavatar', 'addavatar'],
  category: 'Owner 👑',
  utilisation: '{prefix} changeavtar',
  description: "changing bot avatar",
  usage: "[name | nickname | mention | ID] <reason> (optional)",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    const fs = require('fs');
    const fetch = require('node-fetch');
    const Discord = require('discord.js');
    const db = client.db;

    const prefix = await db.get(`prefix_${message.guild.id}`) || client.config.discord.prefix;

    if (!client.config.owners.some(r => r.includes(message.author.id)))
      return message.channel.send(new Discord.MessageEmbed()
        .setColor('RED')
        .setFooter(``)
        .setTitle(`> You are not allowed to run this Command`)
        .setDescription(`You need to be one of those guys: ${client.config.owners.map(id => `<@${id}>`)}`)
      );

    try {
      var url;
      if (message.attachments.size > 0) {
        if (message.attachments.every(attachIsImage)) {
          const response = await fetch(url);
          const buffer = await response.buffer();
          fs.writeFile(`./image.jpg`, buffer, () =>
            console.log('finished downloading!'));
          client.user.setAvatar(`./image.jpg`)
            .then(user => {
              return message.channel.send(new MessageEmbed()
                .setTitle(`> Successfully, changed the Bot avatar!`)
                .setColor()
                .setFooter()
              );
            })
            .catch(e => {
              return message.channel.send(new Discord.MessageEmbed()
                .setColor()
                .setFooter()
                .setTitle(`> Something went Wrong`)
                .setDescription(`\`\`\`${e}\`\`\``)
              );
            });
        } else {
          return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`> ERROR | Could not use your Image as an Avatar, make sure it is a \`png\` / \`jpg\``)
            .setColor()
            .setFooter()
          );
        }
      } else if (message.content && textIsImage(message.content)) {
        url = args.join(" ")
        const response = await fetch(url);
        const buffer = await response.buffer();
        await fs.writeFile(`./image.jpg`, buffer, () =>
          console.log('finished downloading!'));
        client.user.setAvatar(`./image.jpg`)
          .then(user => {
            try {
              fs.unlinkSync()
            } catch {

            }
            return message.channel.send(new Discord.MessageEmbed()
              .setTitle(`> Successfully, changed the Bot avatar!`)
              .setColor()
              .setFooter()
            );
          })
          .catch(e => {
            return message.channel.send(new Discord.MessageEmbed()
              .setColor()
              .setFooter()
              .setTitle(`> Something went Wrong`)
              .setDescription(`\`\`\`${e}\`\`\``)
            );
          });

      } else {
        return message.channel.send(new Discord.MessageEmbed()
          .setTitle(`> ERROR | Could not use your Image as an Avatar, make sure it is a \`png\` / \`jpg\` / \`webp\``)
          .setDescription(`Useage: \`${prefix}changeavatar <AVATARLINK/IMAGE>\``)
          .setColor()
          .setFooter()
        );
      }

      function attachIsImage(msgAttach) {
        url = msgAttach.url;

        //True if this url is a png image.
        return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
          url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
          url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
      }
      function textIsImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
      }


    } catch (e) {
      console.log(e)
      return message.channel.send(new Discord.MessageEmbed()
        .setColor()
        .setFooter()
        .setTitle(`> Something went Wrong`)
        .setDescription(`\`\`\`${e}\`\`\``)
      );
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