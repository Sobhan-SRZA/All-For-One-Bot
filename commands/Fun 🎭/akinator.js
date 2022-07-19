const { Client, Message, MessageEmbed } = require('discord.js');
  
module.exports = {
    name: 'akinator',
    description: 'hads zadane carecter shoma',
    aliases: ['aki','pishgo'],
    category: 'Fun 🎭',
    utilisation: '{prefix}akinator',

   async execute(client, message, args) {
const Discord = require('discord.js');
const emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"];
const isPlaying = new Set();
const { Aki } = require("aki-api");
const db = require('quick.db')

		var prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0]; 
		if (message.author.bot || !message.guild) return;

	
		if (isPlaying.has(message.author.id)) {
		  return message.channel.send("<a:no:784463793366761532> **The game already started**");
		}
	
		isPlaying.add(message.author.id);
	
		const aki = new Aki({ region:"en" }); 
	
		await aki.start();
	
		const msg = await message.channel.send(new Discord.MessageEmbed()
		  .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
		  .setColor("RANDOM")
		  .setDescription(`**${aki.question}**\n${aki.answers.map((an, i) => `**${an} ${emojis[i]}**`).join("\n")}`))
		  
	
		for (const emoji of emojis) await msg.react(emoji);
	
		const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id == message.author.id, {
		  time: 60000 * 6
		});
	
		collector
		  .on("end", () => isPlaying.delete(message.author.id))
		  .on("collect", async ({
			emoji,
			users
		  }) => {
			users.remove(message.author).catch(() => null);
	
			if (emoji.name == "❌"){ 
         collector.stop()
         msg.edit(`بازی شما به اتمام رسید`)
         msg.reactions.removeAll()
           return;
      }
			await aki.step(emojis.indexOf(emoji.name));
	
			if (aki.progress >= 70 || aki.currentStep >= 78) {
	
			  await aki.win();
	
			  collector.stop();
	
			  msg.edit(new Discord.MessageEmbed()
				.setTitle("Is this your character?")
				.setDescription(`**${aki.answers[0].name}**\n**${aki.answers[0].description}**\n**Ranking as #${aki.answers[0].ranking}**\n\n**yes** **(y)** **/** **no** **(n)**`)
				.setImage(aki.answers[0].absolute_picture_path)
				.setColor("RANDOM"))
			
	
			  const filter = m => /(yes|no|y|n)/i.test(m.content) && m.author.id == message.author.id;
	
			  message.channel.awaitMessages(filter, {
				  max: 1,
				  time: 30000,
				  errors: ["time"]
				})
				.then(collected => {
				  const isWinner = /yes|y/i.test(collected.first().content);
				  message.channel.send(new Discord.MessageEmbed()
					.setTitle(isWinner ? "Great, Guessed right one more time." : "Uh, you won")
					.setColor("RANDOM")
					.setDescription("**I love playing with you**"));
				}).catch(() => null);
			
			} else {
			  msg.edit(new Discord.MessageEmbed()
				.setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
				.setColor("RANDOM")
				.setDescription(`**${aki.question}**\n${aki.answers.map((an, i) => `**${an} ${emojis[i]}**`).join("\n")}`))
			}
		})


    }
}