const {
	MessageEmbed
} = require("discord.js");
const yts = require("yt-search");
const ytpl = require('ytpl');
const {
    handleVideo,
    sendError
  } = require("../../functions/functions")
module.exports = {
   name: 'playlist',
   aliases: ['pl'],
   category: 'Music 🎶',
   utilisation: '[YouTube Playlist URL | Playlist Name]',
   description: "Play a playlist from youtube.",
  async execute(client, message, args) {
const channel = message.member.voice.channel;
if (!channel) return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel, client,  message);
const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
var searchString = args.join(" ");
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return sendError("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel, client,  message);
    if (!permissions.has("SPEAK")) return sendError("I cannot speak in this voice channel, make sure I have the proper permissions!", message.channel, client,  message);
    if (!searchString||!url) return sendError(`Usage: ${message.client.config.prefix}playlist <YouTube Playlist URL | Playlist Name>`, message.channel, client,  message);
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        try {
            const playlist = await ytpl(url.split("list=")[1]);
            if (!playlist) return sendError("Playlist not found", message.channel, client,  message)
            const videos = await playlist.items;
            for (const video of videos) {// eslint-disable-line no-await-in-loop
                await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send({
                embed: {
                    author: {
                        name: `Requested by ` + message.author.name,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    },
                    footer: {
                        text: "Playlist Ready | created by Mr.SIN RE#1528",
                        iconURL: message.guild.iconURL({ dynamic: true })
                    },
                    title: `${client.emotes.sucsses}| Playlist Added`,
                    color: client.colors.none,
                    description: `Playlist: **\`${videos[0].title}\`** has been added to the queue  ${client.emotes.music}`
                }
            })
        } catch (error) {
            console.error(error);
            return sendError("Playlist not found :(",  message.channel, client,  message).catch(console.error);
        }
    } else {
        try {
            var searched = await yts.search(searchString)
            if (searched.playlists.length === 0) return sendError("Looks like i was unable to find the playlist on YouTube", message.channel, client,  message)
            var songInfo = searched.playlists[0];
            let listurl = songInfo.listId;
            const playlist = await ytpl(listurl)
            const videos = await playlist.items;
            for (const video of videos) {// eslint-disable-line no-await-in-loop
                await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
            }
            let thing = new MessageEmbed()
                .setAuthor({
                  name: "Playlist has been added to queue",
                  iconURL: require('../../assets/pictures/Music.gif')
                })
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setImage(songInfo.thumbnail)
                .setColor("GREEN")
                .setDescription(`✅  **|**  Playlist: **\`${songInfo.title}\`** has been added \`${songInfo.videoCount}\` video to the queue`)
            return message.channel.send(thing)
        } catch (error) {
            return sendError("An unexpected error has occurred", message.channel, client,  message).catch(console.error);
        }
    }
   },
};