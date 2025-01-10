const Discord = require("discord.js");
const error = require("../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @returns
 */
module.exports = async (client, message) => {
  try {

    const db = client.db;
    if (message.channel.type === 'dm') {
      if (message.author.bot) return;
      if (message.content.includes('@')) return message.channel.send('you can\'t mention someone');
      const server = client.guilds.cache.get(client.config.discord.support_server_id);
      const channelbug = server.channels.cache.get(client.config.discord.report_channel_id); const embed = new Discord.MessageEmbed()
        .setColor(client.colors.none)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setTitle(`This Guy Have Report, User ID "${message.author.id}"`)
        .setDescription(`> ${message.content}`)
      channelbug.send(embed).then((msg) => {
        msg.react(client.emotes.report)
      }).then(message.reply('Your bug request or comment has been sent to the support server, or the admins will join the server and solve it, or give you a friend request. Thanks❤'))

    }

    if (message.author.bot || message.channel.type === 'dm') return;

    //======== Command for shows the prefix ========
    if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>` || message.content === `${client.prefix}prefix`) {
      const prf = await db.get(`prefix_${message.guild.id}`) ? await db.get(`prefix_${message.guild.id}`) : client.prefix;
      let errorprefixEmbed = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setAuthor(`prefix of ${client.user.tag} shows👌🏻`, client.user.displayAvatarURL())
        .setFooter(`prefix shows to ${message.author.tag} |`, message.author.displayAvatarURL({ dynamic: true }))
      errorprefixEmbed.setDescription(`My prefix in server is: **${prf}**`)
      message.reply(errorprefixEmbed)
    }

    //======== Command Prefix & args ========
    const Tprefix = await db.has(`prefix_${message.guild.id}`) ? await db.get(`prefix_${message.guild.id}`) : `${client.prefix}`;
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Tprefix.toString())})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [prefix] = message.content.match(prefixRegex);
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (commandName.length > 0) {
      if (!command) return //message.reply(`**⚠️| It seems like \`${commandName}\` is not a valid command! Please try Again!**`)
    }

    //======== Command Cooldown ========
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (5) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        let cooldownEmbed = new Discord.MessageEmbed()
          .setColor("#2F3136")
          .setDescription(`**⏰| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)

        return message.reply(cooldownEmbed)
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //Executing the codes when we get the command or aliases
    try {
      if (command) {
        command.execute(client, message, args);
      } else return;
    } catch (error) {
      console.error(error)
    }

    //======== Change Nickname ========
    let NicknameChannel = await db.get(`NicknameChannel_${message.guild.id}`);
    if (NicknameChannel) {
      if (message.channel.id === NicknameChannel.id) {
        if (message.content.length > 32) {
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(client.colors.red)
            .setTitle(`${client.emotes.error}| Nickname Morede Nazar Tolani Ast`)
            .setDescription(`Nickname Shoma Nabayad Bishtar Az \`32\` Carecter Bashad.`)).then(msg => msg.delete({ timeout: "7000" })).then(message.delete())
        } else {
          message.member.setNickname(message.content)
          const messageEmbed = new Discord.MessageEmbed()
            .setColor(client.colors.none)
            .setTitle(`${client.emotes.success}| Successfully your nickname changed`)
            .setDescription(`Your Nickname Have Been Changed To: \`${message.content}\``)
          message.channel.send(messageEmbed).then((msg) => msg.delete({ timeout: "7000" })).then(() => message.delete())
        }
      }
    }

    //========== Leave Guild =========
    if (message.guild.memberCount < 90 && !message.guild.id === "991109798709956668" && !message.guild.id === "901877002926174279") {
      const guild = message.guild
      guild.owner.send("Hi I left on your server because the number of members of your server is less than 100")
      guild.leave()
    }

    //========= Youtube New Video
    client.youtube = {
      channel: await db.get(`DsicordYTNews_${message.guild.id}`),
      channel_id: await db.get(`YoutubeChannelID_${message.guild.id}`),
      watchInterval: 30000,
      messageTemplate: await db.get(`YTNewsMessage_${message.guild.id}`)
      /**
      like this => **{author}** video jadid darim yo bodoyid biayid🗣  
    Link:   \n{url}  
    Mention: @everyone
    */
    };
    if (await db.get(`YoutubeChannelID_${message.guild.id}`)) {
      async function handleUploads() {
        if (await db.get(`postedVideos`) === null) await db.set(`postedVideos`, []);
        setInterval(() => {
          client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.youtube.channel_id}`)
            .then(async data => {
              if (await db.get(`postedVideos`).includes(data.items[0].link)) return;
              else {
                await db.set(`videoData`, data.items[0]);
                await db.push("postedVideos", data.items[0].link);
                let parsed = await db.get(`videoData`);
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
        handleUploads()
      })
    }

  } catch (e) {
    error(e)
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */