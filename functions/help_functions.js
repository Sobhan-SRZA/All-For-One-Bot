const {
 Client,
 Collection,
 Intents,
 MessageActionRow,
 MessageButton,
 Permissions,
 MessageEmbed,
 MessageSelectMenu,  
} = require("discord.js");
const clc = require("cli-color");
module.exports = {
fun_help_menu: async function (client) {
 const menu = new MessageSelectMenu()
 .setCustomId("funhelp_menu")
 .setMaxValues(1)
 .setMinValues(1)
 .setPlaceholder(client.emotes.gender+"| Click me to set your Gender")
 .addOptions([
       {
         label: 'Voice',
         value: 'voice',
         description: 'send Voice category commands',
         emoji: {
           name: client.emotes.voice,
         },
     },
     {
         label: 'Image',
         value: 'image',
         description: 'send Image category commands',
         emoji: {
           name: client.emotes.image,
         },
     },
     {
       label: 'Minigame',
       value: 'minigame',
       description: 'send Minigame category commands',
       emoji: {
         name: client.emotes.game,
       },
     },
     {
       label: 'Economy',
       value: 'roleplay',
       description: 'send Economy category commands',
       emoji: {
         name: client.emotes.mask,
       },
     }
   ])
   const row = new MessageActionRow()
    .addComponents(menu)
    .type('SELECT_MENU')
 return row
 },
 NeedHelpButtons: async function (client){   
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
    const row = new MessageActionRow()
    .addComponents([btn_1],[btn_2])
    return row;
  },
  commandsData: async function(commands, prefix){
    const content = commands.map(i => '`' + prefix + i.name + '`').join(' , ')
    let returned = '**' + content + '**';
    return returned
  },
  JobMenu: async function(client){
    const menu = new MessageSelectMenu()
    .setCustomId("job_menu")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder(client.emotes.gender+"| Click me to set your Gender")
    .addOptions([
      {
        label: 'Farmer',
        value: 'farmer',
        description: 'this job for farme some plants🌱',
        emoji: {
          name: client.emotes.farmer,
        },
    },
    {
      label: 'Officer',
      value: 'officer',
      description: 'this job is police officer🧢',
      emoji: {
        name: client.emotes.officer,
      },
    },
    {
      label: 'Mechanic',
      value: 'mechanic',
      description: 'this job make & remake the items🧰',
      emoji: {
        name: client.emotes.mechanic,
      },
    },
    {
      label: 'Minner',
      value: 'minner',
      description: 'this job for mine stone & ores💎',
      emoji: {
        name: client.emotes.minner,
      },
    },
    {
      label: 'Worker',
      value: 'worker',
      description: 'this job for woking in office or apartment👨🏻‍💼',
      emoji: {
        name: client.emotes.worker,
      },
    },
    {
      label: 'Solder',
      value: 'solder',
      description: 'this job for protect the islanl🚨',
      emoji: {
        name: client.emotes.solder,
      },
    },
    {
      label: 'Hacker',
      value: 'hacker',
      description: 'this job for protect islanl from network📡',
      emoji: {
        name: client.emotes.hacker,
      },
    },
    {
      label: 'Fisher',
      value: 'fisher',
      description: 'in this job you wana fishing🐟',
      emoji: {
        name: client.emotes.fisher,
      },
    },
    {
      label: 'Doctor',
      value: 'doctor',
      description: 'this job for protect people from virus🦠',
      emoji: {
        name: client.emotes.doctor,
      },
    },
    {
      label: 'Student',
      value: 'student',
      description: 'this job for study for وظارت  آموزش و پرورش📚',
      emoji: {
        name: client.emotes.student,
      },
    },

    ])
    const row = new MessageActionRow()
    .addComponents(menu)
  return row;
  },
  GenderMenu: async function(client){
    const row = new MessageActionRow()
    .addComponents([
      new MessageSelectMenu()
        .setCustomId("gender_menu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder(client.emotes.gender+"| Click me to set your Gender")
        .addOptions([
            {
              label: 'Girl',
              value: 'girl',
              description: 'set gender to Girl',
              emoji: {
                name: client.emotes.girl,
              },
          },
          {
              label: 'Boy',
              value: 'boy',
              description: 'set gender to Boy',
              emoji: {
                name: client.emotes.boy,
              },
          },
        ])
    ])
  return row;
  },
  NeedHelpMenu: async function(client){
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
    //.setComponents(btn_1,btn_2)
  return row;
  },
  HelpCategoryEmbed: async function(commands, CategoryName, client, message, prefix){
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
    return embed;
  },
  profMenu: async function(client){
    const menu = new MessageSelectMenu()
       .setPlaceholder(`${client.emotes.profile}| Click Me Setup Your Profile`)
       .setCustomId("set_prof_menu")
       .setMaxValues(1)
       .setMinValues(1)
       .addOptions([
          {
            label: 'Set Your Gender',
            value: 'gender',
            description: 'sets your gender in island😊',
            emoji: {
              name: client.emotes.gender,
            },
          },
          {
             label: 'Set Your Jop',
             value: 'job',
             description: 'sets your job in island💼',
             emoji: {
               name: '💼',
             },
           },               
           {
             label: 'Set Your Name',
             value: 'name',
             description: 'send your name for set in island🥂',
             emoji: {
               name: '👨🏻‍💼',
             },
           },
           {
             label: 'Set Your Age',
             value: 'age',
             description: 'sets your ages in island🎂',
             emoji: {
               name: '🎂',
             },
           },
           {
             label: 'Set Your Address',
             value: 'address',
             description: 'sets your address in island🏠',
             emoji: {
               name: '🏡',
             },
           }
        ])
     return menu
  },
  profEmbed: async function(client, message){
    let embed = new MessageEmbed()
    .setColor(client.colors.none)
    .setAuthor({
       name: `Creating Account For ${message.member.name} In Ildia Island${client.emotes.island}`,
       iconURL: message.member.displayAvatarURL({ dynamic: true })
    })
    .setFooter({
       text: `welcome to Ildia Island${client.emotes.island}\n Created by Mr.SIN RE#1528\nGuild: ${message.guild.name}`,
       iconURL: message.guild.iconURL({ dynamic: true })
    })
    .addFields(
       {
        name: `> Name:`,
        value: `\`your name\``,
        inline: true
       },
       {
        name: `> Age:`,
        value: `\`your age\``,
        inline: true
       },
       {
        name: `> Gender:`,
        value: `\`your gender\``,
        inline: true
       },
       {
        name: `> Job:`,
        value: `\`your dream job\``,
        inline: true
       },
       {
        name: `> Address:`,
        value: `\`your home or work addresses\``,
        inline: true
       },
       {
        name: `> Sex:`,
        value: `\`your sex is defualt is \`**SINGLE**`,
        inline: true
       },
    )
    .setTitle(`**${client.emotes.profile}| Setup The User Profile In \`Ildia\`**`)
    .setTimestamp()
    .setThumbnail(require('../assets/pictures/ildia.jpg'))
    .setImage(require('../assets/pictures/ildia_map.jpg'))
    .setDescription(`**Hi 👋🏻\nhere a island in far far way from your home.\nif you wana alive here you have to work and catch some money${client.emotes.money}\nwe got some jobs for you but we need some information about yourself, also I'm here to write your information in system.\nThis informations we need to tell us:\n\n**`)
    return embed
  },
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/