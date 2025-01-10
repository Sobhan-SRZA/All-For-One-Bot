const {
  MessageButton,
  MessageEmbed,
  MessageActionRow
} = require('discord.js')
const axios = require('axios');
module.exports = {
    name: 'joke',
    aliases: ['jo'],
    category: 'Fun 🎭 | Minigame',
    description: 'send some jokes for laughing.',
    usage: '',

  async execute(client, message, args) { 
  let getInfo3 = async () => {
    let response3 = await axios.get('https://api.codebazan.ir/jok/');
    let info3 = response3.data;
    return info3;
  };
    let infoValue3 = await getInfo3();
    const row = new MessageActionRow()
      .setComponents([new MessageButton
        .setLabel("IS FUNNY")
        .setStyle("SUCCESS")
        .setCustomId("funny")
        ],[new MessageButton
          .setLabel("NOT FUNNY")
          .setStyle("DANGER")
          .setCustomId("notfunny")
      ])
      const row_ = new MessageActionRow()
        .setComponents([new MessageButton
          .setLabel("IS FUNNY")
          .setStyle("SUCCESS")
          .setCustomId("funny")
          .setDisabled(true)
        ],[new MessageButton
            .setLabel("NOT FUNNY")
            .setStyle("DANGER")
            .setCustomId("notfunny")
            .setDisabled(true)
      ])
    const embed = new MessageEmbed()
     .setColor(client.colors.none)
     .setTitle(client.emotes.laugh+"| Is Funny Joke?")
     .setDescription(`**${infoValue3}**`)
     await message.reply({
              embeds: [embed],
              components: [row]
            })
    const filter = i => i.user.id === interaction.member.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    collector.on('collect', async(x) => {
      if(x.id === "funny") {
         embed
          .setTitle(client.emotes.laughing+"| That Was Very Funny")
        await message.edit({
                 embeds: [embed],
                 components: [row_]
               })
      }else
      if(x.id === "notfunny") {
        await message.reply({
                 embeds: [embed],
                 components: [row]
               })
      }
    })
    if(collector.end()){
      await message.reply({
               embeds: [embed],
               components: [row_]
             })
    }
  }
}
