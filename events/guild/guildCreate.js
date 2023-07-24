const {
  EmbedBuilder,
  ChannelType,
  PermissionsBitField
} = require('discord.js');
module.exports = async (client, guild) => {
    let Sguild = client.guilds.cache.get(client.config.discord.server_id);
    let channel = Sguild.channels.cache.get(client.config.discord.server_channel_status);
    let owner = await guild.fetchOwner();
    let invite = "";
    try{
      let ch = await guild.channels.cache.filter(x => x.type === ChannelType.GuildText).random(1)[0];
      if(ch?.permissionsFor(ch.guild.members.me).has([PermissionsBitField.Flags.CreateInstantInvite])){
       let i = await ch.createInvite({ maxAge: 0, maxUses: 5 });
       invite += `${i?.url || "https://discord.gg/"+i?.code}`; 
      }else{
         invite += "can't create it :("
      }
    }catch(e){
       console.error(e)
    }
    let embed = new EmbedBuilder()
     .setAuthor({
        name: guild.name,
        iconURL: owner?.user.displayAvatarURL({ dynamic: true })
     })
     .setDescription(`I have added in \`${guild.name}\` and my guilds count is: \`${client.guilds.cache.size}\``)
     .addFields([{
       name: `👑| Owner Tag: `,
       value: `${client.emotes.reply}\`${owner?.user.tag}\``,
       inline: false
     },{
       name: `👓| Owner ID: `,
       value: `${client.emotes.reply}\`${owner?.user.id}\``,
       inline: false
     },{
       name: `👥| Total Members:`, 
       value: `${client.emotes.reply}\`${guild.memberCount}\``, 
       inline: false
     },{
       name: `📬| Server Invite: `,
       value: `${client.emotes.reply}**${invite || "can't create it :("}**`,
       inline: false
     },{
       name: `🆔| Guild ID:`, 
       value: `${client.emotes.reply}**\`${guild.id}\`**`, 
       inline: false
     },{
       name: `📅| Created at:`, 
       value: `${client.emotes.reply}**<t:${Date.parse(guild.createdAt) / 1000}:D> | <t:${Date.parse(guild.createdAt) / 1000}:R>**`, 
       inline: false
     }])
     .setColor(client.colors.none)
     .setThumbnail(guild.iconURL({ dynamic: true }))
     .setFooter({ 
       text: client.user.tag, 
       iconURL: client.user.displayAvatarURL({ dynamic: true })
     })
     .setTimestamp(Date.now())
  
    channel.send({
        embeds: [embed]
    })
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */