const {
 MessageEmbed
} = require(`discord.js`);
module.exports = {
 name: "setcustomcommand",
 cooldown: 5,
 aliases: ["setupcustomcommand", "set-custom-cmd", "setcmd", "setup-customcommand", "setupcustomcommands", "customcommand-setup", "setup-customcommands"],
 category: 'Setup 💻',
 usage: "setup-customcommand  --> Follow the Steps",
 description: "Define Custom Commands, Create Custom Commands and Remove Custom Commands --> \"Custom Command Names, that sends Custom Messages\"",
async execute(client, message, args) { 
   var es = client.settings.get(message.guild.id, "embed")
   try {
     var originalowner = message.author.id;
     var timeouterror = false;
     var filter = (reaction, user) => {
       return user.id === message.author.id;
     };
     var temptype = ""
     var tempmsg;
     let cuc = client.db.get(`custom_commands_${message.guild.id}`);
     tempmsg = await message.channel.send(new MessageEmbed()
       .setTitle("What do you want to do?")
       .setColor(es.color)
       .setThumbnail(es.thumb ? es.footericon : null)
       .setDescription(`1️⃣ **== Add** a Custom Command\n\n2️⃣ **== Remove** a Custom Command\n\n3️⃣ **== Show** the Custom Command\n\n📑 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*`)
       .setFooter(es.footertext, es.footericon)
     )
     try {
       tempmsg.react("1️⃣");
       tempmsg.react("2️⃣");
       tempmsg.react("3️⃣");
       tempmsg.react("📑");
     } catch (e) {
       return message.reply(new MessageEmbed()
         .setTitle("❌ Missing Permission to add Reactions")
         .setColor(es.wrongcolor)
         .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``.substr(0, 2000))
         .setFooter(es.footertext, es.footericon)
       );
     }
     await tempmsg.awaitReactions(filter, {
         max: 1,
         time: 120000,
         errors: ["time"]
       })
       .then(async collected => {
         var reaction = collected.first()
         reaction.users.remove(message.author.id)
         if (reaction.emoji.name === "1️⃣") temptype = "add"
         else if (reaction.emoji.name === "2️⃣") temptype = "remove"
         else if (reaction.emoji.name === "3️⃣") temptype = "show"
         else if (reaction.emoji.name === "📑") temptype = "thesettings"
         else throw "You reacted with a wrong emoji"
       })
       .catch(e => {
         timeouterror = e;
       })
     if (timeouterror)
       return message.reply(new MessageEmbed()
         .setTitle("❌ Your Time ran out")
         .setColor(es.wrongcolor)
         .setDescription(`Cancelled the Operation!`.substr(0, 2000))
         .setFooter(es.footertext, es.footericon)
       );


     if (temptype == "add") {
       if(cuc.length > 19)
         return message.reply(new MessageEmbed()
           .setTitle("❌ You've reached the maximum Custom Commands Amount!")
           .setColor(es.wrongcolor)
           .setDescription(`You cannot have more then **20** Custom Commands`.substr(0, 2000))
           .setFooter(es.footertext, es.footericon)
         );
       tempmsg = await tempmsg.edit({embed: new MessageEmbed()
         .setTitle("What Custom Command do you wanna add?")
         .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
         .setDescription(`Please type the Command name **without** the Prefix:\nExample if you wanna get a \`!socials\` command send \`socials\``)
         .setFooter(es.footertext, es.footericon)
       })
       await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
           max: 1,
           time: 120000,
           errors: ["time"]
         })
         .then(async collected => {
           var msg = collected.first().content.split(" ")[0];
           if (msg) {
               var thecustomcommand = {
                 name: msg,
                 output: "ye",
                 embed: false,
               }
             tempmsg = await message.channel.send(new MessageEmbed()
               .setTitle("What Should the Custom Command send?")
               .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
               .setDescription(`Please just type the content in the Chat\nExample: \`Discord Server: https://discord.gg/zwBRBu7WHW\``)
               .setFooter(es.footertext, es.footericon)
             )
             await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                 max: 1,
                 time: 120000,
                 errors: ["time"]
               })
               .then(async collected => {
                 var msg = collected.first().content;
                 if (msg) {
                     thecustomcommand.output = msg;
                     var ttempmsg = await message.channel.send(new MessageEmbed()
                       .setTitle("Should I send it as an EMBED or as an MESSAGE")
                       .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                       .setDescription(`React with ✅ to send it as an Embed\n\nReact with ❌ to just send it as a normal Message`)
                       .setFooter(es.footertext, es.footericon)
                     )
                     try{
                       ttempmsg.react("✅")
                       ttempmsg.react("❌")
                     }catch{

                     }
                     await ttempmsg.awaitReactions((reaction, user) => user == originalowner, {
                         max: 1,
                         time: 90000,
                         errors: ["time"]
                       })
                       .then(collected => {
                         var reaction = collected.first();
                         if (reaction) {
                           console.log(reaction)
                           if(reaction.emoji.name == "✅") {
                             thecustomcommand.embed = true;
                           } else {
                             thecustomcommand.embed = false;
                           }
                           client.db.push(`custom_commands_${message.guild.id}`, thecustomcommand)
                           message.channel.send(new MessageEmbed()
                             .setTitle(`Success ${thecustomcommand.name} has successfully been created!`)
                             .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                             .setDescription(`This is how it will look like:`)
                             .setFooter(es.footertext, es.footericon)
                           )

                           if(reaction.emoji.name == "✅") {
                             message.channel.send(new MessageEmbed()
                               .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                               .setDescription(thecustomcommand.output)
                               .setFooter(es.footertext, es.footericon)
                             )
                           } else {
                             message.channel.send(thecustomcommand.output)
                           }
                           
             
                         } else {
                           throw "you didn't ping a valid Channel"
                         }
                       })
                       .catch(e => {
                         timeouterror = e;
                       })
                     if (timeouterror)
                       return message.reply(new MessageEmbed()
                         .setTitle("❌ Your Time ran out")
                         .setColor(es.wrongcolor)
                         .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                         .setFooter(es.footertext, es.footericon)
                       );

                 } else {
                   throw "you didn't ping a valid Channel"
                 }
               })
               .catch(e => {
                 timeouterror = e;
               })
             if (timeouterror)
               return message.reply(new MessageEmbed()
                 .setTitle("❌ Your Time ran out")
                 .setColor(es.wrongcolor)
                 .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                 .setFooter(es.footertext, es.footericon)
               );


           } else {
             throw "you didn't ping a valid Channel"
           }
         })
         .catch(e => {
           timeouterror = e;
         })
       if (timeouterror)
         return message.reply(new MessageEmbed()
           .setTitle("❌ Your Time ran out")
           .setColor(es.wrongcolor)
           .setDescription(`Cancelled the Operation!`.substr(0, 2000))
           .setFooter(es.footertext, es.footericon)
         );

     } else if (temptype == "remove") {
       var embed = new MessageEmbed()
       .setTitle("Which Custom Command do you wanna remove?")
       .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
       .setFooter("REACT with the EMOJI for the RIGHT Command, you wanna REMOVE", es.footericon)
       const emojis = {
         "0" : "1️⃣", "1" : "2️⃣", "2" : "3️⃣", "3" : "4️⃣", "4" : "5️⃣",
         "5" : "6️⃣", "6" : "7️⃣", "7" : "8️⃣", "8" : "9️⃣", "9" : "🔟",
       }
       const emojisinverted = {
         "1️⃣" : "0", "2️⃣" : "1", "3️⃣" : "2", "4️⃣" : "3", "5️⃣" : "4",
         "6️⃣" : "5", "7️⃣" : "6", "8️⃣" : "7", "9️⃣" : "8", "🔟" : "9",
       }
       const emojiarray = [
         "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣",
         "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟",
       ]
       for(let i = 0; i< cuc.length; i++){
         try{
           var string = `${cuc[i].output}`;
           if(string.length > 250) string = string.substr(0, 250) + " ..."
           embed.addField(`**${emojis[String(i)]}.** \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> " + string)
         }catch (e){
           console.log(e)
         }
       }

       tempmsg = await tempmsg.edit({embed: embed})
       
       for(let i = 0; i < cuc.length; i++){
         if(i < 3) continue;
         await tempmsg.react(emojiarray[i])
       }

       await tempmsg.awaitReactions((reaction, user)=> user.id == originalowner, {
           max: 1,
           time: 120000,
           errors: ["time"]
         })
         .then(collected => {
           var reaction = collected.first();
           if (reaction) {
             var thecmd = cuc[emojisinverted[reaction.emoji.name]]
             try {
               client.db.remove(`custom_commands_${message.guild.id}`, thecmd)
               return message.reply(new MessageEmbed()
                 .setTitle(`<a:yes:833101995723194437> I successfully deleted \`${thecmd.name}\`!`)
                 .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                 .setFooter(es.footertext, es.footericon)
               );
             } catch (e) {
               return message.reply(new MessageEmbed()
                 .setTitle("❌ Something went wrong, please contact: `BROKARONAGAMING#9999`")
                 .setColor(es.wrongcolor)
                 .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
                 .setFooter(es.footertext, es.footericon)
               );
             }
           } else {
             throw "you didn't ping a valid Channel"
           }
         })
         .catch(e => {
           timeouterror = e;
         })
       if (timeouterror)
         return message.reply(new MessageEmbed()
           .setTitle("❌ Your Time ran out")
           .setColor(es.wrongcolor)
           .setDescription(`Cancelled the Operation!`.substr(0, 2000))
           .setFooter(es.footertext, es.footericon)
         );
     } else if (temptype == "show") {
         var embed = new MessageEmbed()
         .setTitle("Custom Commands")
         .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
         .setFooter(ee.footertext, es.footericon)

         for(let i = 0; i< cuc.length; i++){
           try{
             var string = `${cuc[i].output}`;
             if(string.length > 250) string = string.substr(0, 250) + " ..."
             embed.addField(`<:arrow:832598861813776394> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> "+ string)
           }catch (e){
             console.log(e)
           }
         }
         tempmsg = await tempmsg.edit({embed: embed})
     } else if (temptype == "thesettings") {
       var embed = new MessageEmbed()
       .setTitle("📑 Settings of the Custom Commands")
       .setDescription(`**Amount: \`${client.customcommands.get(message.guild.id, "commands").length}\`**`)
       .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
       .setFooter(ee.footertext, es.footericon)

       for(let i = 0; i< cuc.length; i++){
         try{
           var string = `${cuc[i].output}`;
           if(string.length > 50) string = string.substr(0, 50) + " ..."
           embed.addField(`<:arrow:832598861813776394> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> "+ string)
         }catch (e){
           console.log(e)
         }
       }
       tempmsg = await tempmsg.edit({embed: embed})
     } else {
       return message.reply(new MessageEmbed()
         .setTitle("❌ PLEASE CONTACT `Tomato#6966`")
         .setColor(es.wrongcolor)
         .setFooter(es.footertext, es.footericon)
       );
     }

   } catch (e) {
     console.log(String(e.stack).bgRed)
     return message.channel.send(new MessageEmbed()
       .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
       .setTitle(`❌ Something went Wrong`)
       .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
     );
   }
 },
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/