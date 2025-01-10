const {
  MessageEmbed,
  Permissions
} = require('discord.js')
module.exports = {
    name: "nicknamesetup",
    cooldown: 5,
    aliases: ["nis","nickname","nic"],
    category: 'Setup 💻',
    usage: '[channel] [title]',
    description: "Setup nickname channel",
  async execute(client, message, args) {
    const db = require("quick.db")
            let NickChannel = await db.fetch(`NicknameChannel_${message.guild.id}`);
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`)||cllient.prefix;
            var title = message.content.split(' ').slice(2).join(' ') || 'Nickname Channel';
            var description = message.content.split(' ').slice(4).join(' ') || 'Baraie Avaz Shodan Nickname Shoma Lotfan Name Khodea Dar In Channel Beferestid :)';
              let ErrorEmbed = new MessageEmbed()
                 .setColor(client.colors.red)
                 .setTitle(`❌ | Ekhtar Besorat Zir Setup Konid`,)
                 .setDescription(`⚠ | Bedin Shekl: ${prefix}nic <Nickname Channel> <Nickname Message Title>`)

              let TargetEmbed = new MessageEmbed()
                 .setColor("RANDOM")
                 .setTitle(title)
                 .setDescription(description)
    let error = args[0];
          if(!error){
                message.channel.send({embed:[ErrorEmbed]})
          }else
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("**You Do Not Have The Required Permissions! - [MANAGE_CHANNELS]**")
      if (!error) {
        let channelName = message.guild.channels.cache.get(NickChannel);
        if (message.guild.channels.cache.has(NickChannel)) {
          return message.channel.send(
            `**Nickname Channel Set In This Server Is <#${channelName.id}>!**`
          );
        }
      } 
//       if(!args[1]) return message.channel.send("**Please Enter A Channel Name or ID To Set!**");
          let Channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
          //if (!channel || channel.type !== 'text') return message.channel.send("**Please Enter A Valid Text Channel!**");
              if (Channel === NickChannel) {
                  return message.channel.send("**This Channel is Already Set As Nickname Channel!**")
              } else {
                  db.set(`NicknameChannel_${message.guild.id}`, Channel)
  
                  message.channel.send(`**Nickname Channel Has Been Set Successfully in \`${Channel.name}\`!**`)
              }
   
      Channel.send({embeds:[TargetEmbed]}).then(message.react('📝')).then(message.reply(
            `**Nickname Channel Set In This Server Is <#${Channel.id}>!**`
          ))
  
  }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */