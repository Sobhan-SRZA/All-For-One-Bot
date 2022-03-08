const Discord = require("discord.js")
module.exports = async (client, message) => {
      if(message.channel.type === 'dm'){
        if(!message.author.bot === message.user) return message.reply("You are Bot 🤖")
        if(message.content.includes(`@everyone`)) return
        if(message.author.id === process.env.USER_ID)return
        if(message.content.includes('@'))return message.channel.send('منشن نمیتونی بکنی کسی رو')
      const sizarTMserver = message.client.guilds.cache.get("912598706405146665");
      const channelbug = sizarTMserver.channels.cache.get("929205990790950982");
        const embed = new Discord.MessageEmbed()
          .setColor(`RANDOM`)
          .setAuthor(`${message.author.username}`,message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setTitle(`This Guy Have Report, User ID "${message.author.id}"`)
          .setDescription(`> ${message.content}`)
        channelbug.send(embed).then((msg)=> {
          msg.react(client.emotes.report)
         }).then(message.reply('درخواست باگ یا نظر شما به سرور پشتیبانی ارسال شد یا ادمین ها جوین سرور میشوند و حل میکنند یا به شما در خواست فرندی میدهند با تشکر'))

    }

    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
  
 /* //  COMMAND  COOLDOWNS !!
const cooldowns = clien.commands;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, clien.commands);
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`**${cross} Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
*/
};
