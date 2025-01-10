const {
	MessageEmbed
} = require("discord.js");
const {
	check_if_dj
} = require("../../functions/functions")
module.exports = {
	name: "seek",
 category: 'Music 🎶',
	utilisation: "[TimeInSec]",
	aliases: ["sek"],
	description: "Jumps to a specific Position in the Song",
 cooldown: 10,
	async execute(client, message, args) {
		try {
			const {
				member,
				channelId,
				guildId,
				applicationId,
				commandName,
				deferred,
				replied,
				ephemeral,
				options,
				id,
				createdTimestamp
			} = message;
			const {
				guild
			} = member;
			const {
				channel
			} = member.voice;
			if (!channel) return message.reply({
				embeds: [
					new MessageEmbed().setColor(client.colors.red).setTitle(`${client.emotes.badege}| **Please join ${guild.me.voice.channel ? "__my__" : "a"} VoiceChannel First!**`)
				],

			})
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(client.colors.red)
						.setFooter({tetx:`error | Requested by ${member.name}`, iconURL:member.avatarURL({ dynamic: true })})
						.setTitle(`${client.emotes.entry}| Join __my__ Voice Channel!`)
						.setDescription(`<#${guild.me.voice.channel.id}>`)
					],
				});
			}
			try {
				let newQueue = client.player.getQueue(message.guild.id);
    const trackDuration = (newQueue.getPlayerTimestamp()).progress == 'Forever' ? 'Endless (Live)' : track.duration;
				if (!newQueue || !newQueue.playing) return message.reply({
					embeds: [
						new MessageEmbed().setColor(client.colors.red).setTitle(`${client.emotes.entry}| **I am nothing Playing right now!**`)
					],

				})
				if (!args[0]) {
					return message.reply({
						embeds: [
							new MessageEmbed()
       .setColor(client.colors.red)
       .setFooter({tetx:`error | Requested by ${member.name}`, iconURL:member.avatarURL({ dynamic: true })})
							.setTitle(`${client.emotes.error} **Please add a Seek Number Position-Duration!**`)
							.setDescription(`**Usage:**\n> \`${client.db.get(`prefix_${guild.id}`)||client.prefix}seek <Duration_in_Sec>\``)
						],
					})
				}
				let seekNumber = Number(args[0])
				if (seekNumber > trackDuration || seekNumber < 0) return message.reply({
					embeds: [
						new MessageEmbed().setColor(client.colors.red).setTitle(`${client.emotes.off}| **The Seek Position must be between \`0\` and \`${newQueue.songs[0].duration}\`!**`)
					],

				})
				if (check_if_dj(client, member, newQueue.songs[0])) {
					return message.reply({
						embeds: [new MessageEmbed()
       .setColor(client.colors.red)
       .setFooter({tetx:`error | Requested by ${member.name}`, iconURL:member.avatarURL({ dynamic: true })})
							.setTitle(`${client.emotes.off}| **You are not a DJ and not the Song Requester!**`)
							.setDescription(`**DJ-ROLES:**\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
					});
				}
				await newQueue.setSeek(seekNumber);
				message.reply({
					content: `⏺ **Seeked to \`${seekNumber} Seconds\`!**\n> 💢 **Action by**: \`${member.user.tag}\``
				})
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({
					content: `${client.emotes.off} | Error: `,
					embeds: [
						new MessageEmbed()
      .setColor(client.colors.red)
      .setFooter({tetx:`error | Requested by ${member.name}`, iconURL:member.avatarURL({ dynamic: true })})
						.setDescription(`\`\`\`${e}\`\`\``)
					],

				})
			}
		} catch (e) {
			console.error(String(e.stack))
		}
	}
}