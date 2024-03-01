const {
  MessageEmbed
} = require("discord.js");
const {
  MessageButton,
  MessageActionRow
} = require('discord-buttons');
module.exports = {
  name: "uptime", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: ["online", "onlinetime", "ont"], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos 📊", //the command category for helpcmd [OPTIONAL]
  utilisation: 'uptime',
  description: "neshan dadane zamane roshan bodane bot.", //the command description for helpcmd [OPTIONAL]

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    try {
      let seconds = Math.floor(client.uptime / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      seconds %= 60;
      minutes %= 60;
      hours %= 24;
      const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setTitle(`📈 **I have been online for: \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`**`)

      return message.channel.send(embed)
    } catch (e) {
      function NeedHelpButtons() {
        const btn1 = new MessageButton()
          .setStyle('url')
          .setLabel('Invite Me')
          .setEmoji('🤖')
          .setURL(client.config.discord.invite.replace("{clientId}", client.user.id))

        const btn2 = new MessageButton()
          .setStyle('url')
          .setLabel('Support Server!')
          .setEmoji('🧰')
          .setURL(`${client.config.discord.server_support || "https://dsc.gg/persian-caesar"}`)

        const row = new MessageActionRow()
          .addComponents(btn1, btn2)

        return row;
      }
      console.log(e)
      return message.channel.send(`${client.emotes.error} **| Error, ${e}**`).then(message.author.send(`Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${client.config.discord.server_support || "https://dsc.gg/persian-caesar"}`, { components: [NeedHelpButtons()] }));
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