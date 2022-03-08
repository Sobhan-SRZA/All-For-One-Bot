module.exports = {
    name: 'clear',
    aliases: ['cl'],
    category: 'Moderation 🗿',
    utilisation: '{prefix}clear',
  async execute(client, message, args) { 
         if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Shoma Permission Estefade Az In Commends Ro nadarid 💩')
        if(!args[0]) return message.channel.send('**Che Tedad Message Ro Mikhahid Pak Konid (1-99)** ')
        if(isNaN(args[0])) return message.channel.send('Faghat Add Ghabel Ghabol Ast')
        if(parseInt(args[0])> 99) return message.send.channel('**Bishtarin Meghdari Pak Kardan Add 99 Ast **')
        await message.channel.bulkDelete(parseInt(args[0]) +1)
            .catch(err => console.log(err))
        message.channel.send(`** ${args[0]} Message Pak Shod **`).then(m => m.delete({ timeout : 5000 }))
       }
  }