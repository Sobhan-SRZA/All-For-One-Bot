const db = require('quick.db');
const { MessageEmbed } = require("discord.js")
const { MessageMenuOption, MessageMenu,MessageButton, MessageActionRow } = require("discord-buttons")
const Discord = require('discord.js');

module.exports = async function(client, menu) {
    try {
let message = menu;
    let m = menu;
function epoch (date) {
  return Date.parse(date)
}
const dateToday =  new Date(); 
const TimeStampDate = epoch(dateToday) / 1000;
let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`modlog_${message.guild.id}`));
const prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;
//rolse-crated
            let Red;
            let dbRed = await db.fetch(`Red_${message.guild.id}`);
            let RedRole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Red")

            if (!message.guild.roles.cache.has(dbRed)) {
                Red = RedRole
            } else {
                Red = message.guild.roles.cache.get(dbRed)
            }

            if (!Red) {
                    Red = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Red",
                            color: "#ff0000",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                
            }

            let BakerMilkerPink;
            let dbBakerMilkerPink = await db.fetch(`BakerMilkerPink_${message.guild.id}`);
            let BakerMilkerPinkrole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Baker Milker Pink")

            if (!message.guild.roles.cache.has(dbBakerMilkerPink)) {
                BakerMilkerPink = BakerMilkerPinkrole
            } else {
                BakerMilkerPink = message.guild.roles.cache.get(dbBakerMilkerPink)
            }

            if (!BakerMilkerPink) {
                    BakerMilkerPink = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Baker Milker Pink",
                            color: "#ff91af",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
            }


            let Rose;
            let dbRose = await db.fetch(`Rose_${message.guild.id}`);
            let Roserole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Rose")
            if (!message.guild.roles.cache.has(dbRose)) {
                Rose = Roserole
            } else {
                Rose = message.guild.roles.cache.get(dbRose)
            }
            if (!Rose) {
                    Rose = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Rose",
                            color: "#ffb6c1",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                } 

            let DarkScarlet;
            let dbDarkScarlet = await db.fetch(`DarkScarlet_${message.guild.id}`);
            let DarkScarletrole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Dark Scarlet")
            if (!message.guild.roles.cache.has(dbDarkScarlet)) {
                DarkScarlet = DarkScarletrole
            } else {
                DarkScarlet = message.guild.roles.cache.get(dbDarkScarlet)
            }
            if (!DarkScarlet) {
                    DarkScarlet = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Dark Scarlet",
                            color: "#560319",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                } 



            let DeepPink;
            let dbDeepPink = await db.fetch(`DeepPink_${message.guild.id}`);
            let DeepPinkrole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Deep Pink")
            if (!message.guild.roles.cache.has(dbDeepPink)) {
                DeepPink = DeepPinkrole
            } else {
                DarkScarlet = message.guild.roles.cache.get(dbDeepPink)
            }
            if (!DeepPink) {
                    DeepPink = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Deep Pink",
                            color: "#ff1493",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                } 


           let PersianRed;
            let dbPersianRed = await db.fetch(`PersianRed_${message.guild.id}`);
            let PersianRedrole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Persian Red")
            if (!message.guild.roles.cache.has(dbPersianRed)) {
                PersianRed = PersianRedrole
            } else {
                DarkScarlet = message.guild.roles.cache.get(dbPersianRed)
            }
            if (!PersianRed) {
                    PersianRed = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Persian Red",
                            color: "#c04c77",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                } 

           let CrimsonGlory;
            let dbCrimsonGlory = await db.fetch(`CrimsonGlory_${message.guild.id}`);
            let CrimsonGloryrole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Crimson Glory")
            if (!message.guild.roles.cache.has(dbCrimsonGlory)) {
                CrimsonGlory = CrimsonGloryrole
            } else {
                DarkScarlet = message.guild.roles.cache.get(dbCrimsonGlory)
            }
            if (!CrimsonGlory) {
                    CrimsonGlory = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Crimson Glory",
                            color: "#be0032",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                } 

           let Ruby;
            let dbRuby = await db.fetch(`Ruby_${message.guild.id}`);
            let Rubyrole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Ruby")
            if (!message.guild.roles.cache.has(dbRuby)) {
                Ruby = Rubyrole
            } else {
                DarkScarlet = message.guild.roles.cache.get(dbRuby)
            }
            if (!Ruby) {
                    Ruby = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Ruby",
                            color: "#e0115f",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                } 

           let DeepCerise;
            let dbDeepCerise = await db.fetch(`DeepCerise_${message.guild.id}`);
            let DeepCeriserole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Deep Cerise")
            if (!message.guild.roles.cache.has(dbDeepCerise)) {
                DeepCerise = DeepCeriserole
            } else {
                DeepCerise = message.guild.roles.cache.get(dbDeepCerise)
            }
            if (!DeepCerise) {
                    DeepCerise = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Deep Cerise",
                            color: "#da3287",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                } 

           let Magenta;
            let dbMagenta = await db.fetch(`Magenta_${message.guild.id}`);
            let Magentarole = message.guild.roles.cache.find(r => r.name === "ʳᵍᵇ Magenta")
            if (!message.guild.roles.cache.has(dbMagenta)) {
                Magenta = Magentarole
            } else {
                DarkScarlet = message.guild.roles.cache.get(dbMagenta)
            }
            if (!Magenta) {
                    Magenta = await message.guild.roles.create({
                        data: {
                            name: "ʳᵍᵇ Magenta",
                            color: "#ff00ff",
                            permissions: []
                        }
                    }).then(role => {
    const HighestRole = message.guild.me.roles.highest; // Your bot's highest role in the Guid.

role.setPosition(HighestRole.position - 1)
                  })
                } 



//color menu options
   let Role1 = new MessageMenuOption()
    .setLabel("ʳᵍᵇ Red")
    .setValue("red")
    .setDescription("Dadane Role ʳᵍᵇRed")
    .setDefault()
    .setEmoji("944203817455616010")
    
   let Role2 = new MessageMenuOption()
    .setLabel("ʳᵍᵇ Baker Milker Pink")
    .setValue("mipink")
    .setDescription("Dadane Role ʳᵍᵇBaker Milker Pink")
    .setDefault()
    .setEmoji("944205013314584606")

   let Role3 = new MessageMenuOption()
    .setLabel("ʳᵍᵇ Rose")
    .setValue("rose")
    .setDescription("Dadane Role ʳᵍᵇRose")
    .setDefault()
    .setEmoji("944205256567431178")

    let Role4 = new MessageMenuOption()
    .setLabel("ʳᵍᵇ Dark Scarlet")
    .setValue("scarlet")
    .setDescription("Dadane Role ʳᵍᵇDark Scarlet")
    .setDefault()
    .setEmoji("944205492991950898")
    
    let Role5 = new MessageMenuOption()
    .setLabel("ʳᵍᵇDeep Pink")
    .setValue("deepink")
    .setDescription("Dadane Role ʳᵍᵇDeep Pink")
    .setDefault()
    .setEmoji("944221718015275058")

    let Role6 = new MessageMenuOption()
    .setLabel("ʳᵍᵇPersian Red")
    .setValue("pered")
    .setDescription("Dadane Role ʳᵍᵇPersian Red")
    .setDefault()
    .setEmoji("944221990582091856")

    let Role7 = new MessageMenuOption()
    .setLabel("ʳᵍᵇCrimson Glory")
    .setValue("crig")
    .setDescription("Dadane Role ʳᵍᵇCrimson Glory")
    .setDefault()
    .setEmoji("944228515522416640")

    let Role8 = new MessageMenuOption()
    .setLabel("ʳᵍᵇRuby")
    .setValue("ruby")
    .setDescription("Dadane Role ʳᵍᵇRuby")
    .setDefault()
    .setEmoji("944232061722566686")

    let Role9 = new MessageMenuOption()
    .setLabel("ʳᵍᵇDeep Cerise")
    .setValue("deepc")
    .setDescription("Dadane Role ʳᵍᵇDeep Cerise")
    .setDefault()
    .setEmoji("944232637977985034")

    let Role10 = new MessageMenuOption()
    .setLabel("ʳᵍᵇMagenta")
    .setValue("mange")
    .setDescription("Dadane Role ʳᵍᵇMagenta")
    .setDefault()
    .setEmoji("944233852891725844")

   let Menu = new MessageMenu()
    .setID("menu")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("🎨|Baraie Gereftan Role Rang Click Konid !!")
    .addOption(Role1)
    .addOption(Role2)
    .addOption(Role3)
    .addOption(Role4)
    .addOption(Role5)
    .addOption(Role6)
    .addOption(Role7)
    .addOption(Role8)
    .addOption(Role9)
    .addOption(Role10)

  let RoleMenu = new MessageActionRow()
     .addComponents(Menu)
