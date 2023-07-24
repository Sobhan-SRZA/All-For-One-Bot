const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  Collection,
  ButtonStyle,
  ChannelType,
  PermissionsBitField,
  SelectMenuBuilder
} = require("discord.js");
module.exports = async (client, oldmessage, newmessage) => {
  const message = newmessage;
  const db = client.db;

  //======== Command for shows the prefix ========
  if (message.author.bot || message.channel.type === ChannelType.DM) return;//a direct message between users

  //======== Command Prefix & args ========
  const lang = await db.has(`guild_${message.guild.id}.language`) ? await db.get(`guild_${message.guild.id}.language`) : client.config.default_language;
  const Tprefix = await db.has(`guild_${message.guild.id}.prefix`) ? await db.get(`guild_${message.guild.id}.prefix`) : `${client.prefix}`;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Tprefix.toString())})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [prefix] = message.content.match(prefixRegex);
  if (message.content.indexOf(prefix) !== 0) return;
  let mes = client.languages[lang].general;

  //============ Check Perms
  if (!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.EmbedLinks])) return message.reply({ content: mes.error.replaceAll("{emote_error}", client.emotes.error) });
  if (!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.UseExternalEmojis])) {
    //client.emotes = require(`${process.cwd()}/storage/emotes.json`).default;
  }

  //=========== Help Menu With Mention Bot
  let contents = [
    `<@!${client.user.id}>`,
    `<@${client.user.id}>`,
    `${prefix}prefix`
  ];
  if (contents.includes(message.content)) {
    message.reply({
      embeds: [new EmbedBuilder().setAuthor({ name: mes.mention.embed.author.replaceAll("{username}", client.user.username) }).setFooter({ text: mes.mention.embed.footer.replaceAll("{user}", message.author.tag), iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setColor(client.colors.theme).addFields([{ name: mes.mention.embed.field1.name, value: mes.mention.embed.field1.value.replaceAll("{username}", client.user.username).replaceAll("{invite}", client.config.discord.invite).replaceAll("{ticket_emote}", client.emotes.tickets).replaceAll("{system_emote}", client.emotes.system).replaceAll("{learn_emote}", client.emotes.learn), inline: false }, { name: mes.mention.embed.field2.name, value: mes.mention.embed.field2.value.replaceAll("{prefix}", Tprefix).replaceAll("{cmd}", `</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`), inline: false }]).setThumbnail(client.user.displayAvatarURL({ dynamic: true }))],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.mention.button.btn1).setEmoji(client.emotes.report).setCustomId(`report`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.mention.button.btn2).setEmoji(client.emotes.invite).setURL(client.config.discord.invite), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.mention.button.btn3).setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
    })
  }

  //=========== Command Handler
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  if (!commandName) return;
  const command = client.messageCommands.get(commandName) || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (command) {
    //======= Check Command Perms
    let bot_perms = [];
    command?.botPermissions.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]))
    let user_perms = [];
    command?.userPermissions.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]))
    if (!message.guild.members.me.permissions.has([bot_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(mes.botpermissions.replaceAll("{emote_x}", client.emotes.x).replaceAll("{command}", command.name).replaceAll("{perms}", command?.botPermissions.map(p => `\`${p}\``).join(", "))).setColor(client.colors.orange)] }).catch((e) => { console.log(e) });

    if (!message.member.permissions.has([user_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(mes.userpermissions.replaceAll("{emote_error}", client.emotes.error).replaceAll("{command}", command.name).replaceAll("{perms}", command?.userPermissions.map(p => `\`${p}\``).join(", "))).setColor(client.colors.red)] }).catch((e) => { console.log(e) });

    //======== Command Cooldown ========
    if (!client.messageCooldowns.has(command.name)) {
      client.messageCooldowns.set(command.name, new Collection());
    }
    const now = Date.now();
    const timestamps = client.messageCooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply({
          embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(mes.cooldown.replaceAll("{emote_alert}", client.emotes.alert).replaceAll("{time}", `<t:${Math.floor((new Date().getTime() + Math.floor(timeLeft * 1000)) / 1000)}:R>`).replaceAll("{command}", command.name))],
        })
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //========= Handler
    try {
      message.channel.sendTyping()
      setTimeout(() => {
        command.messageRun(client, message, args, lang, Tprefix);
      }, 100)
    } catch {
    }
  }
};
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */