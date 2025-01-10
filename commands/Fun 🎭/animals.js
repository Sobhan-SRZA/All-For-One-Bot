const { 
   list 
} = require('../../functions/functions.js');
const aimals = require('../../JSON/animal_name.json');
const {
    MessageEmbed,
    Permissions
} = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'animals',
    description: 'sent animals pictures.',
    aliases: ['heivan','animal'],
    category: 'Fun 🎭 | Image',
    usage: `[use: ${list(aimals, ',')}]`,
   async execute(client, message, args) {
  const answer = args.join(" ")
    if (!answer) {
        const embed = new MessageEmbed()
            .setColor(client.colors.none)
            .setTitle(client.emotes.animal+'| Animals Command')
            .setDescription('**befor use command you have to write your target animal.\nin field I write animals name for you.**')
            .addField('Animals Name:', `${'**' + aimals.map(i => '`' + i + '`').join(' or ') + '**'}`, true)
            .setTimestamp()
            .setFooter({
                  text: 'animals command | '+ message.guild.name +' '
            });

            message.reply({
                  embeds: [embed]
           })
    } else if (answer == 'panda') {
const res = await fetch("https://some-random-api.ml/animal/panda")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }else if (answer == 'fox') {
const res = await fetch("https://some-random-api.ml/animal/fox")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }else if (answer == 'dog') {
const res = await fetch("https://some-random-api.ml/animal/dog")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }else if (answer == 'cat') {
const res = await fetch("https://some-random-api.ml/animal/cat")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }else if (answer == 'redpanda') {
const res = await fetch("https://some-random-api.ml/animal/redpanda")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }else if (answer == 'koala') {
const res = await fetch("https://some-random-api.ml/animal/koala")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }else if (answer == 'birb') {
const res = await fetch("https://some-random-api.ml/animal/birb")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }else if (answer == 'raccoon') {
const res = await fetch("https://some-random-api.ml/animal/raccoon")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }else if (answer == 'kangaroo') {
const res = await fetch("https://some-random-api.ml/animal/kangaroo")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                   embeds: [embed]
            })
      
      }else if (answer == 'whale') {
const res = await fetch("https://some-random-api.ml/animal/whale")
const json = await res.json()

      const embed = new MessageEmbed()
            .setImage(json.image)
            .setDescription(`[click me to see](${json.image})`)
            .setColor(client.colors.none)
            message.reply({
                  embeds: [embed]
           })      
      }
    
    }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */