module.exports = {
    name: "g",
    cooldown: 5,
    aliases: ["z"],
    category: 'Owner 👑',
    utilisation: '{prefix}z',
    description: "UnMutes a member in the discord!",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
  async execute(client, message, args) { 
    if(message.channel.type === 'dm'){
        if(message.content.includes(`@everyone`)) return
        if(message.author.id === client.user.id)return
        if(message.content.includes('@'))return message.channel.send('منشن نمیتونی بکنی کسی رو')

        const ordakserver = client.guilds.cache.get("912598706405146665");
        const channelbug = ordakserver.channels.cache.get('912598707457896456')
        const embed = new Discord.MessageEmbed().setColor(`RANDOM`)
        .setAuthor(`${message.author.username} \t ${message.author.id}`,`https://cdn.discordapp.com/avatars/780464817503993876/2f5de58cc7f7a59713ba69ef8be39eee.png?size=2048`)
        .setDescription(`> ${message.content}`)
        channelbug.send(embed).then((msg)=>{msg.react('939919927278702723')})
    }
  }
}