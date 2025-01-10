const { MessageEmbed } = require("discord.js");
const { sendError } = require("../../functions/functions");
const fs = require('fs');
module.exports = {
    name: "afk",
    aliases: ["24/7"],
    category: 'Music 🎶',
    utilisation: '',
    description: "Set the bot in voice for 24/7 in server.",
  async execute(client, message, args) {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var serverQueue = afk[message.guild.id]
       if (serverQueue) {
            serverQueue.afk = !serverQueue.afk;
             message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `${client.emotes.afk}**|**  AFK is **\`${serverQueue.afk === true ? "enabled" : "disabled"}\`**`
                }
            });
            return  fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
        if(err) console.error(err);
      });
    };
    if (!client.player.getQueue(message.guild.id) || !(client.player.getQueue(message.guild.id)).playing)
     return sendError("There is nothing playing in this server.", message.channel, client, message);
  },
};