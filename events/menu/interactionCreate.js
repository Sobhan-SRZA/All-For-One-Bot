const db = require('quick.db');
const { 
  MessageSelectMenu,
  MessageEmbed, 
  MessageButton, 
  MessageActionRow 
} = require("discord.js");
const {
  NeedHelpButtons,
  NeedHelpMenu,
  HelpCategoryEmbed,
  GenderMenu,
  commandsData
} = require("../../functions/help_functions")
const {
  epochDateNow,
  CustomErrorEmbed,
  successEmbed,
  list,
  errorEmbed,
  createColorRole
} = require('../../functions/functions.js');
var clc = require("cli-color");
module.exports = async (client, menu) => {
try {
  const prefix = await client.db.fetch(`prefix_${menu.guild.id}`)||client.prefix;
  let logChannel = db.fetch(`modlog_${menu.guild.id}`);
  let commands = client.commands;
  if(!menu.isSelectMenu())return;
  const btn_1 = new MessageButton()
      .setStyle('LINK')
      .setLabel('Invite Me')
      .setEmoji('🤖')
      .setURL(client.config.discord.invite)    
  const btn_2 = new MessageButton()
    .setStyle('LINK')
    .setLabel('Support Server!')
    .setEmoji('🧰')
    .setURL(`${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`) 
    const row_1 = new MessageActionRow()
    .addComponents([btn_1],[btn_2])
    const row = new MessageActionRow()
    .addComponents([
      new MessageSelectMenu()
        .setCustomId("help_menu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("🆘| Click me to show bot commands !!")
        .addOptions([
              {
                label: 'Infos Help',
                value: 'inf',
                description: 'send commands of Infos📊 Category',
                emoji: {
                  name: '📊',
                },
            },
            {
                label: 'Member Help',
                value: 'meb',
                description: 'send commands of Member👻 Category',
                emoji: {
                  name: '👻',
                },
            },
            {
                label: 'Setup Help',
                value: 'stp',
                description: 'send commands of Setup💻 Category',
                emoji: {
                  name: '💻',
                },
            },
            {
                label: 'Moderation Help',
                value: 'mod',
                description: 'send commands of Moderation🗿 Category',
                emoji: {
                  name: '🗿',
                },
            },
            {
                label: 'Ticket Help',
                value: 'tic',
                description: 'send commands of Ticket🎫 Category',
                emoji: {
                  name: '🎫',
                },
            },
            {
                label: 'Giveaway Help',
                value: 'giv',
                description: 'send commands of Giveaway🎁 Category',
                emoji: {
                  name: '🎁',
                },
            },
            {
                label: 'Music Help',
                value: 'mus',
                description: 'send commands of Music🎶 Category',
                emoji: {
                  name: '🎶',
                },
            },
            {
                label: 'Fun Help',
                value: 'fun',
                description: 'send commands of Fun🎭 Category',
                emoji: {
                  name: '🎭',
                },
            },
            {
                label: 'Nsfw Help',
                value: 'nsw',
                description: 'send commands of Nsfw🔞 Category',
                emoji: {
                  name: '🔞',
                },
            },
            {
                label: 'VIP Help',
                value: 'vip',
                description: 'send commands of VIP💎 Category',
                emoji: {
                  name: '💎',
                },
            },
              {
                label: 'Owner Help',
                value: 'owr',
                description: 'send commands of Owner👑 Category',
                emoji: {
                  name: '👑',
                },
            },
        ])
  ])
   async function HelpCategoryEmbed(commands, CategoryName, client, message, prefix){
    let embed = new MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
        .setTitle(`${client.user.username} | **${CategoryName}** Help`)
        .setDescription(`**Baraie Estefade Kardan Az Command Ha Matn Zir Ra Negah Konid.\n  \n${'**' + (client.commands.filter(c => c.category === CategoryName)).map(i => '`' + prefix + i.name + '`').join(' , ') + '**'}**`)
        .setURL('https://discord.gg/vgnhGXabNw')
        .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
        .setAuthor({ name: `Requested by ${message.member.username}`, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })      
        .setColor(client.colors.none)
        commands.filter(c => c.category === CategoryName).forEach((cmd) => {
          embed.addFields(
            {
             name: `**${prefix}${cmd.name} **\`(${cmd.usage ? `${cmd.usage}` : ""})**`, 
             value: `**Description: \`${cmd.description}\` | Aliases:** \`(${cmd.aliases ? `${cmd.aliases}` : ""})\``, 
             inline: true 
            },
          );
      })
      return embed
    }
  if(menu.customId === 'help_menu'){
    if(menu.values[0] === "tic"){
      menu.update({ 
        embeds: [HelpCategoryEmbed(commands, "Ticket 🎫", client, menu, prefix)], 
        components: [row,row_1]
      })
    }
    if(menu.values[0] === "inf"){
      menu.update({ 
        embeds: [HelpCategoryEmbed(commands, "Infos 📊", client, menu, prefix)],
        components: [row,row_1]
      })
    }
    if(menu.values[0] === "mod"){
      menu.update({ 
        embeds: [HelpCategoryEmbed(commands, "Moderation 🗿", client, menu, prefix)], 
        components: [row,row_1]
      })
    }
    if(menu.values[0] === "owr"){
      menu.update({ 
        embeds: [HelpCategoryEmbed(commands, "Owner 👑", client, menu, prefix)], 
        components: [row,row_1]
      })
    }
    if(menu.values[0] === "meb"){
      menu.update({ 
        embeds: [HelpCategoryEmbed(commands, "Member 👻", client, menu, prefix)], 
        components: [row,row_1]
      })
    } 
    if(menu.values[0] === "vip"){
      menu.update({ 
        embeds: [HelpCategoryEmbed(commands, "VIP 💎", client, menu, prefix)], 
        components: [row,row_1]
      })
    } 
    if(menu.values[0] === "stp"){
      menu.update({ 
        embeds: [HelpCategoryEmbed(commands, "Setup 💻", client, menu, prefix)], 
        components: [row,row_1]
      })
    } 
    /*if (!menu.member.id === menu.author.id){
       menu.reply({
           ephemeral: true,
           content: `${client.emotes.error}| this menu for <@${menu.member.id}>, you can't used this!!\nfor use this menu you can send a this \`${prefix}help\` command to get a help.`,
      })
    }*/
  }
    if(menu.customId === "funhelp_menu"){
      if(menu.values[0] === "voice"){
        menu.update({ 
        embeds: [HelpCategoryEmbed(commands, "Fun 🎭 | Voice", client, menu, prefix)], 
        components: [NeedHelpMenu(), NeedHelpButtons(client)] 
      })
     }
     if(menu.values[0] === "image"){
      menu.update({ 
      embeds: [HelpCategoryEmbed(commands, "Fun 🎭 | Image", client, menu, prefix)], 
      components: [NeedHelpMenu(), NeedHelpButtons(client)] 
      })
     }
     if(menu.values[0] === "nsfw"){
      menu.update({ 
      embeds: [HelpCategoryEmbed(commands, "Fun 🎭 | Nsfw", client, menu, prefix)], 
      components: [NeedHelpMenu(), NeedHelpButtons(client)] 
      })
     }
     if(menu.values[0] === "minigame"){
      menu.update({ 
      embeds: [HelpCategoryEmbed(commands, "Fun 🎭 | Minigame", client, menu, prefix)], 
      components: [NeedHelpMenu(), NeedHelpButtons(client)] 
      })
     }      
     if(menu.values[0] === "roleplay"){
      menu.update({ 
      embeds: [HelpCategoryEmbed(commands, "Fun 🎭 | Economy", client, menu, prefix)], 
      components: [NeedHelpMenu(), NeedHelpButtons(client)] 
      })
     }      
    }
    //=========== Select Menu Collector 1
    if(menu.customId === 'role_menu'){
    //colors-rolse-crated
    createColorRole(
          menu,
          client,
          '#ff0000',
          'ʳᵍᵇ Red',
          'Red_'
    )
    createColorRole(
          menu,
          client,
          '#ff91af',
          'ʳᵍᵇ Baker Milker Pink',
          'BakerMilkerPink_'
    )
    createColorRole(
          menu,
          client,
          '#ffb6c1',
          'ʳᵍᵇ Rose',
          'Rose_'
    )
    createColorRole(
          menu,
          client,
          '#560319',
          'ʳᵍᵇ Dark Scarlet',
          'DarkScarlet_'
    )
    createColorRole(
          menu,
          client,
          '#ff1493',
          'ʳᵍᵇ Deep Pink',
          'DeepPink_'
    )
    createColorRole(
          menu,
          client,
          '#c04c77',
          'ʳᵍᵇ Persian Red',
          'PersianRed_'
    )
    createColorRole(
          menu,
          client,
          '#be0032',
          'ʳᵍᵇ Crimson Glory',
          'CrimsonGlory_'
    )
    createColorRole(
          menu,
          client,
          '#e0115f',
          'ʳᵍᵇ Ruby',
          'Ruby_'
    )
    createColorRole(
          menu,
          client,
          '#da3287',
          'ʳᵍᵇ Deep Cerise',
          'DeepCerise_'
    )
    createColorRole(
          menu,
          client,
          '#ff00ff',
          'ʳᵍᵇ Magenta',
          'Magenta_'
    )

    //color menu 
      let Color_Menu = new MessageActionRow()
         .addComponents(new MessageSelectMenu()
         .setCustomId("color_menu")
         .setMaxValues(1)
         .setMinValues(1)
         .setPlaceholder("🎨|Baraie Gereftan Role Rang Click Konid !!")
         .addOptions([
             {
                 label: 'ʳᵍᵇRed',
                 value: 'red',
                 description: 'Dadane Role ʳᵍᵇRed',
                 emoji: {
                   name: '944203817455616010',
                 },
             },
             {
                 label: 'ʳᵍᵇBaker Milker Pink',
                 value: 'mipink',
                 description: 'Dadane Role ʳᵍᵇBaker Milker Pink',
                 emoji: {
                   name: '944205013314584606',
                 },
             },
             {
                 label: 'ʳᵍᵇRose',
                 value: 'rose',
                 description: 'Dadane Role ʳᵍᵇRose',
                 emoji: {
                   name: '944205256567431178',
                 },
             },
             {
                 label: 'ʳᵍᵇDark Scarlet',
                 value: 'scarlet',
                 description: 'Dadane Role ʳᵍᵇDark Scarlet',
                 emoji: {
                   name: '944205492991950898',
                 },
             },
             {
                 label: 'ʳᵍᵇDeep Pink',
                 value: 'deepink',
                 description: 'Dadane Role ʳᵍᵇDeep Pink',
                 emoji: {
                   name: '944221718015275058',
                 },
             },
             {
                 label: 'ʳᵍᵇPersian Red',
                 value: 'pered',
                 description: 'Dadane Role ʳᵍᵇPersian Red',
                 emoji: {
                   name: '944221990582091856',
                 },
             },
             {
                 label: 'ʳᵍᵇCrimson Glory',
                 value: 'crig',
                 description: 'Dadane Role ʳᵍᵇCrimson Glory',
                 emoji: {
                   name: '944228515522416640',
                 },
             },
             {
                 label: 'ʳᵍᵇRuby',
                 value: 'ruby',
                 description: 'Dadane Role ʳᵍᵇRuby',
                 emoji: {
                   name: '944232061722566686',
                 },
             },
             {
                 label: 'ʳᵍᵇDeep Cerise',
                 value: 'deepc',
                 description: 'Dadane Role ʳᵍᵇDeep Cerise',
                 emoji: {
                   name: '944232637977985034',
                 },
             },   
             {
                 label: 'ʳᵍᵇMagenta',
                 value: 'mange',
                 description: 'Dadane Role ʳᵍᵇMagenta',
                 emoji: {
                   name: '944233852891725844',
                 },
             },   
         ])
         )
    
    //color menu embed
    let ColorEmbed = new MessageEmbed()
     .setColor(`#2F3136`)
     .setAuthor({name:`Auto Color Role Giver`})
     .setTitle(`🎨 | Color Menu Message👨🏻‍🎨`)
     .setDescription(`This is a color role giver in menu message for you :)\n you can click the menu onther this message to select your colo role ;) \n then bot automaticer give your color role👌🏻 \n that was easy 🗿`)
     .setFooter({text:`Menu In ${menu.guild.name} | ${menu.guild.id} `,iconURL:menu.guild.iconURL({ dynamic: true })})
    .setImage(`https://media.discordapp.net/attachments/912596015624884234/921162727362265148/IMG_2704.gif`)
     .setTimestamp()
    
    // select menu setting
    if(menu.values[0] === "bior"){
        return menu.reply({
                  comtent: '**soon!**',
                  ephemeral: true,
               })
    }else
    if(menu.values[0] === "gar"){
        return menu.reply({
                  comtent: '**soon!**',
                  ephemeral: true,
               })
    }else
    if(menu.values[0] === "cor"){
      return menu.reply({
                 embeds: [ColorEmbed],
                 ephemeral: true,
                 components: [Color_Menu]
             })
     }
    }
    //=========== Select Menu Collector 2
    if(menu.customId === 'color_menu'){
    const { 
      Red,
      Magenta,
      DeepCerise,
      Ruby,
      CrimsonGlory,
      PersianRed,
      DeepPink,
      DarkScarlet,
      Rose,
      BakerMilkerPink
    } = {
          Red: client.db.fetch(`Red_${menu.guild.id}`),
          Magenta: client.db.fetch(`Magenta_${menu.guild.id}`),
          DeepCerise: client.db.fetch(`DeepCerise_${menu.guild.id}`),
          Ruby: client.db.fetch(`Ruby_${menu.guild.id}`),
          CrimsonGlory: client.db.fetch(`CrimsonGlory_${menu.guild.id}`),
          PersianRed: client.db.fetch(`PersianRed_${menu.guild.id}`),
          DeepPink: client.db.fetch(`DeepPink_${menu.guild.id}`),
          DarkScarlet: client.db.fetch(`DarkScarlet_${menu.guild.id}`),
          Rose: client.db.fetch(`Rose_${menu.guild.id}`),
          BakerMilkerPink: client.db.fetch(`BakerMilkerPink_${menu.guild.id}`)
        };
    if(menu.values[0] === "red"){
        menu.member.roles.remove(
            Magenta.id,
            DeepCerise.id,
            Ruby.id,
            CrimsonGlory.id,
            PersianRed.id,
            DeepPink.id,
            DarkScarlet.id,
            Rose.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(Red.id)
      if (menu.member.roles.cache.has(Red.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Red" Role!**',ephemeral:true})
      menu.reply({content:`**${client.emotes.tick}| Gived You "${Red.name}" Role Enjoy It.**`,ephemeral:true})
    
    }else if(menu.values[0] === "mipink"){
        menu.member.roles.remove(
            Red.id,
            Magenta.id,
            DeepCerise.id,
            Ruby.id,
            CrimsonGlory.id,
            PersianRed.id,
            DeepPink.id,
            DarkScarlet.id,
            Rose.id,
            )
      menu.member.roles.add(BakerMilkerPink.id)
     if (menu.member.roles.cache.has(BakerMilkerPink.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Baker Milker Pink" Role!**',ephemeral:true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${BakerMilkerPink.name}" Role Enjoy It.**`,
        ephemeral: true
      })
    
    }else if(menu.values[0] === "rose"){
        menu.member.roles.remove(
            Red.id,
            Magenta.id,
            DeepCerise.id,
            Ruby.id,
            CrimsonGlory.id,
            PersianRed.id,
            DeepPink.id,
            DarkScarlet.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(Rose.id)
     if (menu.member.roles.cache.has(Rose.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Rose" Role!**',ephemeral:true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${Rose.name}" Role Enjoy It.**`,
        ephemeral: true
      })
    
    } else if(menu.values[0] === "scarlet"){
        menu.member.roles.remove(
            Red.id,
            Magenta.id,
            DeepCerise.id,
            Ruby.id,
            CrimsonGlory.id,
            PersianRed.id,
            DeepPink.id,
            Rose.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(DarkScarlet.id)
     if (menu.member.roles.cache.has(DarkScarlet.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Dark Scarlet" Role!**',ephemeral:true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${DarkScarlet.name}" Role Enjoy It.**`,
        ephemeral: true
      })
    
    }else if(menu.values[0] === "deepink"){
        menu.member.roles.remove(
            Red.id,
            Magenta.id,
            DeepCerise.id,
            Ruby.id,
            CrimsonGlory.id,
            PersianRed.id,
            DarkScarlet.id,
            Rose.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(DeepPink.id)
     if (menu.member.roles.cache.has(DeepPink.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Deep Pink" Role!**',ephemeral:true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${DeepPink.name}" Role Enjoy It.**`,
        ephemeral: true
      })
      
    }else if(menu.values[0] === "pered"){
        menu.member.roles.remove(
            Red.id,
            Magenta.id,
            DeepCerise.id,
            Ruby.id,
            CrimsonGlory.id,
            DeepPink.id,
            DarkScarlet.id,
            Rose.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(PersianRed.id)
     if (menu.member.roles.cache.has(PersianRed.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Persian Red" Role!**',ephemeral:true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${PersianRed.name}" Role Enjoy It.**`,
        ephemeral: true
      })
    
    }else if(menu.values[0] === "crig"){
        menu.member.roles.remove(
            Red.id,
            Magenta.id,
            DeepCerise.id,
            Ruby.id,
            PersianRed.id,
            DeepPink.id,
            DarkScarlet.id,
            Rose.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(CrimsonGlory.id)
     if (menu.member.roles.cache.has(CrimsonGlory.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Crimson Glory" Role!**',ephemeral:true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${CrimsonGlory.name}" Role Enjoy It.**`,
        ephemeral: true
      })
    
    }else if(menu.values[0] === "ruby"){
        menu.member.roles.remove(
            Red.id,
            Magenta.id,
            DeepCerise.id,
            CrimsonGlory.id,
            PersianRed.id,
            DeepPink.id,
            DarkScarlet.id,
            Rose.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(Ruby.id)
       if (menu.member.roles.cache.has(Ruby.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Ruby" Role!**',ephemeral:true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${Ruby.name}" Role Enjoy It.**`,
        ephemeral: true
      })
    
    }else if(menu.values[0] === "deepc"){
        menu.member.roles.remove(
            Red.id,
            Magenta.id,
            Ruby.id,
            CrimsonGlory.id,
            PersianRed.id,
            DeepPink.id,
            DarkScarlet.id,
            Rose.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(DeepCerise.id)
     if (menu.member.roles.cache.has(DeepCerise.id)) return menu.reply({content:'**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Deep Cerise" Role!**',ephemeral:true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${DeepCerise.name}" Role Enjoy It.**`,
        ephemeral: true
      })
    
    }else if(menu.values[0] === "mange"){
        menu.member.roles.remove(
            Red.id,
            DeepCerise.id,
            Ruby.id,
            CrimsonGlory.id,
            PersianRed.id,
            DeepPink.id,
            DarkScarlet.id,
            Rose.id,
            BakerMilkerPink.id,
            )
      menu.member.roles.add(Magenta.id)
     if (menu.member.roles.cache.has(Magenta.id)) return menu.reply({content: '**'+`${client.emotes.badage}| `+'You Are Is Already Have "ʳᵍᵇ Magenta" Role!**', ephemeral: true})
      menu.reply({
        content: `**${client.emotes.tick}| Gived You "${Magenta.name}" Role Enjoy It.**`,
        ephemeral: true
      })
    
    }
  }
  if(menu.customId === "set_prof_menu"){
    let homeButton = new MessageButton()
      .setCustomId("set_prof_button_home")
      .setEmoji(client.emotes.home)
      .setStyle("PRIMARY")
      .setLabel("Comming To HomePage")
   if(menu.values[0] === "gender"){
     menu.update({
       embeds: [CustomErrorEmbed(
         menu,
         'Setup Gender',
         "for setup your gender in roleplay just you need select your gender on the select menu",
         client.emotes.gender,
         client
       )],
       components: [GenderMenu(client)]
     })
   }else if(menu.values[0] === "job"){
    const content_map = (require('../../JSON/works_list.json')).map(i => '' + i + '').join(' , ')
    const content = '**```js\n' + content_map + '```**';
    menu.update({
      embeds: [CustomErrorEmbed(
        menu,
        'Setup Job',
        "**for setup your future job in roleplay just you need select your dream job on the select menu\nlist of jobs and some info about there:\n**"+ content,
        client.emotes.job,
        client
      )],
      components: [JobMenu(client)]
    })
   }else if(menu.values[0] === "name"){
    const filter = m =>  m.member.id == menu.member.id;
    menu.channel.awaitMessages(filter, {
      max: 1,
      time: 30000,
      errors: ["time"]
    })
    .then(collected => {
      let name = collected.first().content;
      if(name.length > 32)
        return menu.channel.send({
                 embeds: [errorEmbed(
                   menu,
                   "**bruh 😐, my brother are you write your name or a book??**",
                   client
                 )]
               });

      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your name setup to ```js\n" + name + "```.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
       db.set(`name_${menu.member.id}`, name)
      }).catch(() => null);
   }else if(menu.values[0] === "address"){
    const filter = m =>  m.member.id == menu.member.id;
    menu.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
      errors: ["time"]
    })
    .then(collected => {
      let address = collected.first().content;
      if(address.length > 100)
       return menu.channel.send({
                embeds: [errorEmbed(
                  menu,
                  "**bruh 😐, my brother are you write your address or a book??**",
                  client
                )]
              });

      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your addresses setup to ```js\n" + address + "```.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`address_${menu.member.id}`, address)
      }).catch(() => null);
   }else if(menu.values[0] === "age"){
    const filter = m =>  m.member.id == menu.member.id;
    menu.channel.awaitMessages(filter, {
      max: 1,
      time: 30000,
      errors: ["time"]
    })
    .then(collected => {
      let age = collected.first().content;
      if(isNaN(age)) return menu.channel.send("🚫 | The Amount Parameter Isn’t a Number! , You Can Used **Number** For Set Your Age")
      if (age > 100) return menu.channel.send('🛑 | Are You Legend?!\nNo One Can Alive This Much In World Else In Chinines');
      if (age < 5) return menu.channel.send('🛑 | My Friend You Are Not Baby!!');             
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your age setup to ```js\n"+age+"```.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`age_${menu.member.id}`, age)
      }).catch(() => null);
   }
  if(menu.customId === "job_menu"){
    if(menu.values[0] === "farmer"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Farmer`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Farmer")
    }else if(menu.values[0] === "officer"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Officer`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Officer")
    }else if(menu.values[0] === "mechanic"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Mechanic`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Mechanic")
    }else if(menu.values[0] === "minner"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Minner`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Minner")
    }else if(menu.values[0] === "worker"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Worker`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${message.member.id}`, "Worker")
    }else if(menu.values[0] === "solder"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Solder`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Solder")
    }else if(menu.values[0] === "hacker"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Hacker`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Hacker")
    }else if(menu.values[0] === "fisher"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Fisher`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Fisher")
    }else if(menu.values[0] === "doctor"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Doctor`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Doctor")
    }else if(menu.values[0] === "student"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your job setup to `Student`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`job_${menu.member.id}`, "Student")
    }
  }
  if(menu.customId === "gender_menu"){
    if(menu.values[0] === "girl"){
        menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your gender setup to `Girl`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
     db.set(`gender_${menu.member.id}`, "Girl")
    }else if(menu.values[0] === "boy"){
      menu.update({
        embeds: [successEmbed(
          menu,
          "successfully your gender setup to `Boy`.",
          client
        )],
        components: [NeedHelpButtons(client), homeButton]
      })
      db.set(`gender_${menu.member.id}`, "Boy")
     }
    }
  }
  }catch(e) {
    console.log(e)
      const btn_1 = new MessageButton()
      .setStyle('LINK')
      .setLabel('Invite Me')
      .setEmoji('🤖')
      .setURL(client.config.discord.invite)    
  const btn_2 = new MessageButton()
    .setStyle('LINK')
    .setLabel('Support Server!')
    .setEmoji('🧰')
    .setURL(`${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`) 
    const row_1 = new MessageActionRow()
    .addComponents([btn_1],[btn_2])
    return menu.reply({
            embeds: [new MessageEmbed()
              .setAuthor({
                name: `Requested by ` + menu.member.name,
                iconURL: menu.member.displayAvatarURL({ dynamic: true })
              })
              .setTitle(client.emotes.error + '| **We Got An Error**')
              .setColor(client.colors.none)
              .setDescription(`**we have a problem\n \`\`\`js\n${e}\`\`\`**`)
              .setFooter({
                text: "Error | created by Mr.SIN RE#1528",
                iconURL: menu.guild.iconURL({ dynamic: true })
              })],
            components: [row_1],
            ephemeral: false,
        }).then(menu.member.send({
          content: `Hi My Friend👋🏻\n if I've got an error or problem please report it for my developers😉\n you can join to support server and talk us:\n ${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,
          components: [row_1] 
            })
        );
    }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */