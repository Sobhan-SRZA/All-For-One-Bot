const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const error = require("../../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").ButtonInteraction} interaction 
 * @returns 
 */
module.exports = async (client, interaction) => {
  try {
    const db = client.db;
    if (!interaction.isButton()) return;
    
    if (!interaction.customId.startsWith("ticket")) return;

    const customId = interaction.customId.replace("ticket-", "");
    if (customId.startsWith("close")) {
      const [__, admin] = customId.split("-");
      await interaction.deferUpdate();
      const message = await interaction.channel.send({
        content: `${interaction.user}, Are you sure you want to close the ticket?`,
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("ticket-accept").setEmoji("✅").setLabel("Yes").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("ticket-cancel").setEmoji("❌").setLabel("No").setStyle(ButtonStyle.Secondary))]
      });
      const collect = message.createMessageComponentCollector({ time: 60 * 1000 });
      collect.on("collect", async (button) => {
        switch (button.customId) {
          case "ticket-accept": {
            await button.deferUpdate();
            const tickets = await db.get(`tickets.${interaction.guild.id}`);
            if (tickets && tickets.length > 0 && tickets.some(a => a.channel === interaction.channel.id)) {
              const ticket = tickets.find(a => a.channel === interaction.channel.id);
              if (interaction.guild.members.cache.has(ticket.author)) {
                const user = interaction.guild.members.cache.get(ticket.author);
                await button.deleteReply();
                await interaction.channel.permissionOverwrites.edit(user, {
                  ViewChannel: false
                });
                await interaction.channel.send({
                  content: `Ticket closed by ${interaction.user}!`,
                  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("ticket-open-" + admin).setEmoji("🔓").setLabel("Open").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("ticket-delete-" + admin).setEmoji("❌").setLabel("Delete").setStyle(ButtonStyle.Secondary))]
                });
              } else {
                await button.editReply({
                  content: `No user found with ID ${ticket.author}.`
                })
              }
            };
          };
          case "ticket-cancel": {
            return collect.stop();
          };
        }
      });
      collect.on("end", async () => {
        try {
          await message.delete();
        } catch {
        }
      });
    };

    if (customId.startsWith("open")) {
      const [__, admin] = customId.split("-");
      if (admin !== "noRoleToAddHere" && interaction.member.roles.cache.has(admin) || interaction.channel.permissionsFor(interaction.user).has(["ManageChannels"])) {
        const tickets = await db.get(`tickets.${interaction.guild.id}`);
        if (tickets && tickets.length > 0 && tickets.some(a => a.channel === interaction.channel.id)) {
          const ticket = tickets.find(a => a.channel === interaction.channel.id);
          if (interaction.guild.members.cache.has(ticket.author)) {
            const user = interaction.guild.members.cache.get(ticket.author);
            await interaction.deferUpdate();
            await interaction.deleteReply();
            await interaction.channel.permissionOverwrites.edit(user, {
              ViewChannel: true
            });
            await interaction.channel.send({
              content: `Ticket successfully reopened by ${interaction.user}!`,
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("ticket-close-" + admin).setEmoji("🔒").setLabel("Close").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("ticket-delete-" + admin).setEmoji("❌").setLabel("Delete").setStyle(ButtonStyle.Secondary))]
            });
          } else return await interaction.reply({
            content: `No user found with ID ${ticket.author}.`,
            ephemeral: true
          })
        };
      } else return await interaction.reply({
        content: `You do not have permission to use this button.`,
        ephemeral: true
      });
    };

    if (customId.startsWith("delete")) {
      const [__, admin] = customId.split("-");
      if (admin !== "noRoleToAddHere" && interaction.member.roles.cache.has(admin) || interaction.channel.permissionsFor(interaction.user).has(["ManageChannels"])) {
        const tickets = await db.get(`tickets.${interaction.guild.id}`);
        if (tickets && tickets.length > 0 && tickets.some(a => a.channel === interaction.channel.id)) {
          await interaction.deferUpdate();
          await interaction.deleteReply();
          await db.set(`tickets.${interaction.guild.id}`, tickets.filter(a => a.channel !== interaction.channel.id))
          setTimeout(async () => await interaction.channel.delete(), 5 * 1000)
        };
      } else return await interaction.reply({
        content: `You do not have permission to use this button.`,
        ephemeral: true
      });
    };
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