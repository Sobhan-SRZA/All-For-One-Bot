module.exports = {
    name: "user-info",
    cooldown: 5,
    aliases: ["user","ui","userinfo"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}userinfo',
    description: "send some information of user",
    usage: "[name | mention | ID]",
  async execute(client, message, args) { 
    try {
//=========== Pckages ============
    const Discord = require('discord.js');
    const { MessageButton, MessageActionRow } = require('discord-buttons');
    const axios = require("axios")
    let Member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);// || message.author;
    const activity = Member.presence.activities[0];
    const statuses = {
      "online" : "🟢",
      "idle"   : "🟠",
      "dnd"    : "🔴",
      "offline": "⚫️",
     }
   if(activity){
      if(activity.type === "CUSTOM_STATUS"){
       let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
        var userstatus = `${emoji} \`${activity.state || 'Activity Baraie Ishon Vojod Nadarad'}\``
        }
     else{
       var userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
       }
    }
//const memberRoles = Member.roles.cache.filter(roles => roles.id !== message.guild.id).map((role) => role.toString());
//const memberRoles = Member.roles.cache.size;
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
   const userFlags = Member.flags.toArray();

//========== Functions ==========
function epochCreate (date) {
  return Date.parse(date)
}
const createdAt = Member.createdTimestamp; 
const createdAtDate = epochCreate(createdAt) / 1000;
      
function epochJoin (date) {
  return Date.parse(date)
}
const joinedAt = Member.joinedTimestamp; 
const joinedAtDate = epochJoin(joinedAt) / 1000;

function NeedHelpButtons() {
  const btn1 = new MessageButton()
  .setStyle('url')
  .setLabel('Invite Me')
  .setEmoji('🤖')
  .setURL(client.config.discord.invite)

  const btn2 = new MessageButton()
  .setStyle('url')
  .setLabel('Support Server!')
  .setEmoji('🧰')
  .setURL(`${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`)

  const row = new MessageActionRow()
  .addComponents(btn1, btn2)

  return row;
}
axios.get(`https://discord.com/api/users/${Member.id}`,{
   headers: {
     Authorization: `Bot ${process.env.TOKEN}`
   }
  }).then((res)=> {
function DownloadLinks() {
    let { avatar } = res.data;
  const btn1 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Avatar Format PNG')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.png?size=4096`)

  const btn2 = new MessageButton()
  .setStyle('url')
  .setLabel('Download Avatar Format GIF')
  .setURL(`https://cdn.discordapp.com/avatars/${Member.id}/${avatar}.gif?size=4096`)

  const row = new MessageActionRow()
  .addComponents(btn1,btn2)

  return row;
   } 
 })


//========= Embed-Message ===========
  let UserEmbed = new Discord.MessageEmbed()
    .setAuthor(`About ${Member.tag}`,message.guild.iconURL({ dynamic: true }),client.config.discord.server_support)
    .setTitle(client.emotes.maske + "| User Information In Discord")
    .addField(`🆔| User ID:`,`<:reply_desgine:950701730675445790>**${Member.id}**`)
    .addField(`🥋| User Tag:`, `<:reply_desgine:950701730675445790>**${Member.tag}**`,true) 
    .addField(`✨| User Status:`,`<:reply_desgine:950701730675445790>**${statuses[Member.presence.status]} ${Member.presence.status}**`,true)
    .addField('🎬| User Activity:',`<:reply_desgine:950701730675445790>**${userstatus}**`,true)
    .addField(`🎨| Color of User Banner:`,`<:reply_desgine:950701730675445790>**${Member.displayHexColor||"Nadarad🗿"}**`,true)
    .addField('🏳| User Flags:',`<:reply_desgine:950701730675445790>**${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}**`,true)
    .addField(`📅| Date of Join Discord:`,`<:reply_desgine:950701730675445790>**<t:${createdAtDate}:R>**`,true) 
    .addField(`📈| Date of Join Server:`, `<:reply_desgine:950701730675445790>**<t:${joinedAtDate}:R>**`,true) 
    //.addField(`📸| User Roles Count:`,`<:reply_desgine:950701730675445790>**[${memberRoles}] Roles**`,true) 
    //.addField(`🎯| Highest Role In Server:`,`<:reply_desgine:950701730675445790>**<@&${Member.roles.highest.id === message.guild.id ? 'None' : Member.roles.highest.id}>**`,true) 
    //.addField('💻| User Permissions In Server:',`<:reply_desgine:950701730675445790>**${Member.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}**`,true)
    .addField('🤖| User Is a Bot?:',`<:reply_desgine:950701730675445790>**\`${Member.user.bot ? "yep ✔️" : "no ❌"}\``,true)
    .setColor(Member.displayHexColor||"#2F3136")
    .setThumbnail(Member.displayAvatarURL({ size:4096 , dynamic: true }))
    .setFooter(`Requsted By ${message.author.tag}`,message.author.displayAvatarURL({ size:4096 , dynamic: true }))

  return message.channel.send({ embed: UserEmbed, components: [DownloadLinks()] }).then(message.author.send(`Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,{ components: [NeedHelpButtons()] }))
         }catch(e) {
	console.log(e)
      return message.channel.send(`${client.emotes.error} **| Error, ${e}**`);
        }
    },
};