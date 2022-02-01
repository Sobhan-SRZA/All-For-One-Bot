module.exports = {
    name: "nicknamesetup",
    cooldown: 5,
    aliases: ["nis","nickname","nic"],
    category: 'Moderation',
    utilisation: '{prefix}nicknamesetup',
    description: "Setup nickname channel",
  async execute(client, message, args) {
    const Discord = require('discord.js')
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
            var targetChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) ;
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
              targetChannel.send(TargetEmbed).then(message.react('📝'))
          
  if (message.channel.id == targetChannel.id){
    let serverMember = message.guild.members.cache.get(message.guild.id);
    serverMember.setNickname(message.content)
           const messageEmbed = new Discord.MessageEmbed()
                 .setColor("RANDOM")
                 .setTitle(`Nickname Shoma Ba Movafagiat Avaz Shod:)`)
                 .setDescription(`Nickname Shom Be ${message.content} Taghir Yaft`) 
    message.channel.send(messageEmbed).then(msg=> msg.delete({timeout: "7000"})).then(message.delete())
  }  

  
  }
}