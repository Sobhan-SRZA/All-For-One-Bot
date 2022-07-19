const ms = require('ms');
const {
	MessageEmbed
  } = require("discord.js");
const {
	 MessageButton,
	MessageActionRow 
  } = require('discord-buttons');
const db = require("quick.db");
module.exports = {
    name: "greroll",
    cooldown: 5,
    aliases: [ "donorreroll", "givereroll", "giveawayreroll" ],
    category: 'Giveaway 🎁',
    utilisation: '{prefix}greroll',
    description: "set your giveaway to reroll and restart the ended giveaway.",
  async execute(client, message, args) { 
try{
    var everyoneMention = true;
    var hostedBy = true;
    var prefix = await db.fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways") && !message.member.roles.cache.some((r) => r.name === "Donor")){
        return message.channel.send(':x: You need to have the **"MANAGE_MESSAGES"** permissions to reroll giveaways.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('This giveaway is not ended!');
        } else {
            console.error(e);
            message.channel.send(`An error occured...\nDescription: ${e}`);
        }
    });

}catch(e) {
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
      .setURL(`${client.config.botServerSupportLink||"https://discord.gg/5GYNec4urW"}`)
    
      const row = new MessageActionRow()
      .addComponents(btn1, btn2)
    
      return row;
    }
      console.log(e)
          return message.channel.send(`${client.emotes.error} **| Error, ${e}**`).then(message.author.send(`Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,{ components: [NeedHelpButtons()] }));
	 }
   }
}
