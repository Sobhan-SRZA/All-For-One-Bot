const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").GuildMember} oldMember
 * @param {import("discord.js").GuildMember} newMember 
 * @returns
 */
module.exports = async (client, oldMember, newMember) => {
  if (oldMember.guild.id === client.config.serverId) {
    if (oldMember.pending && !newMember.pending) {
      const channels = [
        "1181764926545596444" // Chat
      ];
      channels.forEach((ch) => {
        const channel = client.channels.cache.get(ch);
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setThumbnail(oldMember.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`We got new user in our server.\nWelcome to new best member`);

        channel.send({
          content: `**||<@&1181764925970972737>||, ${oldMember.user}\nWelcome to Your server my Friend!**`,
          embeds: [embed],
          components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Rules & Roles').setEmoji(`📖`).setURL(`https://discord.com/channels/1181764925874507836/1181764926147133544`)])]
        });
      })
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