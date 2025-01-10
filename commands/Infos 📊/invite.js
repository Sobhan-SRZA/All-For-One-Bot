const {
  MessageEmbed
} = require("discord.js");
const {
   MessageButton,
    MessageActionRow 
} = require('discord-buttons');
module.exports = {
  name: "invite", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: [ "in" ], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos 📊", //the command category for helpcmd [OPTIONAL]
  utilisation: 'invite',
  description: "neshan dadane link invite (davate) bot.", //the command description for helpcmd [OPTIONAL]
  async execute(client, message, args) {
try{ 
  let inviteEmbed = new MessageEmbed()
      inviteEmbed.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      inviteEmbed.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      inviteEmbed.setTitle(`Ba Invite Bot Be Servert Azash Hemaiat Kon☺ ${client.user.username}`)
      inviteEmbed.setDescription(`**Montazer chi hasti🤨? Bodo mano be servert add kon🙂😘 \n\n [Invite Link](${client.config.discord.invite})**`)
      inviteEmbed.setURL(client.config.discord.server_support)
      inviteEmbed.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      inviteEmbed.setColor("#2F3136")
    function Invite() {
      const btn1 = new MessageButton()
      .setStyle('url')
      .setLabel('Invite Me')
      .setEmoji('🤖')
      .setURL(client.config.discord.invite||`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=137775017040&scope=bot%20applications.commands`)
    
      const btn2 = new MessageButton()
      .setStyle('url')
      .setLabel('Support Server!')
      .setEmoji('🧰')
      .setURL(`${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`)
    
      const row = new MessageActionRow()
      .addComponents(btn1, btn2)
    
      return row;
    }
    message.channel.send( { components: [Invite()],embed: inviteEmbed });
  }catch(e) {
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
      console.log(e)
          return message.channel.send(`${client.emotes.error} **| Error, ${e}**`).then(message.author.send(`Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,{ components: [NeedHelpButtons()] }));
            }
    }
}