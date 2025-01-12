const {
  EmbedBuilder,
  ChannelType,
  OverwriteType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const error = require("../../functions/error");
const embed = require("../../storage/copyRight.json");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").AnySelectMenuInteraction} interaction 
 * @returns 
 */
module.exports = async (client, interaction) => {
  try {
    const db = client.db;
    if (interaction.isStringSelectMenu()) {
      switch (interaction.customId) {
        case "ticket": {
          interaction.values.forEach(async value => {
            await interaction.reply({
              content: `Processing...`,
              ephemeral: true
            });
            const [__, admin, name] = value.split("-");
            const tickets = await db.get(`tickets.${interaction.guild.id}`);
            if (tickets && tickets.length > 0 && tickets.some(a => a.author === interaction.user.id)) {
              const ticket = tickets.find(a => a.author === interaction.user.id);
              const ticketChannel = interaction.guild.channels.cache.get(ticket.channel);
              if (interaction.guild.channels.cache.has(ticket.channel)) {
                if (tickets && ticket && ticketChannel && ticketChannel.permissionsFor(interaction.user.id).has(["ViewChannel"])) return await interaction.editReply({
                  content: `You already have an open ticket. Please close it before opening a new one.\n${ticketChannel}`
                });
              } else await db.set(`tickets.${interaction.guild.id}`, tickets.filter(a => a.author !== interaction.user.id));
            };
            const permissions = [{
              id: interaction.user.id,
              type: OverwriteType.Member,
              allow: ["ViewChannel", "SendMessages", "AttachFiles", "AddReactions", "ReadMessageHistory"]
            }, {
              id: interaction.guild.roles.everyone,
              type: OverwriteType.Role,
              deny: ["ViewChannel"]
            }];
            if (admin !== "noRoleToAddHere") permissions.push({
              id: admin,
              type: OverwriteType.Role,
              allow: ["ViewChannel", "SendMessages", "AttachFiles", "AddReactions", "ReadMessageHistory", "ManageChannels"]
            });

            const channel = await interaction.guild.channels.create({
              name: `ticket-${interaction.user.username}`,
              type: ChannelType.GuildText,
              permissionOverwrites: permissions,
              reason: "Ticket Creation"
            });
            await channel.send({
              content: `${admin !== "noRoleToAddHere" ? `<@&${admin}>,` : ""}${interaction.user}`,
              embeds: [new EmbedBuilder().setColor("Red").setTitle(`Ticket | ${name}`).setDescription(`Hello, welcome to the ticket channel.\nPlease state the problem or topic for which you created the ticket.\nPlease refrain from mentioning admins separately and wait patiently for a response.\nThank you for your patience`).setFooter({ text: embed.footerText, iconURL: embed.footerIcon })],
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`ticket-close-${admin}`).setEmoji("🔒").setLabel("Close").setStyle(ButtonStyle.Secondary))]
            });
            await db.push(`tickets.${interaction.guild.id}`, {
              channel: channel.id,
              author: interaction.user.id
            });
            return await interaction.editReply({
              content: `Your ticket channel has been successfully created.\n${channel}`
            });
          });
        };
      };
    }
  } catch (e) {
    error(e);
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