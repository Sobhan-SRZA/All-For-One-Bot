module.exports = {
    name: "bansshow",
    cooldown: 5,
    aliases: ["bns"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}bansshow',
    description: "Show a members bans from the server",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
const Discord = require('discord.js');
        if(!message.member.permissions.has("BAN_MEMBERS")) return;
        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
        .map((member) => member.user.tag)
        .join("\n");
        message.channel.send(bannedMembers); 
    },
};