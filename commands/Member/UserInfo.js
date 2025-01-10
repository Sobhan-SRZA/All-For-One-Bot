module.exports = {
  name: "user-info",
  cooldown: 5,
  aliases: ["user", "ui", "userinfo"],
  category: 'Member 👻',
  utilisation: '{prefix}userinfo [name | mention | ID]',
  description: "send some information of target user.",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    //=========== Pckages ============
    const Discord = require('discord.js');
    const { MessageButton, MessageActionRow } = require('discord-buttons');
    const axios = require("axios")
    var Member;

    if (args[0]) {
      Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    } else {
      Member = message.guild.members.cache.get(message.author.id);
    }
    const statuses = {
      "online": "🟢",
      "idle": "🟠",
      "dnd": "🔴",
      "offline": "⚫️",
    }
    var userstatus = "Not Having An Activity";
    if (Member.user.presence.activities[0]) {
      const activity = Member.user.presence.activities[0];
      if (activity.type === "CUSTOM_STATUS") {
        let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`
        userstatus = `${emoji} \`${activity.state || 'Not Having An Acitivty.'}\``
      }
      else {
        userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
      }
    }
    const memberRoles = Member.roles.cache.filter(roles => roles.id !== message.guild.id).array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => role.toString()).join(', ')
    const memberRolesCount = Member.roles.cache.size - 1;
    const flags = {
      DISCORD_EMPLOYEE: 'Discord Employee',
      DISCORD_PARTNER: 'Discord Partner',
      BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
      BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
      HYPESQUAD_EVENTS: 'HypeSquad Events',
      HOUSE_BRAVERY: 'House of Bravery',
      HOUSE_BRILLIANCE: 'House of Brilliance',
      HOUSE_BALANCE: 'House of Balance',
      EARLY_SUPPORTER: 'Early Supporter',
      TEAM_USER: 'Team User',
      SYSTEM: 'System',
      VERIFIED_BOT: 'Verified Bot',
      VERIFIED_DEVELOPER: 'Verified Bot Developer'
    };
    const userFlags = Member.user.flags.toArray();


    try {
      //========== Functions ==========
      function epoch(date) {
        return Date.parse(date)
      }
      var createdAtDate = epoch(Member.user.createdAt) / 1000 || epoch(Member.createdAt) / 1000;
      var joinedAtDate = epoch(Member.joinedAt) / 1000;
      await axios.get(`https://discord.com/api/users/${Member.id}`, {
        headers: {
          Authorization: `Bot ${client.config.discord.token}`
        }
      }).then((res) => {
        const { avatar, accent_color } = res.data;
        function DownloadLinks() {
          const btn1 = new MessageButton()
            .setStyle('url')
            .setLabel('Download Avatar Format PNG')
            .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.png?size=4096`)

          const btn2 = new MessageButton()
            .setStyle('url')
            .setLabel('Download Avatar Format GIF')
            .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.gif?size=4096`)

          const row = new MessageActionRow()
            .addComponents(btn1, btn2)

          return row;
        }

        //========= Embed-Message ===========
        let UserEmbed = new Discord.MessageEmbed()
          .setAuthor(`About ${Member.user.tag}`, message.guild.iconURL({ dynamic: true }), client.config.discord.server_support)
          .setTitle(client.emotes.maske + "| User Information In Discord")
          .setColor(accent_color || "#2F3136")
          .addField(`🆔| User ID:`, `<:reply_desgine:950701730675445790>**${Member.user.id}**`)
          .addField(`🥋| User Tag:`, `<:reply_desgine:950701730675445790>**${Member.user.tag}**`, true)
          .addField(`✨| User Status:`, `<:reply_desgine:950701730675445790>**${statuses[Member.user.presence.status]} ${Member.user.presence.status}**`, true)
          .addField('🎬| User Activity:', `<:reply_desgine:950701730675445790>**${userstatus}**`, true)
          .addField('🏳| User Flags:', `<:reply_desgine:950701730675445790>**${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nadarad🗿'}**`, true)
          .addField(`📅| Date of Join Discord:`, `<:reply_desgine:950701730675445790>**<t:${createdAtDate}:R>**`, true)
          .addField(`📈| Date of Join Server:`, `<:reply_desgine:950701730675445790>**<t:${joinedAtDate}:R>**`, true)
          .addField(`📸| [${memberRolesCount}] Roles:`, `<:reply_desgine:950701730675445790>**[${memberRoles}]**`, true)
        UserEmbed.addField(`🎨| Color of User Profile:`, `<:reply_desgine:950701730675445790>**${accent_color ? "#" + accent_color : "Nadarad🗿"}**`, true)
        UserEmbed.addField(`🎯| Highest Role In Server:`, `<:reply_desgine:950701730675445790>**<@&${Member.roles.highest.id}>**`, true)
        UserEmbed.addField('💻| User Permissions In Server:', `<:reply_desgine:950701730675445790>**${Member.permissions.toArray().map(p => `\`${p}\``).join(", ")}**`, true)
        UserEmbed.addField('🤖| User Is a Bot?:', `<:reply_desgine:950701730675445790>**\`${Member.user.bot === true ? "Yes✅" : "No❌"}\`**`, true)
        UserEmbed.setThumbnail(Member.user.displayAvatarURL({ size: 4096, dynamic: true }))
        UserEmbed.setFooter(`Requsted By ${message.author.tag}`, message.author.displayAvatarURL({ size: 4096, dynamic: true }))

        return message.channel.send({ embed: UserEmbed, components: [DownloadLinks()] })
      })
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

  },
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