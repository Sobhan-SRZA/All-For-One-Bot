const {
   MessageButton,
   MessageEmbed,
   MessageSelectMenu,
   MessageActionRow,
   MessageAttachment
} = require('discord.js');
const db = require("quick.db");
const { 
   profMenu, 
   profEmbed
} = require('../../functions/help_functions');
module.exports = {
 name: 'createaccount',
 aliases: ['signin','sign-in','sabtename','setacc','setaccount'],
 category: 'Fun 🎭 | Economy',
 usage: '',
async execute(client, message, args) {

   message.reply({
            embeds: [profEmbed(client,message)],
            components: [profMenu(client)]
   })
   db.add(`money_${message.member.id}`, 100)
   db.set(`sex_${message.member.id}`, 'single')
   db.set(`userID_${message.member.id}`, message.member.id)
   let profile = {
      id: db.fetch(`userID_${message.member.id}`),
      money: db.fetch(`money_${message.member.id}`),
      name: db.fetch(`name_${message.member.id}`),
      address: db.fetch(`address_${message.member.id}`),
      job: db.fetch(`job_${message.member.id}`),
      age: db.fetch(`age_${message.member.id}`),
      gender: db.fetch(`gender_${message.member.id}`),
      sex: db.fetch(`sex_${message.member.id}`)
   };
   db.set(`profile_${message.member.id}`, profile)
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