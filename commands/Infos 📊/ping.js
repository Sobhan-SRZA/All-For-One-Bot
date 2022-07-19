const {
  MessageEmbed
} = require("discord.js");
const {
   MessageButton,
    MessageActionRow 
} = require('discord-buttons');
module.exports = {
  name: "ping", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: [ "pong" ], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos 📊", //the command category for helpcmd [OPTIONAL]
  utilisation: 'ping',
  description: "ferestadan va neshan dadane ping bot.", //the command description for helpcmd [OPTIONAL]
  async execute(client, message, args) {
try{ 
  var states = "🟢 Excellent";
  var states2 = "🟢 Excellent";
  var msg = `${Date.now() - message.createdTimestamp}`;
  var api = `${Math.round(client.ws.ping)}`;
  if (Number(msg) > 70) states = "🟢 Good";
  if (Number(msg) > 170) states = "🟡 Not Bad";
  if (Number(msg) > 350) states = "🔴 Soo Bad";
  if (Number(api) > 70) states2 = "🟢 Good";
  if (Number(api) > 170) states2 = "🟡 Not Bad";
  if (Number(api) > 350) states2 = "🔴 Soo Bad";
let pingEmbed = new MessageEmbed()
pingEmbed.setThumbnail(message.client.user.displayAvatarURL())
pingEmbed.setColor("#2F3136");
pingEmbed.setDescription(`**Pong🏓!**
📱${client.user.username} Ping `);
pingEmbed.addField("**Time Taken:**", `\`${msg + " ms 📶 | " + states}\``, true)
pingEmbed.addField("**WebSocket:**", `\`${api + " ms 📶 | " + states2}\``, true)
pingEmbed.setTimestamp();
pingEmbed.setFooter(`Requested by ${message.author.username} | `, `${message.author.displayAvatarURL()}`);

message.channel.send(pingEmbed);
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