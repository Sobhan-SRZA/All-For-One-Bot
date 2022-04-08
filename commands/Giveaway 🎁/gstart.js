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
    name: "gstart",
    cooldown: 5,
    aliases: [ "donorstart", "givestart", "giveawaystart" ],
    category: 'Giveaway 🎁',
    utilisation: '{prefix}gstart',
    description: "setting your giveaway to start.",
  async execute(client, message, args) { 
try{
    var everyoneMention = true;
    var hostedBy = true;
    var prefix = await db.fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways") && !message.member.roles.cache.some((r) => r.name === "Donor")){
        return message.channel.send(':x: You need to have the **"MANAGE_MESSAGES"** permissions to reroll giveaways.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(`:x: You have to mention a valid channel!\n Exsampel: ${prefix}gstart #giveaway 5m 1 Testing`);
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(`:x: You have to specify a valid duration!\n Exsampel: ${prefix}gstart #giveaway 5m 1 Testing`);
    }

    // Number of winners
    let giveawayWinner = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayWinner) || (parseInt(giveawayWinner) <= 0)){
        return message.channel.send(`:x: You have to specify a valid number of winners!\n Exsampel: ${prefix}gstart #giveaway 5m 1 Testing`);
    }

    // Giveaway prize
    let giveawayPrize = args[3];
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayWinner++,
        // Who hosts this giveaway
        hostedBy: message.author || null,
        // Messages
        thumbnail: message.guild.iconURL({ dynamic: true }) || null,
         messages: {
            giveaway: (everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: 'Winner(s):',
            endedAt: "Ended at",
           },
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            },
            lastChance: {
                enabled: true,
                content: '⚠️ **LAST CHANCE TO ENTER!** ⚠️',
                threshold: 5000,
                embedColor: '#FF0000'
            }
      
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);
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
