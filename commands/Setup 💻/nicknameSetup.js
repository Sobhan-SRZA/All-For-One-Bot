module.exports = {
    name: "nicknamesetup",
    cooldown: 5,
    aliases: ["nis","nickname","nic"],
    category: 'Setup 💻',
    utilisation: 'nicknamesetup [channel] [title]',
    description: "Setup nickname channel",
  async execute(client, message, args) {
    const Discord = require('discord.js')
    const db = require("quick.db")
            let b = await db.fetch(`NicknameChannel_${message.guild.id}`);
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
            var title = message.content.split(' ').slice(2).join(' ') || 'Nickname Channel';
            var description = message.content.split(' ').slice(4).join(' ') || 'Baraie Avaz Shodan Nickname Shoma Lotfan Name Khodea Dar In Channel Beferestid :)';
              let ErrorEmbed = new Discord.MessageEmbed()
                 .setColor("0xFF0000")
                 .setTitle(`❌ | Ekhtar Besorat Zir Setup Konid`,)
                 .setDescription(`⚠ | Bedin Shekl: ${prefix}nic <Nickname Channel> <Nickname Message Title>`)

              let TargetEmbed = new Discord.MessageEmbed()
                 .setColor("RANDOM")
                 .setTitle(title)
                 .setDescription(description)
    let error = args[0];
          if(!error){
                message.channel.send(ErrorEmbed)
          }else
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You Do Not Have The Required Permissions! - [MANAGE_CHANNELS]**")
      if (!args[0]) {
        let channelName = message.guild.channels.cache.get(b);
        if (message.guild.channels.cache.has(b)) {
          return message.channel.send(
            `**Nickname Channel Set In This Server Is <#${channelName.id}>!**`
          );
        }
      } 
//       if(!args[1]) return message.channel.send("**Please Enter A Channel Name or ID To Set!**");
          let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
          if (!channel || channel.type !== 'text') return message.channel.send("**Please Enter A Valid Text Channel!**");
              if (channel.id === b.id) {
                  return message.channel.send("**This Channel is Already Set As Nickname Channel!**")
              } else {
                  db.set(`NicknameChannel_${message.guild.id}`, channel)
  
                  message.channel.send(`**Nickname Channel Has Been Set Successfully in \`${channel.name}\`!**`)
              }
   
      channel.send(TargetEmbed).then(message.react('📝')).then(message.channel.send(
            `**Nickname Channel Set In This Server Is <#${channel.id}>!**`
          ))
  
  }
}