const {
    Client,
    Collection,
    Intents,
    MessageActionRow,
    MessageButton,
    Permissions,
    MessageEmbed,
    MessageSelectMenu,  
} = require("discord.js");
const clc = require("cli-color");
const fs = require('fs');
module.exports = {
  delay: async function (delayInms) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    } catch (e) {
      console.log(clc.bgRedBright(String(e.stack)))
    }
  },
  epochDateNow: async function (){
  const TimeStampDate = Date.parse(new Date()) / 1000;
  return TimeStampDate
  },
  epochDateCustom: async function (date){
  const TimeStampDate = Date.parse(date) / 1000;
  return TimeStampDate
  },
  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },
  randomItem: function (item) {
    return Math.floor((Math.random() * item.length));
  },
  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  list: function (arr, conj = 'and') {
    const len = arr.length;
    if (len === 0) return '';
    if (len === 1) return arr[0];
    return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
  },
  write_text_file: async function(data, file){  // READ FILE AND THEN WRITE TO END OF LAST DATA 
    existingData = fs.readFile(file, (err, data) => {if (err) return; return data;});
    fs.writeFile(file, existingData + "\n" + data, err => err);
  },
  check_if_dj: async function (client, member, song) {
    //if no message added return
    if(!client) return false;//get the adminroles
    var roleid = client.db.get(`DJ_Roles_${member.guild.id}`)//if no dj roles return false, so that it continues
    if (String(roleid) == "") return false;//define variables
    var isdj = false;//loop through the roles
    for (let i = 0; i < roleid.length; i++) {//if the role does not exist, then skip this current loop run
        if (!member.guild.roles.cache.get(roleid[i])) continue;//if he has role set var to true
        if (member.roles.cache.has(roleid[i])) isdj = true;//add the role to the string
    }//if no dj and not an admin, return the string
    if (!isdj && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && song.user.id != member.id)
        return roleid.map(i=>`<@&${i}>`).join(", ");//if he is a dj or admin, then return false, which will continue the cmd
    else
    return false;
  },
  createColorRole: async function(message, client, color, name, db_name){
    let role;
    let db_role = await client.db.fetch(`${db_name}${message.guild.id}`);
    let find_role = message.guild.roles.cache.find(r => r.name === name);
    if (!message.guild.roles.cache.has(db_role)) {
      role = find_role
    } else {
      Red = message.guild.roles.cache.get(db_role)
    }if (!role) {
      role = await message.guild.roles.create({
        name: name,
        color: color,
        permissions: []
      }).then(ro => {
      const HighestRole = message.guild.me.roles.highest;
      ro.setPosition(HighestRole.position - 1)
    })
    await client.db.set(`${db_name}${message.guild.id}`, role);
    }
    return role
  },
  handleVideo: async function (video, message, channel, playlist = false) {
		const serverQueue = message.client.player.getQueue(message.guild.id);
    const song = {
      id: video.id,
      title: Util.escapeMarkdown(video.title),
      views: video.views ? video.views : "-",
      ago: video.ago ? video.ago : "-",
  duration: video.duration,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      img: video.thumbnail,
      req: message.author
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 80,
        playing: true,
        loop: false
      };
      message.client.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);
      try {
        var connection = await channel.join();
        queueConstruct.connection = connection;
        channel.guild.voice.setSelfDeaf(true)
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        return sendError(`I could not join the voice channel: ${error}`, message.channel, message.client, message);
      }
    } else {
      serverQueue.songs.push(song);
      if (playlist) return;
      let thing = new MessageEmbed()
        .setAuthor({
          name: "Song has been added to queue",
          iconURL: require('../assets/pictures/Music.gif')
        })
        .setThumbnail(`${message.author.displayAvatarURL()}`)
        .setColor(message.client.colors.none)
        .addField("Name", song.title, true)
        .addField("Duration", song.duration, true)
        .setImage(song.img)
        .setFooter({
          tetx: `Requested by ${message.author.tag} | Views:${song.views} | ${song.ago}`,
          iconURL: message.guild.iconURL({ dynamic: true })
      })
      return message.reply({
        embeds: [thing]
      });
    }
    return;
    async function sendError(text, channel, client, message) {
      let embed = new MessageEmbed()
      .setAuthor({
        name: `Requested by ` + message.author.name,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setTitle(client.emotes.error + '| **We Got An Error**')
      .setColor(client.colors.none)
      .setDescription(text)
      .setFooter({
        text: "Error | created by Mr.SIN RE#1528",
        iconURL: message.guild.iconURL({ dynamic: true })
      })
      await channel.send(embed)
    }
    async	function play(guild, song, message) {
		const serverQueue = message.client.player.getQueue(message.guild.id);
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var online = afk[message.guild.id]
    if (!song){
      if (!online.afk) {
        sendError(`**\`Leaving the voice channel because I think there are no songs in the queue.\` \`\`\`If you like the bot stay 24/7 in voice channel run [${client.db.fetch(`prefix_${message.guild.id}`)||client.prefix}afk]\`\`\`**\n\n*Thank you for using bot 🥰*`,  message.channel, client, message)
        message.guild.me.voice.channel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
      }
        return message.client.queue.delete(message.guild.id);
      }
   let stream = null; 
    if (song.url.includes("youtube.com")) {  
      stream = await ytdl(song.url);
      stream.on('error', function(er)  {
      if (er) {
        if (serverQueue) {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
  	  return sendError(`An unexpected error has occurred.\nPossible type \`${er}\``, message.channel, client, message)
         }
       }
     });
      }
      serverQueue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
			const dispatcher = serverQueue.connection
          .play(ytdl(song.url,{quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
          .on("finish", () => {
            const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
            play(guild, serverQueue.songs[0]);
        })
    dispatcher.setVolume(serverQueue.volume / 100);
    }
  },
  sendError: async	function (text, channel, client, message) {
    let embed = new MessageEmbed()
    .setAuthor({
      name: `Requested by ` + message.author.name,
      iconURL: message.author.displayAvatarURL({ dynamic: true })
    })
    .setTitle(client.emotes.error + '| **We Got An Error**')
    .setColor(client.colors.none)
    .setDescription(text)
    .setFooter({
      text: "Error | created by Mr.SIN RE#1528",
      iconURL: message.guild.iconURL({ dynamic: true })
    })
    await channel.send(embed)
  },
  CustomErrorEmbed: async	function (message, title, description, emotes, client) {
    let embed = new MessageEmbed()
    .setAuthor({
      name: `Requested by ` + message.member.name,
      iconURL: message.member.displayAvatarURL({ dynamic: true })
    })
    .setTitle(emotes + '| **' + title + '**')
    .setColor(client.colors.none)
    .setDescription(`${description}`)
    .setFooter({
      text: title + " | created by Mr.SIN RE#1528",
      iconURL: message.guild.iconURL({ dynamic: true })
    })
    .setTimestamp()
    return embed
  },
  errorEmbed: async	function (message, description, client) {
      let embed = new MessageEmbed()
      .setAuthor({
        name: `Requested by ` + message.member.name,
        iconURL: message.member.displayAvatarURL({ dynamic: true })
      })
      .setTitle(client.emotes.error + '| **We Got An Error**')
      .setColor(client.colors.none)
      .setDescription(description)
      .setFooter({
        text: "Error | created by Mr.SIN RE#1528",
        iconURL: message.guild.iconURL({ dynamic: true })
      })
      return embed
  },
  successEmbed: async	function (message, description, client) {
    let embed = new MessageEmbed()
    .setAuthor({
      name: `Requested by ` + message.member.name,
      iconURL: message.member.displayAvatarURL({ dynamic: true })
    })
    .setTitle(client.emotes.tick + '| **Process Is Successfuly**')
    .setColor(client.colors.none)
    .setDescription(description)
    .setFooter({
      text: "Successfuly | created by Mr.SIN RE#1528",
      iconURL: message.guild.iconURL({ dynamic: true })
    })
    return embed
  },
  logsEmbed: async	function (message, title, description, emotes, client, TargetChannel, reason) {
    let embed = new MessageEmbed()
    .setAuthor({
      name: `Requested Guild Name` + message.guild.name,
      iconURL: message.guild.iconURL({ dynamic: true })
    })
    .setTitle(emotes + '| **' + title + '**')
    .setColor(client.colors.none)
    .setThumbnail(message.member.displayAvatarURL({ format: "png", dynamic: true }))
    .setDescription(description)
    .setTimestamp()
    .addFields(
      {      
      name: `**Requested By:**`, 
      value: message.member.tag, 
      inline: true
      },
      {
      name: `**User ID:**`, 
      value: message.member.id, 
      inline: true
      },
      {
      name: `**Target Channel:**`, 
      value: TargetChannel||`\`${TargetChannel.name}\``, 
      inline: true
      },
      {
      name: `**Date:**`, 
      value: `<t:${Date.parse(new Date()) / 1000}:R>`, 
      inline: true
      },
      {
      name: `**Reason:**`, 
      value: `\`\`\`js\nReason: ${reason}\`\`\``, 
      inline: true
      }
    )
    .setFooter({
      text: "Logs Information | created by Mr.SIN RE#1528",
      iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
    })
    return embed
  },
  epochDateNow: async function (){
  const TimeStampDate = Date.parse(new Date()) / 1000;
  return TimeStampDate
  },
  commandsCoolDown: async function (client, message, command) {
    if (client.cooldowns) {
      if (!client.cooldowns.has(client.commands.cooldown)) {
        client.cooldowns.set(client.commands.name, client.commands);
      }
      const now = Date.now();
      const timestamps = client.cooldowns.get(client.commands.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;
      if (timestamps.has(message.member.id)) {
        const expirationTime = timestamps.get(message.member.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(`**${client.emotes.alert}| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
        }
      }
      timestamps.set(message.member.id, now);
      setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
    }
  },
  slashCommandsCoolDown: async function (client, interaction, command) {
    if (client.cooldowns) {
      if (!client.cooldowns.has(client.slashCommands.cooldown)) {
        client.cooldowns.set(client.slashCommands.name, client.slashCommands);
      }
      const now = Date.now();
      const timestamps = client.cooldowns.get(client.slashCommands.name);
      const cooldownAmount = (client.slashCommands.cooldown || 5) * 1000;
      if (timestamps.has(interaction.member.id)) {
        const expirationTime = timestamps.get(interaction.member.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return await interaction.reply({
              embeds: [new MessageEmbed()
                  .setColor(client.colors.none)
                  .setDescription(`**${client.emotes.alert}| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
              ],
              ephemeral: true
          });
        }
      }
      timestamps.set(interaction.member.id, now);
      setTimeout(() => timestamps.delete(interaction.member.id), cooldownAmount);
    }
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