const clc = require('cli-color');
const db = require('quick.db')
const { MessageEmbed } = require("discord.js");
module.exports = function (client, options) {
    const description = {
        name: "Number Counter",
        filename: "counter.js",
        version: "5.2"
    }
    client.logger(clc.greenBright(` ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`))
    client.on("message", message => {
        if(message.author.bot || !message.guild) return;
        let counter = {
          channel: db.get(`counterch_${message.guild.id}`),
          author: db.get(`counterauthor_${message.guild.id}`),
          number: db.get(`counternum_${message.guild.id}`)
        };
      if(message.channel.id == counter.channel){       
        if (!message.author.bot && message.author.id === counter.author) {
          message.delete().catch(e=> console.log(clc.redBright("counter: " + e)));
          message.reply("Please wait for **your** turn").then(m => m.delete({timeout: 3000}).catch(e=>console.log(clc.redBright("counter: " + e))));
          return;
        }
        
        if (!message.author.bot && isNaN(message.content)) {
          message.delete().catch(e=> console.log(clc.redBright("counter: " + e)));
          message.reply("Messages in this channel must be a **number**").then(m => m.delete({timeout: 3000}).catch(e=>console.log(clc.redBright("counter: " + e))));
          return;
        }
        if (!message.author.bot && parseInt(message.content) !== counter.number + 1) {
          message.delete().catch(e=> console.log(clc.redBright("counter: " + e)));
          message.reply(`Next number must be \`${counter.number + 1}\``).then(m => m.delete({timeout: 3000}).catch(e=>console.log(clc.redBright("counter: " + e))));
          return;
        }
        try{
          if((counter.number+1) % 100 === 0){
          message.channel.setTopic(`Current number-Range: **${counter.number+1} - ${counter.number+100}**`).catch(e=>console.log(clc.redBright("counter: " + e)))}
        }catch (e){
          console.log(clc.redBright("counter: " + e))
        }
        if((counter.number+1) % 5 === 0)
        message.react(client.emotes.success)
         db.set(`counternum_${message.guild.id}`, counter.number + 1);
         db.set(`counterauthor_${message.guild.id}`, message.author.id);
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