const { MessageReaction, User } = require("discord.js");
let db = require("quick.db");
let Discord = require("discord.js");
let { MessageEmbed } = require("discord.js");

module.exports = async (client, reaction, user) => {
let message = reaction.message;
  let member = message.guild.members.cache.get(user.id);
  let roleObject = db.fetch(`rolereactions_${message.guild.id}_${message.id}`);
  let starObject = db.fetch(`starboard_${message.guild.id}`);
  let emoji = reaction.emoji.toString();
  if (roleObject) {
    if (emoji === roleObject.emoji) {
      let role = message.guild.roles.cache.get(roleObject.role);
      if (!member.roles.cache.has(role)) {
        try {
          member.roles.add(role);
        const added = new MessageEmbed()
        .setTitle(`✅ Added A Role In \`${reaction.message.guild.name}\``)
        .addField(`**Role**`, `${role.name}`)
        .setColor('GREEN')
        .setAuthor(`${reaction.message.guild.name}`, reaction.message.guild.iconURL({dynamic: true}))
          member.send(added);
        } catch (e) {
          message.channel.send("Something has gone wrong " + e.message);
        }
      }
    }
  }
};
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */