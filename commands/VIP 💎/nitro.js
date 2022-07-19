const Discord = require('discord.js');
module.exports = {
    name: 'nirto',
    description: "this is a nitro generation command.",
    aliases: ['gen','generate'],
    category: 'VIP 💎',
    cooldown: 5,
    utilisation: '{prefix}nitro',
  async execute(client, message, args) {
    if (!message.author.roles.cache.has(client.config.vip_role))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor('RED')
          .setFooter(``)
          .setTitle(`> You are not allowed to run this Command`)
          .setDescription(`You need to get be one of those this role in (SIZAR Team Server)[${client.config.server_support}]: ${client.config.vip_role.map(id => `<@${id}>`)}`)
        );
//let targetChannel = ['912596017025785867','912596017025785866','912596016765751325','912596016765751324','912598709303398410','912598709303398411','912598709303398412','902034609661943809']
var prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
function nitroCodeGen() {
   var length = 18;
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
    let dmEmbed = new Discord.MessageEmbed()
      .setAuthor(`Required By ${message.author.tag}`,message.author.displayAvatarURL())    
      .setTitle("Nitro Code Is Ready")
      .setColor("RANDOM")
      .setThumbnail('https://media.discordapp.net/attachments/919864051444645938/940394407318941786/xt.gif')
      .setURL("https://discord.gg/vgnhGXabNw")
      .setDescription(`Salam Baradar Man Baraie Shoma Link Nitro Gift Ro Estekhraj Kardam ;) , Lotfan Dm Khodra Check Konid Ta Linke Khodra Bebinid :) Baraye Estefade Mojaddad Az Bot Commande Ro Be Ro Bezanid **${prefix}gen**`)
      .setFooter("Created By Mr.SIN RE#1528 :)","https://media.discordapp.net/attachments/919864051444645938/940393330699804692/XOsX.gif")
    const link = "https://discord.gift/";
    const nitroCode = link + nitroCodeGen();
//  if(targetChannel.includes(message.channel.id)){
  if(message.channel.id){
    return message.channel.send(dmEmbed).then(message.author.send(`
Your Unlocked Nitro Code=>${nitroCode}`))
  }else
    return message.reply(`⛔ | Azizam Baraie Estefade Az In Command Baiad Be Channele Makhsos Beri :)`)
  }
}
