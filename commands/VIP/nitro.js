const Discord = require("discord.js");
module.exports = {
  name: "nirto",
  description: "this is a nitro generation command.",
  aliases: ["gen", "generate"],
  category: "VIP 💎",
  cooldown: 5,
  utilisation: "{prefix}nitro",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const db = client.db;
    const guild = client.guilds.cache.get(client.config.discord.support_server_id);
    if (!guild.members.cache.get(message.author.id).roles.cache.some(a => client.config.vip_role.includes(a.id)))
      return message.channel.send(new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`> You are not allowed to run this Command`)
        .setDescription(`You need to get be one of those this role in [Persian Caesar Server](${client.config.discord.server_support}): ${client.config.vip_role.map(id => `<@&${id}>`)}`)
      );
    const prefix = await db.get(`prefix_${message.guild.id}`) || client.config.discord.prefix;
    function generateRandomNitro() {
      const lengths = [8, 16, 24]
      const length = lengths[Math.floor(Math.random() * lengths.length)];
      let nitroKey = "";
      let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (var i = 0; i < length; i++) {
        nitroKey += chars.charAt(Math.floor(Math.random() * chars.length));
      };
      return nitroKey;
    };
    let dmEmbed = new Discord.MessageEmbed()
      .setAuthor(`Required By ${message.author.tag}`, message.author.displayAvatarURL())
      .setTitle("Nitro Code Is Ready")
      .setColor("RANDOM")
      .setThumbnail("https://media.discordapp.net/attachments/919864051444645938/940394407318941786/xt.gif")
      .setURL("https://dsc.gg/persian-caesar")
      .setDescription(`Salam Baradar Man Baraie Shoma Link Nitro Gift Ro Estekhraj Kardam ;) , Lotfan Dm Khodra Check Konid Ta Linke Khodra Bebinid :) Baraye Estefade Mojaddad Az Bot Commande Ro Be Ro Bezanid **${prefix}gen**`)
      .setFooter("Created By mr.sinre :)", "https://media.discordapp.net/attachments/919864051444645938/940393330699804692/XOsX.gif")
    const link = "https://discord.gift/";
    const nitroCode = link + generateRandomNitro();
    return message.channel.send(dmEmbed).then(message.author.send(`
Your Unlocked Nitro Code => ${nitroCode}`))
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */