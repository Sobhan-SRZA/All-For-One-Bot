const { 
	MessageEmbed 
} = require('discord.js');
const emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"];
const isPlaying = new Set();
const { 
			Aki 
} = require("aki-api");  
module.exports = {
    name: 'akinator',
    description: 'this	is	akinator	command,	',
    aliases: ['aki','pishgo'],
    category: 'Fun 🎭 | Minigame',
    usage: '',

   async execute(client, message, args) {
	
		if (isPlaying.has(message.author.id)) {
		  return message.channel.send(client.emotes.entry+"| **The game already started**");
		}
	
		isPlaying.add(message.author.id);
	
		const aki = new Aki({ region:"en" }); 
	
		await aki.start();
	
		const msg = await message.channel.send(new MessageEmbed()
		  .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
		  .setColor(client.colors.none)
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
         msg.edit(new MessageEmbed()
										.setTitle(`${client.emotes.end}|	**Ending**`)
										.setColor(client.colors.none)
										.setDescription(`**you	are	requested	to	ending	this	game	and	it	has	ended	for	you.\nhave	nice	time	${client.emotes.hurt}**`)
									)
         msg.reactions.removeAll()
           return;
      }
			await aki.step(emojis.indexOf(emoji.name));
	
			if (aki.progress >= 70 || aki.currentStep >= 78) {
			  await aki.win();
			  collector.stop();
			  msg.edit(new MessageEmbed()
				.setTitle("Is this your character?")
				.setDescription(`**${aki.answers[0].name}**\n**${aki.answers[0].description}**\n**Ranking as #${aki.answers[0].ranking}**\n\n**yes** **(y)** **/** **no** **(n)**`)
				.setImage(aki.answers[0].absolute_picture_path)
				.setColor(client.colors.none))
			
	
			  const filter = m => /(yes|no|y|n)/i.test(m.content) && m.author.id == message.author.id;
	
			  message.channel.awaitMessages(filter, {
				  max: 1,
				  time: 30000,
				  errors: ["time"]
				})
				.then(collected => {
				  const isWinner = /yes|y/i.test(collected.first().content);
				  msg.edit(new MessageEmbed()
					.setTitle(isWinner ? "Great, Guessed right one more time." : "Uh, you won")
					.setColor(client.colors.none)
					.setDescription("**I love playing with you**"));
				}).catch(() => null);
			
			} else {
			  msg.edit(new MessageEmbed()
				.setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
				.setColor(client.colors.none)
				.setDescription(`**${aki.question}**\n${aki.answers.map((an, i) => `**${an} ${emojis[i]}**`).join("\n")}`))
			}
		})


    }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */