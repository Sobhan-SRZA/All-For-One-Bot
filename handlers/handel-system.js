const { 
  Collection, 
  MessageEmbed
} = require("discord.js")
var clc = require("cli-color");
const db = require('quick.db');
module.exports = async (client) => {
client.on("message", async message => {
//======== Bot Prefix ========
  const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === `prefix`) {
      var prf = await require('quick.db').fetch(`prefix_${message.guild.id}`)||client.prefix;
      let errorprefixEmbed = new MessageEmbed()
              .setColor(client.colors.none)
              .setThumbnail(client.user.displayAvatarURL())
              .setTimestamp(Date.now())
              .setAuthor(`prefix of ${client.user.tag} shows👌🏻`,client.user.displayAvatarURL())
              .setFooter(`prefix shows to ${message.author.tag} |`,message.author.displayAvatarURL())
              .setDescription(`Prefix Dar In Server **${prf}** ASt`)
         message.reply(errorprefixEmbed)
    }  
    
//======== Change Nickname ========
let NicknameChannel = await db.fetch(`NicknameChannel_${message.guild.id}`);
if(NicknameChannel){
  if(message.author.bot) return;
if (message.channel.id === NicknameChannel.id){
  if(message.content.length > 32){
    return message.channel.send(new MessageEmbed()
               .setColor(client.colors.red)
               .setTitle(`${client.emotes.error}| Nickname Morede Nazar Tolani Ast`)
               .setDescription(`**Nickname Shoma Nabayad Bishtar Az \`32\` Carecter Bashad.**`)).then(msg=> msg.delete({timeout: "7000"})).then(message.delete())
  }else{
  message.member.setNickname(message.content)
         const messageEmbed = new MessageEmbed()
               .setColor(client.colors.none)
               .setTitle(`${client.emotes.success}|Nickname Shoma Ba Movafagiat Avaz Shod:)`)
               .setDescription(`Nickname Shom Be \`${message.content}\` Taghir Yaft`) 
  message.channel.send({embeds:[messageEmbed]}).then(msg=> msg.delete({timeout: 1000 * 7}))
  setTimeout(() => {
    message.delete()
  }, 1000 * 1);
     }
   }
}
//======== New YT Video News ========
client.request = new (require("rss-parser"))();
client.youtube = {
channel: db.fetch(`DsicordYTNews_${message.guild.id}`),
channel_id: db.fetch(`YoutubeChannelID_${message.guild.id}`),
watchInterval: 30000,
messageTemplate: db.fetch(`YTNewsMessage_${message.guild.id}`)
};
if(db.fetch(`YoutubeChannelID_${message.guild.id}`)){
function handleUploads() {
    if (db.fetch(`postedVideos`) === null) db.set(`postedVideos`, []);
    setInterval(() => {
        client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.youtube.channel_id}`)
        .then(data => {
            if (db.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
                db.set(`videoData`, data.items[0]);
                db.push("postedVideos", data.items[0].link);
                let parsed = db.fetch(`videoData`);
                let channel = client.channels.cache.get(client.youtube.channel);
                if (!channel) return;
                let message = client.youtube.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
                channel.send(message);
            }
        });
    }, client.youtube.watchInterval);
}
client.on("ready", () => {
  handleUploads();
})
}
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