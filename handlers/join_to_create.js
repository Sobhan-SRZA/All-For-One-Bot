const {
 MessageEmbed,
 Collection
} = require("discord.js")
const clc = require('cli-color')
const {
 CustomErrorEmbed
} = require("../functions/functions");
var CronJob = require('cron').CronJob;


module.exports = function (client) {
 const description = {
  name: "Join To Create Vice",
  filename: "join_to_create.js",
  version: "2.1"
}
client.logger(clc.greenBright(` ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`))
 client.JobJointocreate = new CronJob('0 * * * * *', function() {
   check_voice_channels(client)
 }, null, true, 'America/Los_Angeles');
 client.JobJointocreate2 = new CronJob('0 * * * * *', function() {
   check_created_voice_channels(client)
 }, null, true, 'America/Los_Angeles');

 client.on("ready", () => {
   check_voice_channels(client);
   check_created_voice_channels(client)
   client.JobJointocreate.start();
   client.JobJointocreate2.start();
   console.log("JOBS STARTED etc.")
 })

 //voice state update event to check joining/leaving channels
 client.on("voiceStateUpdate", (oldState, newState) => {
   /*
   //LOGS FOR EVERYTHING EXCEPT JOINING / LEAVING / SWITCHING   
   if (kernelsettings.voice_log_console) {
     if (!oldState.streaming && newState.streaming) return //console.log(`${newState.member.user.tag} Is now ${newState.streaming ? "streaming" : "not streaming"}`);
     if (oldState.streaming && !newState.streaming) return //console.log(`${newState.member.user.tag} Is now ${newState.streaming ? "streaming)" : "not streaming)"}`);
     if (!oldState.serverDeaf && newState.serverDeaf) return //console.log(`${newState.member.user.tag} Is now ${newState.serverDeaf ? "deafed (Server)" : "undeafed (Server)"}`);
     if (oldState.serverDeaf && !newState.serverDeaf) return //console.log(`${newState.member.user.tag} Is now ${newState.serverDeaf ? "deafed (Server)" : "undeafed (Server)"}`);
     if (!oldState.serverMute && newState.serverMute) return //console.log(`${newState.member.user.tag} Is now ${newState.serverMute ? "muted (Server)" : "unmuted (Server)"}`);
     if (oldState.serverMute && !newState.serverMute) return //console.log(`${newState.member.user.tag} Is now ${newState.serverMute ? "muted (Server)" : "unmuted (Server)"}`);
     if (!oldState.selfDeaf && newState.selfDeaf) return //console.log(`${newState.member.user.tag} Is now ${newState.selfDeaf ? "deafed (self)" : "undeafed (self)"}`);
     if (oldState.selfDeaf && !newState.selfDeaf) return //console.log(`${newState.member.user.tag} Is now ${newState.selfDeaf ? "deafed (self)" : "undeafed (self)"}`);
     if (!oldState.selfMute && newState.selfMute) return //console.log(`${newState.member.user.tag} Is now ${newState.selfMute ? "muted (self)" : "unmuted (self)"}`);
     if (oldState.selfMute && !newState.selfMute) return //console.log(`${newState.member.user.tag} Is now ${newState.selfMute ? "muted (self)" : "unmuted (self)"}`);
     if (oldState.sessionID != newState.sessionID) //console.log(`${newState.member.user.tag} sessionID Is now on: ${newState.sessionID}`);
     if (!oldState.selfVideo && newState.selfVideo) return //console.log(`${newState.member.user.tag} Is now ${newState.selfVideo ? "self Video Sharing" : "not self Video Sharing"}`);
     if (oldState.selfVideo && !newState.selfVideo) return //console.log(`${newState.member.user.tag} Is now ${newState.selfVideo ? "self Video Sharing" : "not self Video Sharing"}`);
   }*/

   // JOINED A CHANNEL
   if (!oldState.channelID && newState.channelID) {
     client.jtcsettings.ensure(newState.guild.id, {
       channel: "",
       channelname: "{user}' Room",
       guild: newState.guild.id,
     });
     client.jtcsettings2.ensure(newState.guild.id, {
       channel: "",
       channelname: "{user}' Channel",
       guild: newState.guild.id,
     });
     client.jtcsettings3.ensure(newState.guild.id, {
       channel: "",
       channelname: "{user}' Lounge",
       guild: newState.guild.id,
     });
     let channels = [];
     channels.push(client.jtcsettings.get(newState.guild.id, `channel`))
     channels.push(client.jtcsettings2.get(newState.guild.id, `channel`))
     channels.push(client.jtcsettings3.get(newState.guild.id, `channel`))

     for (let i = 0; i < channels.length; i++) {
       if (channels[i].length > 0 && channels[i] == newState.channelID) {
         create_join_to_create_Channel(client, newState, i + 1);
         break;
       }
     }
     return;
   }
   // LEFT A CHANNEL
   if (oldState.channelID && !newState.channelID) {
     
     client.jtcsettings.ensure(oldState.guild.id, {
       channel: "",
       channelname: "{user}' Room",
       guild: oldState.guild.id,
     });
     client.jtcsettings2.ensure(oldState.guild.id, {
       channel: "",
       channelname: "{user}' Channel",
       guild: oldState.guild.id,
     });
     client.jtcsettings3.ensure(oldState.guild.id, {
       channel: "",
       channelname: "{user}' Lounge",
       guild: oldState.guild.id,
     });
     client.jointocreatemap.ensure(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`, false)
     if (client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
       //CHANNEL DELETE CHECK
       var vc = oldState.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
       if (vc.members.size < 1) {
         client.jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`);
         client.jointocreatemap.delete(`owner_${vc.guild.id}_${vc.id}`);
         return vc.delete().catch(e => console.log("Couldn't delete room"));
       } else {
         let perms = vc.permissionOverwrites.map(c => c)
         let owner = false;
         for (let i = 0; i < perms.length; i++) {
           if (perms[i].allow.toArray().includes("MANAGE_CHANNELS") && perms[i].id == oldState.member.user.id) owner = true;
         }
         //if owner left, then pick a random user
         if (owner) {
           let members = vc.members.map(member => member.id);
           let randommemberid = members[Math.floor(Math.random() * members.length)];
           
           vc.updateOverwrite(randommemberid, {
             CONNECT: true,
             VIEW_CHANNEL: true,
             MANAGE_CHANNELS: true,
             MANAGE_ROLES: true
           }).catch(e => console.log(e.message))

           vc.updateOverwrite(oldState.member.user.id, {
             CONNECT: true,
             VIEW_CHANNEL: true,
             MANAGE_CHANNELS: false,
             MANAGE_ROLES: false
           }).catch(e => console.log(e.message))
           try {
            let prefix = client.db.get(`prefix_${vc.guild.id}`)||client.prefix;
             client.users.fetch(randommemberid).then(user => {
               user.send({
                 embeds: [CustomErrorEmbed(
                  vc,
                  "User Left The Voice",
                  `The Owner of \`${vc.name}\` left, you are now the new one!\nYou now have access to all \`${prefix}jtc\` Commands!`,
                  client.emotes.voice,
                  client
                 )]
               })                 
             })
           } catch {
             /* */
           }
         }
       }
     }
   }

   // Switch A CHANNEL
   if (oldState.channelID && newState.channelID) {
     client.jtcsettings.ensure(newState.guild.id, {
       channel: "",
       channelname: "{user}' Room",
       guild: newState.guild.id,
     });
     client.jtcsettings2.ensure(newState.guild.id, {
       channel: "",
       channelname: "{user}' Channel",
       guild: newState.guild.id,
     });
     client.jtcsettings3.ensure(newState.guild.id, {
       channel: "",
       channelname: "{user}' Lounge",
       guild: newState.guild.id,
     });
     if (oldState.channelID !== newState.channelID) {
       let channels = [];
       channels.push(client.jtcsettings.get(newState.guild.id, `channel`))
       channels.push(client.jtcsettings2.get(newState.guild.id, `channel`))
       channels.push(client.jtcsettings3.get(newState.guild.id, `channel`))
       for (let i = 0; i < channels.length; i++) {
         if (channels[i].length > 2 && channels[i] == newState.channelID) {
           create_join_to_create_Channel(client, newState, i + 1);
           break;
         }
       }
       //ENSURE THE DB
       client.jointocreatemap.ensure(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`, false)
       //IF STATEMENT
       if (client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
         var vc = oldState.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
         if (vc.members.size < 1) {
           client.jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`);
           client.jointocreatemap.delete(`owner_${vc.guild.id}_${vc.id}`);
           return vc.delete().catch(e => console.log("Couldn't delete room"));
         } else {
           /* */
         }
       }
     }
   }
 })
  async function create_join_to_create_Channel(client, user, type) {
    if (type == 1) chname = client.jtcsettings.get(user.member.guild.id, "channelname")
    else if (type == 2) chname = client.jtcsettings2.get(user.member.guild.id, "channelname")
    else if (type == 3) chname = client.jtcsettings3.get(user.member.guild.id, "channelname")
    else chname = "{user}'s Room"
    //CREATE THE CHANNEL
    let allowed = true;
    if (!user.guild.me.hasPermission("MANAGE_CHANNELS")) {
      allowed = false;
      try {
        user.member.user.send("${user.member.user} | <:no:833101993668771842> Error | Please give me the permission, `MANGE CHANNELS` --> I need to be able to create Channels ...")
      } catch {
        try {
          let channel = guild.channels.cache.find(
            channel =>
            channel.type === "text" &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
          );
          channel.send(`${user.member.user} | <:no:833101993668771842> Error | Please give me the permission, \`MANGE CHANNELS\` --> I need to be able to create Channels ...`).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
        } catch {}
      }
    }
    if (allowed) {
  
      console.log(`Created the Channel: ${String(chname.replace("{user}", user.member.user.username)).substr(0, 32)} in: ${user.guild ? user.guild.name : "undefined"}`.brightGreen)
  
      user.guild.channels.create(String(chname.replace("{user}", user.member.user.username)).substr(0, 32), {
        type: 'voice',
        permissionOverwrites: [ //update the permissions
          {
            id: user.id, //the user is allowed to change everything
            allow: ['MANAGE_CHANNELS', "VIEW_CHANNEL", "MANAGE_ROLES", "CONNECT"],
          }, { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
            id: user.guild.id,
            allow: ['VIEW_CHANNEL', "CONNECT"],
          },
        ],
      }).then(async vc => {
        //add to the DB
        client.jointocreatemap.set(`owner_${vc.guild.id}_${vc.id}`, user.id);
        client.jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
        //if parent do these, else just move the Member
        if (user.channel.parent) {
          //save userlimit on a var
          let userlimit = user.channel.userLimit;
          let Bitrate = user.channel.bitrate;
          //move to parent
          await vc.setParent(user.channel.parent)
          //move user
          await user.setChannel(vc);
          //lock the permissions to category
          await vc.lockPermissions().catch(console.error);
          //set userlimit
          await vc.setUserLimit(userlimit).catch(console.error);
          //set Bitrate
          await vc.setBitrate(Bitrate).catch(console.error);
          //add permissions
          await vc.updateOverwrite(user.id, {
            MANAGE_CHANNELS: true,
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true,
            CONNECT: true,
          }).catch(console.error);
  
        } else {
          //move the Member
          await user.setChannel(vc);
        }
      })
    }
  }
  async function check_created_voice_channels(client) {
    let guilds = client.guilds.cache.map(guild => guild.id);
    for (let i = 0; i < guilds.length; i++) {
        try {
            let guild = await client.guilds.fetch(guilds[i]);      
            await guild.channels.cache.filter(ch => ch.type == "voice").each(async vc => {
                try{
                    if(client.jointocreatemap.get(`tempvoicechannel_${vc.guild.id}_${vc.id}`) == vc.id){
                        let members = vc.members.array();
                        if(!members || members == undefined || members.length == undefined || members.length == 0){
                            client.jointocreatemap.delete(`tempvoicechannel_${vc.guild.id}_${vc.id}`);
                            client.jointocreatemap.delete(`owner_${vc.guild.id}_${vc.id}`);
                            console.log(`Deleted the Channel: ${vc.name} in: ${vc.guild ? vc.guild.name : "undefined"} DUE TO EMPTYNESS`.strikethrough.brightRed)
                            vc.delete().catch(e => console.log(e) )
                        }
                    }
                }catch (e){
                   // console.log("Not in db")
                }
  
            });
        } catch (e) {
            console.log(e)
        }
    }
    return;
  }
  async function check_voice_channels(client) {
    let guilds = client.guilds.cache.map(guild => guild.id);
    for (let i = 0; i < guilds.length; i++) {
        try {
            let guild = await client.guilds.fetch(guilds[i]);
            client.jtcsettings.ensure(guild.id, {
              channel: "",
              channelname: "{user}' Room",
              guild: guild.id,
            });
            client.jtcsettings2.ensure(guild.id, {
              channel: "",
              channelname: "{user}' Channel",
              guild: guild.id,
            });
            client.jtcsettings3.ensure(guild.id, {
              channel: "",
              channelname: "{user}' Lounge",
              guild: guild.id,
            });
            let jointocreate = []; //get the data from the database onto one variables
            jointocreate.push(client.jtcsettings.get(guild.id, "channel"));
            jointocreate.push(client.jtcsettings2.get(guild.id, "channel"));
            jointocreate.push(client.jtcsettings3.get(guild.id, "channel"));
            await guild.channels.cache.filter(ch => ch.type == "voice" && jointocreate.includes(ch.id)).each(async (channel, j) => {
                try{
                    let members = channel.members.array();
                    if (members && members.length != 0){
                        for (let k = 0; k < members.length; k++) {
                            let themember = await guild.members.fetch(members[k]);
                            create_join_to_create_Channel(client, themember.voice, j + 1);
                        }
                    }else {
                        //console.log("NO MEMBERS")
                    }
                }catch (e){
                    console.log(e)
                }
  
            });
        } catch (e) {
            console.log(e)
        }
    }
    return;
  }
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