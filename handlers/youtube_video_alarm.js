const { 
 Collection, 
 MessageEmbed
} = require("discord.js");
var clc = require("cli-color");
const db = require('quick.db');
module.exports = async (client) => {
    const description = {
        name: "YouTube New Video Alarm",
        filename: "youtube_video_alarm.js",
        version: "2.1"
    }
    client.logger(clc.greenBright(` ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`))
client.on("messageCreate", async message => {
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