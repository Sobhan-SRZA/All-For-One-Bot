const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
module.exports = {
  name: "lock",
  description: "بستن یا باز کردن یه چنل خاص",
  category: "admin",
  type: ApplicationCommandType.ChatInput,
  user_permissions: ["ManageChannels"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permissions: false,
  only_owner: false,
  only_admin: false,
  only_slash: true,
  only_message: false,
  options: [{
    name: "type",
    description: "میخوای چنل رو ببندی یا باز کنی؟",
    type: ApplicationCommandOptionType.String,
    required: true,
    choices: [{
      name: "Lock",
      value: "lock"
    }, {
      name: "Unlock",
      value: "unlock"
    }]
  }, {
    name: "role-member",
    description: "رولی که میخوای چتش بسته باشه",
    type: ApplicationCommandOptionType.Mentionable,
    required: false
  }, {
    name: "channel",
    description: "چنلی ک میخوای قفل کنی",
    type: ApplicationCommandOptionType.Channel,
    required: false
  }],

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {Array<string>} args 
   * @returns 
   */
  run: async (client, interaction, args) => {
    const type = interaction.options.getString("type");
    const channel = interaction.options.getChannel("channel") || interaction.channel;
    const role = interaction.options.getMentionable("role-member") || interaction.guild.roles.everyone;
    try {
      if (type === "lock") {
        channel.permissionOverwrites.edit(role.id, {
          SendMessages: false
        });
        return await interaction.reply({
          embeds: [new EmbedBuilder().setColor("Green").setTitle(`🔒|  با موافقیت پاک شد`).addFields([{ name: `چنل`, value: `${channel}` }, { name: `فقل شده توسط`, value: `${interaction.user}` }, { name: `رول فقل شده`, value: `${role}` }]).setTimestamp()],
          ephemeral: true,
        });
      } else {
        channel.permissionOverwrites.edit(role.id, {
          SendMessages: true
        });
        return await interaction.reply({
          embeds: [new EmbedBuilder().setColor("Green").setTitle(`🔓| با موفقیت باز شد`).addFields([{ name: `چنل`, value: `${channel}` }, { name: `باز شده نوسط`, value: `${interaction.user}` }, { name: `رول باز شده `, value: `${role}` }]).setTimestamp()],
          ephemeral: true,
        })
      }
    } catch (e) {
      error(e)
    }
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/