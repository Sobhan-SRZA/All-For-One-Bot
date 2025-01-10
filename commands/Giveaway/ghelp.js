const {
  MessageEmbed
} = require("discord.js");
const {
  MessageButton,
  MessageActionRow
} = require('discord-buttons');
module.exports = {
  name: "ghelp",
  cooldown: 5,
  aliases: ["donorhelp", "givehelp", "giveawayhelp"],
  category: 'Giveaway 🎁',
  utilisation: '{prefix}ghelp',
  description: "send a giveaway help command to setting or other things to do with your giveaway.",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    try {
      const db = client.db;

      const prefix = await db.get(`prefix_${message.guild.id}`) || client.config.discord.prefix;
      let help = new MessageEmbed()
        .setAuthor(`Giveaway Commands Of ${client.user.tag}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTitle("Command List & Guide for the Bot")
        .setDescription("Below are Commands you can do with Bot In Giveaway Category, Right now there is only 3 commands available, more commands will be added soon.")
        .addField("🎁 Giveaway 🎁", `${prefix}gstart [channel-name] [Time] [winners] [Prize]\n${prefix}greroll [prize name | message_ID]\n${prefix}gend [prize name | message_ID]`)
        .addField("Examples", `${prefix}gstart #giveaway 5m 1 Testing\n${prefix}end Testing\n${prefix}greroll Testing`)
        .setColor("#2F3136")
        .setTimestamp()
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
      return message.channel.send(help);
    } catch (e) {
      function NeedHelpButtons() {
        const btn1 = new MessageButton()
          .setStyle('url')
          .setLabel('Invite Me')
          .setEmoji('🤖')
          .setURL(client.config.botInviteLink)

        const btn2 = new MessageButton()
          .setStyle('url')
          .setLabel('Support Server!')
          .setEmoji('🧰')
          .setURL(`${client.config.botServerSupportLink || "https://dsc.gg/persian-caesar"}`)

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