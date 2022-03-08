const Discord = require('discord.js');
module.exports = {
    name: 'jill',
    description: "this is a avatar command",
    aliases: ['jil','ji'],
    category: 'Moderation 🗿',
    cooldown: 5,
    utilisation: '{prefix}jill',
  async execute(client, message, args) { 
const Discord = require('discord.js');
//module.exports = (member, time, rason, channel, message) => {

    message.delete();
    const jailrole = '775696180221837339'
    const blockschannel = '792305575437664266'
    const jailchannel = message.guild.channels.cache.get(blockschannel)
    if (message.channel.id === blockschannel) return
    member.roles.add(jailrole)
    const emb = new Discord.MessageEmbed().setColor('#ff5500')
        .setDescription(`<@!${member.id}> **AUTO JAILED !**🔒`)
    message.channel.send(emb)


    const embed = new Discord.MessageEmbed().setColor('#ffd400')
        .setDescription(
            `
            <@!${member.id}> **Broke the Rules!**
            **ADMIN :** Ordak Auto Jail
            **Time :** ${time}m
            **Reason : ** ${rason}
            `
        )
    jailchannel.send(`<@!${member.id}>`).then((msg1) => {
        setTimeout(() => {
            msg1.delete();
        }, 2000);
    })

    jailchannel.send(embed).then((msg) => {

        setTimeout(function() {
            member.roles.remove(jailrole)
            const unjailembed = new Discord.MessageEmbed().setColor('RANDOM')
                .setDescription(`<@!${member.id}> **UnJailed!**`)
            msg.edit(unjailembed)
        }, time * 60 * 1000)
    })

    }
}