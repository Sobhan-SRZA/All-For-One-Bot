const { Collection, MessageEmbed } = require("discord.js")
module.exports = async (client, message) => {
      if(message.channel.type === 'dm'){
        if(!message.author.bot === message.user) return message.reply("You are Bot 🤖")
        if(message.content.includes(`@everyone`)) return
        if(message.author.id === process.env.USER_ID)return
        if(message.content.includes('@'))return message.channel.send('منشن نمیتونی بکنی کسی رو')
      const channelbug = client.channels.cache.get("988020418612961322");
        const embed = new MessageEmbed()
          .setColor(client.colors.none)
          .setAuthor(`${message.author.username}`,message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setTitle(`This Guy Have Report, User ID "${message.author.id}"`)
          .setDescription(`> ${message.content}`)
        channelbug.send(embed).then((msg)=> {
          msg.react(client.emotes.report)
         }).then(message.reply('درخواست باگ یا نظر شما به سرور پشتیبانی ارسال شد یا ادمین ها جوین سرور میشوند و حل میکنند یا به شما در خواست فرندی میدهند با تشکر'))

    }

    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX||`<@!${message.client.user.id}>`||message.client.user;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
      if (!cmd || !cmd.name||!cmd.aliases) {
        return message.channel.send(`**${client.emotes.off}| It seems like \`${command}\` is not a valid command! Please try Again!**`)
      }
//  COMMAND  COOLDOWNS !!
  const cooldowns = new Collection();
   if (cooldowns) {
  if (!cooldowns.has(client.commands.cooldown)) {
    cooldowns.set(client.commands.name, client.commands);
  }
  const now = Date.now();
  const timestamps = cooldowns.get(client.commands.name);
  const cooldownAmount = (client.commands.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`**${client.emotes.off}| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${cmd.name}\` command!**`)
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
    if (cmd) cmd.execute(client, message, args);
};