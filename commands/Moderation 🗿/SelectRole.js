const { MessageEmbed } = require("discord.js")
const { MessageMenuOption, MessageMenu,MessageButton, MessageActionRow } = require("discord-buttons")
const db = require("quick.db")
module.exports = {
    name: "selectrole",
    cooldown: 5,
    aliases: ["slr","sr","role"],
    category: 'Moderation 🗿',
    utilisation: '{prefix}selectrole',
    description: "send selection role in channel forVgive role",
  async execute(client, message, args) {
   if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Dont Have Permmissions To Role Give Someone! - [ADMINISTRATOR]**");

   if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("**I Don't Have Permissions To Role Someone! - [ADMINISTRATOR]**")
   let time = 4000;
   var prefix = await require("quick.db").fetch(`prefix_${message.guild.id}`)||process.env.PREFIX;



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
                    })
                } 



//functions
client.on("clickMenu", async m => {
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

  if (m.clicker.member.roles.cache.has(Red.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Red" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Red" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

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
 if (m.clicker.member.roles.cache.has(BakerMilkerPink.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Baker Milker Pink" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Baker Milker Pink" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

}else if(m.values[0] === "rose"){
  m.clicker.member.roles.remove(BakerMilkerPink.id)
  m.clicker.member.roles.remove(Rose.id)
  m.clicker.member.roles.remove(PersianRed.id)
  m.clicker.member.roles.remove(DarkScarlet.id)
  m.clicker.member.roles.remove(Magenta.id)
  m.clicker.member.roles.remove(DeepCerise.id)
  m.clicker.member.roles.remove(DeepPink.id)
  m.clicker.member.roles.remove(Ruby.id)
  m.clicker.member.roles.remove(CrimsonGlory.id)
  m.clicker.member.roles.add(Rose.id)
 if (m.clicker.member.roles.cache.has(Rose.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Rose" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  }) 
  m.reply.send(`role "ʳᵍᵇ Rose" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

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
 if (m.clicker.member.roles.cache.has(DarkScarlet.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Dark Scarlet" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Dark Scarlet" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

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
 if (m.clicker.member.roles.cache.has(DeepPink.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Deep Pink" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Deep Pink" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

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
 if (m.clicker.member.roles.cache.has(PersianRed.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Persian Red" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Persian Red" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

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
 if (m.clicker.member.roles.cache.has(CrimsonGlory.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Crimson Glory" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Crimson Glory" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

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
   if (m.clicker.member.roles.cache.has(Ruby.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Ruby" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Ruby" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

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
 if (m.clicker.member.roles.cache.has(DeepCerise.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Deep Cerise" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Deep Cerise" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

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
 if (m.clicker.member.roles.cache.has(Magenta.id)) return m.reply.send('**User Is Already Have "ʳᵍᵇ Magenta" Role!**',true).then(msg => {
  msg.delete({timeout: time})
  })
  m.reply.send(`role "ʳᵍᵇ Magenta" be <@${m.clicker.id}> dade shod`,true).then(msg => {
  msg.delete({timeout: time})
  })

}

})



   let option1 = new MessageMenuOption()
    .setLabel("Color Roles")
    .setValue("cor")
    .setDescription("Dadane Role Haie Rang")
    .setDefault()
    .setEmoji("🎨")
    
   let option2 = new MessageMenuOption()
    .setLabel("Game Roles")
    .setValue("gar")
    .setDescription("Dadane Role Haie Game")
    .setDefault()
    .setEmoji("🎮")

   let option3 = new MessageMenuOption()
    .setLabel("Biography Roles")
    .setValue("bior")
    .setDescription("Dadane Role Haie Biography")
    .setDefault()
    .setEmoji("🎭")
    

   let selection = new MessageMenu()
    .setID("selection")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("🎪|Baraie Gereftan Role Click Konid !!")
    .addOption(option1)
    .addOption(option2)
    .addOption(option3)
  
    let help = new MessageEmbed()
      help.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      help.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      help.setTitle(`${client.user.username} Select Roles :)`)
      help.setDescription(``)
      help.setURL('https://discord.gg/vgnhGXabNw')
      help.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      help.setColor("RANDOM")
      help.addField('**Select Roles**', `\`select onder this message\``, false)
 let btn2 = new MessageButton()
    .setStyle('url') 
    .setLabel('🤖Invite Bot') 
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=1644972474359&scope=bot%20applications.commands`)
     let btn1 = new MessageButton()
    .setStyle('url') 
    .setLabel('🦾Server Support') 
    .setURL(`https://discord.gg/5GYNec4urW`)
   
  // let menumsg = await message.channel.send({ embed: help,button: [btn1,btn2], components: selection })
   let menumsg = await message.channel.send(help,selection,{button: [btn1,btn2]} )

function menuselection(menu) {
  switch(menu.values[0]) {
    case "bior":
          menu.reply.send("soon!", true)
    break;
    case "gar":
          menu.reply.send("soon!", true)
    break;
    case "cor":
          menu.reply.send("baraie entekhab role haie rang khod click konid",{
  components: RoleMenu
}, true)
    break;

   
  }
}

client.on("clickMenu", (menu) => {
  if (menu.message.id == menumsg.id){
    if (menu.clicker.user.id) menuselection(menu)
  }
})

  


  }
}
