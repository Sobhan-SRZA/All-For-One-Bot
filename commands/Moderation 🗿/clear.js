module.exports = {
    name: 'clear',
    aliases: ['cl'],
    category: 'Moderation',
    utilisation: '{prefix}clear',


  async execute(client, message, args) { 

            if (args[1]) {
                let check = isNaN(args[1])
                if (check) {
                    message.reply("مقدار وارد شده اشتباه است")
                }
                if (!check) {
                    if (message.member.hasPermission("MANAGE_CHANNELS")) {
                        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                            let number = args[1]
                            number++
                            message.channel.bulkDelete(number)

                            const result = new Discord.MessageEmbed()
                                .setTitle("با موفقیت انجام شد")
                                .addField("تعداد پیام های زیر پاک شد", args[1])
                                .setColor("RANDOM")
                                .setFooter('این پیام به صورت خودکار پاک میشود')
                            message.channel.send(result).then(msg => {
                                function autodel() {
                                    msg.delete()
                                }

                                setTimeout(autodel, 3 * 1000)

                            })
                        
                    
                }
            }
        }
    }
   
}
} 