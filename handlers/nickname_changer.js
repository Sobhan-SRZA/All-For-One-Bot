const { 
  Collection, 
  MessageEmbed
} = require("discord.js")
var clc = require("cli-color");
const db = require('quick.db');
module.exports = async (client) => {
client.on("messageCreate", async message => {
    const description = {
        name: "Auto NIC Changer",
        filename: "nickname_changer.js",
        version: "1.1"
    }
    client.logger(clc.greenBright(` ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`))
let NicknameChannel = await db.fetch(`NicknameChannel_${message.guild.id}`);
if(NicknameChannel){
  if (message.author.bot || message.channel.type === 'dm') return;
  if (message.channel.id === NicknameChannel.id){
    if(message.content.length > 32){
      return message.channel.send({embeds:[new MessageEmbed()
               .setColor(client.colors.red)
               .setTitle(`${client.emotes.error}| Nickname Morede Nazar Tolani Ast`)
               .setDescription(`**Nickname Shoma Nabayad Bishtar Az \`32\` Carecter Bashad.**`)]}).then(msg=> msg.delete({timeout: 1000 * 15})).then(message.delete())
    }else{
    message.member.setNickname(message.content)
         const messageEmbed = new MessageEmbed()
               .setColor(client.colors.none)
               .setTitle(`${client.emotes.success}|Nickname Shoma Ba Movafagiat Avaz Shod:)`)
               .setDescription(`Nickname Shom Be \`${message.content}\` Taghir Yaft`) 
    message.channel.send({embeds:[messageEmbed]}).then(msg=> msg.delete({timeout: 1000 * 15}))
  setTimeout(() => {
    message.delete()
  },);
     }
   }else return;
}else return;
})
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/