const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const clc = require('cli-color');
const db = require('quick.db')
module.exports = function (client, options) {
    const description = {
        name: "Chat Bot",
        filename: "chatbot.js",
        version: "3.2"
    }
    client.logger(clc.greenBright(` ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`))
client.on("messageCreate", async msg => {
  client.chatBot = {
      channel_id: db.fetch(`ChatBotCH_${msg.guild.id}`),
      gender: db.fetch(`ChatBotGender_${msg.guild.id}`),
   };        
 if(msg.channel.id === client.chatBot.channel_id){
  if(msg.author.bot) return;
   msg.channel.startTyping();
     const { message } = await fetch(`https://api.udit.gq/api/chatbot?message=${msg.content}[&name=${client.user.username}&user=${msg.author.id}&gender=${client.chatBot.gender}]`).then(response => response.json());
      //fetch(`http://api.brainshop.ai/get?bid=153861&key=0ZjvbPWKAxJvcJ96&uid=1&msg=${encodeURIComponent(message)}`) 
    msg.channel.send({
       content: message
     })
   msg.channel.stopTyping();
 }
 })
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