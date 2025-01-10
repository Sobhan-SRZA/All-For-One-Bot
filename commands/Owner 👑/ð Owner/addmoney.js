const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser } = require("../../handlers/functions")
module.exports = {
  name: "addmoney",
  category: "💸 Economy",
  aliases: ["ecoaddmoney"],
  description: "Adds Money to someone else!",
  usage: "addmoney <@USER> <Amount>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:RedNope:914312373890854922> You are not allowed to run this Command`)
        .setDescription(`You need to be one of those guys: ${config.ownerIDS.map(id => `<@${id}>`)}`)
      );
    if(!client.settings.get(message.guild.id, "ECONOMY")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:RedNope:914312373890854922> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    try {
    //command
    var user  = message.author;
    var topay = message.mentions.members.filter(member=>member.guild.id == message.guild.id).first();
    if(!topay) 
    return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:RedNope:914312373890854922> You didn't pinged to whom you want to pay`)
        .setDescription(`Usage: \`${prefix}addmoney <@USER> <Amount>\`\n\n\Example: \`${prefix}addmoney <@757243549774381099> 42069\``)
      );
    topay = topay.user;
    let payamount = Number(args[1]);
    if(!payamount)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:RedNope:914312373890854922> You didn't add the payamount`)
        .setDescription(`Usage: \`${prefix}addmoney <@USER> <Amount>\`\n\n\Example: \`${prefix}addmoney <@442355791412854784> 42069\``)
      );
    if(user.bot || topay.bot) return message.reply("<:RedNope:914312373890854922> **A Discord Bot can not have Economy!**")
    client.economy.ensure(`${message.guild.id}-${user.id}`, {
      user: user.id,
      work: 0,
      balance: 0,
      bank: 0,
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      items: {
        yacht: 0, lamborghini: 0, car: 0, motorbike: 0,  bicycle: 0,
        nike: 0, tshirt: 0,
        mansion: 0, house: 0, dirthut: 0,
        pensil: 0, pen: 0, condom: 0, bottle: 0,
        fish: 0, hamster: 0, dog: 0, cat: 0,            
      }
    })
    client.economy.ensure(`${message.guild.id}-${topay.id}`, {
      user: user.id,
      work: 0,
      balance: 0,
      bank: 0,
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      items: {
        yacht: 0, lamborghini: 0, car: 0, motorbike: 0,  bicycle: 0,
        nike: 0, tshirt: 0,
        mansion: 0, house: 0, dirthut: 0,
        pensil: 0, pen: 0, condom: 0, bottle: 0,
        fish: 0, hamster: 0, dog: 0, cat: 0,          
      }
    })
    //get the economy data 
    let data2 = client.economy.get(`${message.guild.id}-${topay.id}`)

    if(payamount <= 0)
    return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:RedNope:914312373890854922> You can't add a negative Amount of Money or no Money, to ${topay}`)
      );
    
  
    client.economy.math(`${message.guild.id}-${topay.id}`, "+", payamount, "balance")
    data2 = client.economy.get(`${message.guild.id}-${topay.id}`)
    //return some message!
    return message.reply(new MessageEmbed()
      .setColor(es.color)
      .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
      .setTitle(`<:GreenCheck:914034845112479774>  **You added \`${payamount} 💸\` to \`${topay.tag}\`**`)
      .setDescription(`👛 **${topay.username}** now has \`${Math.floor(data2.balance)} 💸\` in his/her Pocket`)
    );
  } catch (e) {
    console.log(String(e.stack).bgRed)
    return message.channel.send(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`<:RedNope:914312373890854922> An error occurred`)
      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
    );
  }
}
};
/**
* @INFO
* Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
* @INFO
* Work for Milrato Development | https://milrato.eu
* @INFO
* Please mention Him / Milrato Development, when using this Code!
* @INFO
*/
