module.exports = {
    name: "bansshow",
    cooldown: 5,
    aliases: ["bns"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}bansshow',
    description: "Show a members bans from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const {Permissions} = require('discord.js');
if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send(client.emotes.badage + '| **You can not use this command | Permission: BAN_MEMBERS**')
if(!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send(client.emotes.entry + '| **I do not have the correct permissions | Permission : BAN_MEMBERS**')
        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
        .map((member) => member.user.tag)
        .join("\n");
        message.channel.send(bannedMembers); 
    },
};