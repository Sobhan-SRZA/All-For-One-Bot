const axios = require("axios")
const { 
  MessageButton, 
  MessageActionRow,
  MessageEmbed
} = require('discord.js');
const { 
  NeedHelpButtons 
} = require('../../functions/functions');
module.exports = {
    name: "user-info",
    cooldown: 5,
    aliases: ["user","ui","userinfo"],
    category: 'Member 👻',
    utilisation: '{prefix}userinfo [name | mention | ID]',
    description: "send some information of target user.",
  async execute(client, message, args) {     
    var Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const statuses = {
      "online" : "🟢",
      "idle"   : "🟠",
      "dnd"    : "🔴",
      "offline": "⚫️",
     }
    const activity = Member.presence.activities[0];   
    var userstatus
        if(activity){
          if(activity.type === "CUSTOM_STATUS"){
            let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
            userstatus = `${emoji} \`${activity.state || 'Not Having An Acitivty.'}\``
          }
          else{
            userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
          }
       }else{
        userstatus = "Not Having An Activity";
       }
    const memberRoles = Member.user.roles.cache.filter(roles => roles.id !== message.guild.id).array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => role.toString()).join(', ')
    const memberRolesCount = Member.user.roles.cache.size - 1;
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
axios.get(`https://discord.com/api/users/${Member.id}`,{
   headers: {
     Authorization: `Bot ${process.env.TOKEN}`
   }
  }).then((res)=> {
  let { avatar, accent_color } = res.data;
function DownloadLinks() {
  const btn1 = new MessageButton()
  .setStyle('LINK')
  .setLabel('Download Avatar Format PNG')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.png?size=4096`)

  const btn2 = new MessageButton()
  .setStyle('LINK')
  .setLabel('Download Avatar Format GIF')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.gif?size=4096`)

  const row = new MessageActionRow()
  .addComponents([btn1, btn2])

  return row;
   } 
var IsBot
if(Member.user.bot === true){
 var IsBot = "yes ✔️";
}else {
 var IsBot = "no ❌";
}

//========= Embed-Message ===========
  let UserEmbed = new MessageEmbed()
    .setAuthor({
      text:`About ${Member.tag}`,
      iconURL:message.guild.iconURL({ dynamic: true }),
      url:client.config.discord.server_support
    })
    .setTitle(client.emotes.maske + "| User Information In Discord")
    .setColor(accent_color||"#2F3136")
    .addField(`🆔| User ID:`,`${client.emotes.reply}**${Member.user.id}**`)
    .addField(`🥋| User Tag:`, `${client.emotes.reply}**${Member.user.tag}**`,true) 
    .addField(`✨| User Status:`,`${client.emotes.reply}**${statuses[Member.user.presence.status]} ${Member.user.presence.status}**`,true)
    .addField('🎬| User Activity:',`${client.emotes.reply}**${userstatus}**`,true)
    .addField('🏳| User Flags:',`${client.emotes.reply}**${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nadarad🗿'}**`,true)
    .addField(`📅| Date of Join Discord:`,`${client.emotes.reply}**<t:${createdAtDate}:R>**`,true) 
    .addField(`📈| Date of Join Server:`, `${client.emotes.reply}**<t:${joinedAtDate}:R>**`,true) 
    .addField(`📸| [${memberRolesCount}] Roles:`,`${client.emotes.reply}**[${memberRoles}]**`,true) 
if(accent_color === null){
  accent_color = "Rangi Ke User Darad Custom Nist"
} else {
  accent_color = "#" + accent_color
}
   UserEmbed.addField(`🎨| Color of User Profile:`,`${client.emotes.reply}**${accent_color||"Nadarad🗿"}**`,true)
   UserEmbed.addField(`🎯| Highest Role In Server:`,`${client.emotes.reply}**<@&${Member.roles.highest.id}>**`,true) 
   UserEmbed.addField('💻| User Permissions In Server:',`${client.emotes.reply}**${Member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}**`,true)
   UserEmbed.addField('🤖| User Is a Bot?:',`${client.emotes.reply}**\`${IsBot}\`**`,true)
   UserEmbed.setThumbnail(Member.user.displayAvatarURL({ size:4096 , dynamic: true }))
   UserEmbed.setFooter({
    text:`Requsted By ${message.author.tag}`,
    iconURL:message.author.displayAvatarURL({ size:4096 , dynamic: true })
  })

  return message.reply({
               embeds: [UserEmbed], 
               components: [DownloadLinks()] 
         })
              })
         }catch(e) {
	console.log(e)
      return message.reply({
            embeds: [errorEmbed(
              message,
              `**we have a problem\n \`\`\`js\n${e}\`\`\`**`
            )],
            components: [NeedHelpButtons(client)],
        }).then(message.member.send({
          content: `Hi My Friend👋🏻\n if I've got an error or problem please report it for my developers😉\n you can join to support server and talk us:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,
          components: [NeedHelpButtons(client)] 
            })
        );
        }
    },
};
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */