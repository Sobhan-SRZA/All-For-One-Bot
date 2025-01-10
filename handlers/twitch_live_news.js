const request = require('request');
const {
  MessageEmbed
} = require('discord.js');
const CronJob = require('cron').CronJob;
const clc = require("cli-color");
const config = require("../streamconfig.json");
const fs = require('fs');
const {
  delay 
} = require('../functions/functions');
const moment = require("moment")
module.exports = async client => {
     const description = {
        name: "Twitch Live Alarm",
        filename: "twitch-live-news.js",
        version: "1.0"
    }
    client.logger(clc.greenBright(` ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`))
  //function that will run the checks
  client.Joblivelog = new CronJob('0 */7 * * * *', async function() {
    await delay(1 * 60 * 1000)
    console.log(clc.magentaBright(`CHECK TWITCH - ${moment().format("LLLL")}`))
    var guilds = client.social_log.filterArray((v) => (v.twitch && v.twitch.channels && v.twitch.channels.length > 0) && (v.twitch&&v.twitch.channelID&&v.twitch.channelID.length > 1)).map(v => v.twitch)
    for(const g of guilds){
      var guild = client.guilds.cache.get(g.DiscordServerId);
      if(!guild) continue;
      getStreams(guild);
      await delay(1500);
    }
  }, null, true, 'America/Los_Angeles');

  //update the authorization key every hour
  client.Joblivelog2 = new CronJob('0 * * * *', function() {
    UpdateAuthConfig();
  }, null, true, 'America/Los_Angeles');

  client.on('ready', async () => {
      client.Joblivelog.start();
      client.Joblivelog2.start();
      UpdateAuthConfig();
      console.log(clc.magentaBright(`CHECK TWITCH - ${moment().format("LLLL")}`))

  } );
  function getStreams(guild){
    client.social_log.ensure(guild.id, {
      twitch: {
        DiscordServerId: guild.id,
        channelID: "",
        roleID_PING: "",
        roleID_GIVE: "",
        channels: [],
      }
    })
    const tempData = client.social_log.get(guild.id, "twitch")
    if(!tempData.channels) return console.log("NO TWITCH DATA (TW-CHANNELS)".magenta)
    if(!tempData.channelID || tempData.channelID == undefined || tempData.channelID.length != 18) return console.log("NO TWITCH DATA (DCCHANNEL)".magenta)
    tempData.channels.map(async function (chan, i) {
        if (!chan.ChannelName) return console.log("TWITCH - NO CHANNEL NAME FOUND :C".magenta);
        let member = await guild.members.fetch(chan.DISCORD_USER_ID);
        if(!member) return console.log("TWITCH - MEMBER NOT FOUND!".magenta)
        
        let StreamData = await getStreamData(chan.ChannelName, config.twitch_clientID, config.authToken);
        if(!StreamData) return console.log("TWITCH - F".magenta)
        if(!StreamData.data || StreamData.data.length == 0)  {
          if(member.roles.cache.has(tempData.roleID_GIVE))
            member.roles.remove(tempData.roleID_GIVE).catch(e=>console.log("TWITCH - REMOVE ROLE | prevented bug".gray)); 
          return console.log("TWITCH - NO STREAM DATA AKA RETURN".magenta);
        }

        StreamData = StreamData.data[0]

        //ADD / REMOVE ROLE
        if(chan.DISCORD_USER_ID) {  
          if(StreamData.type.toLowerCase() === "live") { 
             member.roles.add(tempData.roleID_GIVE).catch(e=>console.log("TWITCH - ADD ROLE | prevented bug".gray))
          }
          else {
            member.roles.remove(tempData.roleID_GIVE).catch(e=>console.log("TWITCH - REMOVE ROLE | prevented bug".gray))
          }
        }
        
        //get the channel data for the thumbnail image
        const ChannelData = await getChannelData(chan.ChannelName, config.twitch_clientID, config.authToken)
        if (!ChannelData) return console.log("TWITCH - NO TWITCH CHANNEL DATA INFORMATION FOUND".magenta)
        

        //structure for the embed
        var embed = new MessageEmbed()
          .setColor("BLUE")
          .setURL(`https://www.twitch.tv/${StreamData.user_login}`)
          .setDescription(StreamData.title ? StreamData.title : "\u200b")
          .setTitle(`${client.emotes.live}| ${StreamData.user_name} is now live`)
          .addField("Playing:", `\`${StreamData.game_name ? StreamData.game_name : "Unknown Game"}\``, true)
          .addField("Viewers:", `${StreamData.viewer_count ? `\`${StreamData.viewer_count}\`` : "~~`0`~~"}`, true)
          .addField("Twitch:",`[Watch Stream](https://www.twitch.tv/${StreamData.user_login})`, true)
          .setFooter({
              text: "Check his Stream out ;)"
          })
          .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${StreamData.user_login}-640x360.jpg?cacheBypass=${(Math.random()).toString()}`)
          .setThumbnail(ChannelData.thumbnail_url)
          .setTimestamp()
        //get the assigned channel
        client.channels.fetch(tempData.channelID).then(ch => {
          if (chan.twitch_stream_id != StreamData.id) {
            const channelObj = tempData.channels[i]
            member.roles.add(tempData.roleID_GIVE).catch(e=>console.log("TWITCH - ADD ROLE | prevented bug".gray))
            ch.send(`${channelObj.message.length > 0 ? channelObj.message.substr(0, 2000) : "\u200b"}`, embed).then(msg => {
                channelObj.twitch_stream_id = StreamData.id
                if(tempData.roleID_PING && tempData.roleID_PING.length > 2){
                  ch.send(`<@&${tempData.roleID_PING}>`).then(msg=>msg.delete().catch(e=>console.log("TWITCH - prevented delete bug".gray))).catch(e=>console.log("prevented send bug role".gray))
                }
                client.social_log.set(ch.guild.id, JSON.parse(tempData, null, 3), "twitch")
                console.log(`TWITCH - NOTIFICATION SENT: https://www.twitch.tv/${StreamData.user_login}`.magenta)
                //fs.writeFileSync('../streamconfig.json', JSON.stringify(tempData, null, 3))
            }).catch(e=>console.log("TWITCH - prevented send bug embed".gray))
          }
        })
    })
  }

  async function getStreamData(channelName, clientID, authkey) {
    return new Promise((resolve, reject) => {
      var headers = {
        'Client-Id': clientID,
        'Authorization': `Bearer ${authkey}`
      };
      request.get(
        `https://api.twitch.tv/helix/streams?user_login=${channelName}`, {
          headers: headers
        },
        (error, res, body) => {
          if (error) {
            return console.error(error)
          }
          try {
            resolve(JSON.parse(body))
          } catch (e) {
            reject(e)
          }
        }
      )
    });
  }

  async function getChannelData(channelName, clientID, authkey) {
    return new Promise((resolve, reject) => {
      var headers = {
        'client-id': clientID,
        'Authorization': `Bearer ${authkey}`
      };
      request.get(
        `https://api.twitch.tv/helix/search/channels?query=${channelName}`, {
          headers: headers
        },
        (error, res, body) => {
          if (error) {
            return console.error(error)
          }
          try {
            resolve(JSON.parse(body).data[0])
          } catch (e) {
            reject(e)
          }
        }
      )
    });
  }

  async function getKey(clientID, clientSecret) {
    return new Promise((resolve, reject) => {
      request.post(
        `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`,
        (error, res, body) => {
          if (error) {
            return console.error(error)
          }
          try {
            resolve(JSON.parse(body).access_token)
          } catch (e) {
            reject(e)
          }
        }
      )
    });
  }

  async function UpdateAuthConfig(){
    let tempData = JSON.parse(fs.readFileSync('../streamconfig.json'));
    const authKey = await getKey(tempData.twitch_clientID, tempData.twitch_secret);
    if (!authKey) return console.log("NO AUTH");
    var tempConfig = JSON.parse(fs.readFileSync('../streamconfig.json'));
    tempConfig.authToken = authKey;
    fs.writeFileSync('../streamconfig.json', JSON.stringify(tempConfig, null, 3));
  }
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