//color menu embed
let ColorEmbed = new MessageEmbed()
 .setColor(`#2F3136`)
 .setAuthor(`Auto Color Role Giver`)
 .setTitle(`🎨 | Color Menu Message👨🏻‍🎨`)
 .setDescription(`This is a color role giver in menu message for you :)\n you can click the menu onther this message to select your colo role ;) \n then bot automaticer give your color role👌🏻 \n that was easy 🗿`)
 .setFooter(`Menu In ${message.guild.name} | ${message.guild.id} `,message.guild.iconURL({ dynamic: true }))
.setImage(`https://media.discordapp.net/attachments/912596015624884234/921162727362265148/IMG_2704.gif`)
 .setTimestamp()
// select menu setting
if(m.values[0] === "bior"){
  return m.reply.send('**soon!**',true)
}else
if(m.values[0] === "gar"){
  return m.reply.send('**soon!**',true)
}else
if(m.values[0] === "cor"){
  return m.reply.send(ColorEmbed,{
 // embed: ColorEmbed,
  components: RoleMenu
},true)
 }else
  
if(m.values[0] === "red"){
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.add(Red.id)

  if (m.clicker.member.roles.cache.has(Red.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Red" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Red" be shoma dade shod`,true)

}else if(m.values[0] === "mipink"){
  m.clicker.member.roles.remove(Red.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.add(BakerMilkerPink.id)
 if (m.clicker.member.roles.cache.has(BakerMilkerPink.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Baker Milker Pink" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Baker Milker Pink" be shoma dade shod`,true)

}else if(m.values[0] === "rose"){
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.add(Rose.id)
 if (m.clicker.member.roles.cache.has(Rose.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Rose" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Rose" be shoma dade shod`,true)

} else if(m.values[0] === "scarlet"){
  m.clicker.member.roles.remove(Red.id)
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.add(DarkScarlet.id)
 if (m.clicker.member.roles.cache.has(DarkScarlet.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Dark Scarlet" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Dark Scarlet" be shoma dade shod`,true)

}else if(m.values[0] === "deepink"){
  m.clicker.member.roles.remove(Red.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.add(DeepPink.id)
 if (m.clicker.member.roles.cache.has(DeepPink.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Deep Pink" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Deep Pink" be shoma dade shod`,true)
  
}else if(m.values[0] === "pered"){
  m.clicker.member.roles.remove(Red.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.add(PersianRed.id)
 if (m.clicker.member.roles.cache.has(PersianRed.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Persian Red" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Persian Red" be shoma dade shod`,true)

}else if(m.values[0] === "crig"){
  m.clicker.member.roles.remove(Red.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.add(CrimsonGlory.id)
 if (m.clicker.member.roles.cache.has(CrimsonGlory.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Crimson Glory" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Crimson Glory" be shoma dade shod`,true)

}else if(m.values[0] === "ruby"){
  m.clicker.member.roles.remove(Red.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.add(Ruby.id)
   if (m.clicker.member.roles.cache.has(Ruby.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Ruby" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Ruby" be shoma dade shod`,true)

}else if(m.values[0] === "deepc"){
  m.clicker.member.roles.remove(Red.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.add(DeepCerise.id)
 if (m.clicker.member.roles.cache.has(DeepCerise.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Deep Cerise" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Deep Cerise" be shoma dade shod`,true)

}else if(m.values[0] === "mange"){
  m.clicker.member.roles.remove(Red.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.add(Magenta.id)
 if (m.clicker.member.roles.cache.has(Magenta.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Magenta" Role!**',true)
  m.reply.send(`role "ʳᵍᵇ Magenta" be shoma dade shod`,true)

}

    } catch (err) {
        console.log(err)
    }  
}