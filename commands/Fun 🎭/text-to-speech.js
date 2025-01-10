const request = require("node-superfetch");
const db = require('quick.db'); 
const {
  MessageEmbed,
  Permissions
} = require('discord.js');
const { 
  errorEmbed 
} = require("../../functions/functions");
module.exports = {
  name: "texttospeech",
  aliases: ["tts","text-to-speech"],
  category: 'Fun 🎭 | Voice',
  usage: "[text]",  
  description: "Converts Text To Speech.",
  async execute(client, message, args) { 
    if (!args[0])
      return message.channel.send(
        client.emotes.entry + "**| Please Enter Something To Convert To Speech!**"
      );
    let text = args.join(" ");
    let serverQueue = db.get(`ttsVoice_${message.guild.id}`);
    if (text.length > 1024)
      return message.reply({
                  embeds: [errorEmbed(
                    message,
                    `**Please Enter Text Between \`0\` And \`1024\` Characters!**`,
                    client
                  )]
             });
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
          return message.reply({
                  embeds: [errorEmbed(
                    message,
                    "**Please Join A Voice Channel First!**",
                    client
                  )]
                 });
    if (
      !voiceChannel
        .permissionsFor(message.client.user)
        .has(Permissions.FLAGS.CONNECT||Permissions.FLAGS.SPEAK)
    ) {
          return message.reply({
                  embeds: [errorEmbed(
                    message,
                    "**Missing Permissions For The Voice Channel! - [CONNECT, SPEAK]**",
                    client
                  )]
                 });
    }
    if (serverQueue)
          return message.reply({
                  embeds: [errorEmbed(
                    message,
                    "**Cannot Play TTS While Music Is Being Played!**",
                    client
                  )]
                 });
    if (!voiceChannel.joinable)
          return message.reply({
                  embeds: [errorEmbed(
                    message,
                    "**Cannot Join Voice Channel!**",
                    client
                  )]
                 });
    if (client.voice.connections.has(voiceChannel.guild.id))
          return message.reply({
                  embeds: [errorEmbed(
                    message,
                    "**I Am Already Converting TTS!!**",
                    client
                  )]
                 });
    try {
      const { url } = await request
        .get("http://tts.cyzon.us/tts")
        .query({ text });
      const rection_join = await message.react(client.emotes.voice).catch(()=>{})
      voiceChannel.join().then(async connection => {
          voiceChannel.guild.voice.setSelfDeaf(client.config.opt.selfDeaf)
          const dispatcher = connection.play((url));
          db.set(`ttsVoice_${message.guild.id}`, voiceChannel.id)
          dispatcher.on('speaking', speaking => {
              if(!speaking) {
                  channel.leave();
                  rection_join.remove()
              }
              db.delete(`ttsVoice_${message.guild.id}`)
          });
          dispatcher.on("finish", () => {
             voiceChannel.leave()
             db.delete(`ttsVoice_${message.guild.id}`)
          });
          dispatcher.on("error", () => {
             voiceChannel.leave()
             db.delete(`ttsVoice_${message.guild.id}`)
          });
          return null;
      }).catch(err => console.log(err));      
    } catch (error){
      voiceChannel.leave()
      return message.reply({
                    embeds: [errorEmbed(
                        message,
                        "**Something Went Wrong Try Again!**:"+`\`\`\`js\n${error}\`\`\``,
                        client
                        )]
             }); 
    };
  }
};
