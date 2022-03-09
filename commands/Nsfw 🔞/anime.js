const akaneko = require("akaneko")
const Discord = require("discord.js")
module.exports = {
    name: 'anime',
    aliases: ['a'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}anime',


  async execute(client, message, args) { 
    const answer = args.join(" ")
  if (message.channel.nsfw === true) {

    if (!answer) {
        const blank = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Commnad Haie Anime!')
            .setDescription('Baraie Estefade Kardan Az Command Ha Matn Zir Ra Negah Konid.')
            .addField('Command Haie Nsfw:', 'ass\nbdsm\nblowjob\ncum\ndoujin\nfeet\nfemdom\nfoxgirl\ngifs\nglasses\nhentai\nnetorare\nmaid\nmasturbation\norgy\npanties\npussy\nschool\nsuccubus\ntentacles\nthighs\nuglyBastard\nuniform\nyuri\nholo\nzettaiRyouiki\nanal', true)
            .setTimestamp()
            .setFooter('Nsfw command |');

        message.channel.send(blank)
    } else if (!message.channel.nsfw) {
        message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
    } else if (answer == 'ass') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.ass())
            .setColor('RANDOM')  
        message.channel.send(embed)
    } else if (answer == 'bdsm') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.bdsm())
            .setColor('RANDOM') 
        message.channel.send(embed)
    } else if (answer == 'blowjob') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.blowjob())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'cum') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.cum())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'blowjob') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.blowjob())
            .setColor('RANDOM')  
        message.channel.send(embed)
    } else if (answer == 'doujin') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.doujin())
            .setColor('RANDOM')  
        message.channel.send(embed)
    } else if (answer == 'feet') {
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')  
            .setImage(await akaneko.nsfw.feet())
        message.channel.send(embed)
    } else if (answer == 'femdom') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.femdom())
            .setColor('RANDOM')  
        message.channel.send(embed)
    } else if (answer == 'foxgirl') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.foxgirl())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'gifs') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.gifs())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'glasses') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.glasses())
            .setColor('RANDOM')  
        message.channel.send(embed)
    } else if (answer == 'hentai') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.hentai())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'netorare') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.netorare())
            .setColor('RANDOM')  
        message.channel.send(embed)
    } else if (answer == 'maid') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.maid())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'masturbation') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.masturbation())
            .setColor('RANDOM')   
        message.channel.send(embed)
    } else if (answer == 'orgy') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.orgy())
            .setColor('RANDOM') 
        message.channel.send(embed)
    }else if(answer === 'anal'){
  const Discord = require('discord.js');
const superagent = require('superagent')
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'hentai_anal'})
    .end((err, response) => {
        const embed = new Discord.MessageEmbed()
            .setImage(response.body.message)
            .setColor('RANDOM')
        message.channel.send(embed)

    })
    }else if(answer === 'holo'){
  const Discord = require('discord.js');
const superagent = require('superagent')
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'holo'})
    .end((err, response) => {
        const embed = new Discord.MessageEmbed()
              .setImage(response.body.message)
            .setColor('RANDOM')
        message.channel.send(embed)

    })
    }  else if (answer == 'panties') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.panties())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'pussy') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.pussy())
            .setColor('RANDOM')   
        message.channel.send(embed)
    } else if (answer == 'school') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.school())
            .setColor('RANDOM')   
        message.channel.send(embed)
    } else if (answer == 'succubus') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.succubus())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'tentacles') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.tentacles())
            .setColor('RANDOM') 
        message.channel.send(embed)
    } else if (answer == 'thighs') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.thighs())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'uglyBastard') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.uglyBastard())
            .setColor('RANDOM')  
        message.channel.send(embed)
    } else if (answer == 'uniform') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.uniform())
            .setColor('RANDOM')  
        message.channel.send(embed)
    } else if (answer == 'yuri') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.yuri())
            .setColor('RANDOM')
        message.channel.send(embed)
    } else if (answer == 'zettaiRyouiki') {
        const embed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.zettaiRyouiki())
            .setColor('RANDOM') 
        message.channel.send(embed)
    } else {
        const wrongarr = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Error!')
            .setDescription('In Command Vojod Nadarad🎪.')
            .setTimestamp()
            .setFooter('Nsfw anime command |');

        message.channel.send(wrongarr)

    }

  } else {
    message.channel.send(":x: shotor faghat mitoni toie channel haie nsfw az command estefade koni :/") 
  }


}

}