const path = require('path');
const { list, randomItem, errorEmbed } = require('../../functions/functions.js');
const sounds = require('../../JSON/soundboard.json');
const {
    MessageEmbed,
    Permissions
} = require('discord.js');
module.exports = {
    name: 'soundboard',
    aliases: ['sound'],
    category: 'Fun 🎭 | Voice',
    utilisation: `[use: ${list(sounds, ',')}]`,
    description: 'Play a fun sound in a voice channel.',
async execute(client, message, args) {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.CONNECT||Permissions.FLAGS.SPEAK))
                 return message.reply({
                            embeds: [errorEmbed(
                                message,
                                "**I Dont Have Permissions To Either - JOIN or SPEAK!**",
                                client
                                )]
                        });
        const botchannel = message.guild.me.voice.channel;
        const channel = message.member.voice.channel;
        if (!channel)
        return message.reply({
            embeds: [errorEmbed(
                message,
                "**Please Join A VC To Play Sound!**",
                client
                )]
        });
        if(botchannel)
        return message.reply({
            embeds: [errorEmbed(
                message,
                `**I am already connected in \`${botchannel.name}\`!**`,
                client
                )]
        });    
        if (!args[0]) {
            let soundlist = `${sounds[randomItem(sounds)]}.mp3`;
            let sound = `${soundlist.toLowerCase()}`;
            try {
                    if (message.channel.permissionsFor(client.user).has(Permissions.FLAGS.ADD_REACTIONS||Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                        const rection_join = await message.react('🔉').catch()
                        channel.join().then(async connection => {
                            const dispatcher = connection.play(path.join(__dirname, sound));
                            dispatcher.on('speaking', speaking => {
                                if(!speaking) {
                                    channel.leave();
                                    rection_join.remove()
                                }
                            });
                        }).catch(err => console.log(err));
                    } else {
                        return message.reply({
                            embeds: [errorEmbed(
                                message,
                                "**Missing Permission - [ADD_REACTIONS]!**",
                                client
                                )]
                        });    
                    }
            } catch (error){
                return message.reply({
                    embeds: [errorEmbed(
                        message,
                        "**Something Went Wrong Try Again!**:"+`\`\`\`js\n${error}\`\`\``,
                        client
                        )]
                }); 
            }
            return null;
        } else {
            if (!sounds.includes(args[0]))
                return message.reply({
                    embeds: [errorEmbed(
                        message,
                        `**Which Sound Do You Want To Play? Either ${list(sounds, 'or')}!**`,
                        client
                        )]
                }); 
            let sound = `${args[0].toLowerCase()}.mp3`;
            try {
                    try {
                        if (message.channel.permissionsFor(client.user).has(Permissions.FLAGS.ADD_REACTIONS||Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                            const rection_join = await message.react(client.emotes.voice).catch(()=>{})
                            channel.join().then(async connection => {
                                const dispatcher = connection.play(path.join(__dirname, sound));
                                dispatcher.on('speaking', speaking => {
                                    if(!speaking) {
                                        channel.leave();
                                        rection_join.remove()
                                    }
                                });
                            }).catch(err => console.log(err));
                        } else {
                            return message.reply({
                                embeds: [errorEmbed(
                                    message,
                                    "**Missing Permission - [ADD_REACTIONS]!!**",
                                    client
                                    )]
                            }); 
                        }
                    } catch (error){
                        return message.reply({
                            embeds: [errorEmbed(
                                message,
                                "**Something Went Wrong Try Again!**:"+`\`\`\`js\n${error}\`\`\``,
                                client
                                )]
                        }); 
                    };
            } catch (error){
                return message.reply({
                    embeds: [errorEmbed(
                        message,
                        "**Couldn't Join VC, Check My Permissions!!**:"+`\`\`\`js\n${error}\`\`\``,
                        client
                        )]
                }); 
            };
        };
    }
};