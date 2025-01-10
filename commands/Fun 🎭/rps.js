const {
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');
const { 
  CustomErrorEmbed, errorEmbed 
} = require('../../functions/functions');
const db = require("quick.db");
module.exports = {
    name: 'rps',
    aliases: ['skg','rock-paper-scissors','rockpaperscissors','sang-kaghaz-geichy','sangkaghazgeichy'],
    category: 'Fun 🎭 | Minigame',
    description: "playing rps with users or bot.",
    usage: "[name | nickname | mention | ID]",  
  async execute(client, message, args, prefix) { 
    let collector_timer = 1000 * 10 * 6
    let botPick;
    let botChose;
    let playerScore = 0;
    let botScore = 0;
    let rock = ":fist: Rock";
    let paper = ":hand_splayed: Paper";
    let scissor = ":v: Scissors";
    let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let rockButton = new MessageButton().setCustomId("rock").setStyle("SECONDARY").setEmoji("✊🏻").setLabel("Rock")
    let paperButton = new MessageButton().setCustomId("paper").setStyle("PRIMARY").setEmoji("🖐🏻").setLabel("Paper")
    let scissorButton = new MessageButton().setCustomId("scissor").setStyle("DANGER").setEmoji("✌🏻").setLabel("Scissors")
    let endButton = new MessageButton().setCustomId("end").setStyle("DANGER").setEmoji(client.emotes.entry).setLabel("Ended").setDisabled(true)
    let row = new MessageActionRow().addComponents([rockButton],[paperButton],[scissorButton])
    let end_row = new MessageActionRow().addComponents([endButton])

        if(Member){
          let embed = new MessageEmbed()
            .setAuthor({
              name: `RPS Battle With ${message.member.tag} and ${Member.user.tag}`,
              iconURL: Member.user.displayAvatarURL({ dynamic: true })
            })
            .setColor(client.colors.none)
            .setFooter({
              text: `Request Playing RPS By ${message.member.tag}`,
              iconURL: message.member.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()
            .setTitle(`${client.emotes.rps}| RPS Battle YOYO!!`)
            .setDescription(`**so we got two players. if you are ready press button and I start battle for you.\n<@${Member.user.id}>, Are you ready to playing??\n(if you ready press _"yes"_ button or if not press _"no"_ button.)**`)

          let btn_yes = new MessageButton()
            .setCustomId('yes')
            .setEmoji(client.emotes.tick)
            .setStyle('SUCCESS')
            .setLabel('Yes')
          let btn_no = new MessageButton()
            .setCustomId('no')
            .setEmoji(client.emotes.x)
            .setStyle('DANGER')
            .setLabel('No')
          let row = new MessageActionRow()
            .addComponents([btn_yes],[btn_no])
          
            message.reply({
              embeds: [embed],
              components: [row]
            }).then((msg) => {
            let collector = msg.createMessageComponentCollector({
                              filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id && i.member.id === message.member.id | Member.id,
                              time: collector_timer
                            });
            collector.on('collect', async (button)=> {
                if(button.customId === 'yes'){
                  let embed = new MessageEmbed()
                    .setAuthor({
                      name: `RPS Battle With ${message.member.tag} and ${Member.user.tag}`,
                      iconURL: Member.user.displayAvatarURL({ dynamic: true })
                    })
                    .setColor(client.colors.none)
                    .setFooter({
                      text: `Request Playing RPS By ${message.member.tag}`,
                      iconURL: message.member.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setTitle(`${client.emotes.rps}| RPS Battle YOYO!!`)
                    .setDescription(`**so we got two players, chose your choises.**`)
                  let btn_rock = new MessageButton()
                    .setEmoji(client.emotes.rock)
                    .setStyle('SECONDARY')
                    .setCustomId('rock')
                    .setLabel('ROCK')
                  let btn_paper = new MessageButton()
                    .setEmoji(client.emotes.paper)
                    .setStyle('PRIMARY')
                    .setCustomId('paper')
                    .setLabel('PAPER')
                  let btn_scissors = new MessageButton()
                    .setEmoji(client.emotes.scissors)
                    .setStyle('DANGER')
                    .setCustomId('scissors')
                    .setLabel('SCISSORS')
              
                  let rps_row = new MessageActionRow()
                    .addComponents([btn_rock],[btn_paper],[btn_scissors])
                  button.update({
                    embeds: [embed],
                    components: [rps_row]
                  })  
                    if(button.customId === 'rock'){
                      let embed = new MessageEmbed()
                        .setAuthor({
                          name: `RPS Battle With ${message.member.tag} and ${Member.user.tag}`,
                          iconURL: Member.user.displayAvatarURL({ dynamic: true })
                        })
                        .setColor(client.colors.none)
                        .setFooter({
                          text: `Request Playing RPS By ${message.member.tag}`,
                          iconURL: message.member.displayAvatarURL({ dynamic: true })
                        })
                        .setTimestamp()
                        .setTitle(`${client.emotes.rps}| RPS Battle YOYO!!`)
                        .setDescription(`**one of the players at this name \`${button.member.name}\` chose his options and we wait to secend player.**`)
                      db.set(`rps_choices_${button.guid.id}_${button.member.id}`, "rock")
                        button.update({
                          embeds: [embed],
                          components: [rps_row]
                        })
                    }else if(button.customId === 'paper'){
                      let embed = new MessageEmbed()
                        .setAuthor({
                          name: `RPS Battle With ${message.member.tag} and ${Member.user.tag}`,
                          iconURL: Member.user.displayAvatarURL({ dynamic: true })
                        })
                        .setColor(client.colors.none)
                        .setFooter({
                          text: `Request Playing RPS By ${message.member.tag}`,
                          iconURL: message.member.displayAvatarURL({ dynamic: true })
                        })
                        .setTimestamp()
                        .setTitle(`${client.emotes.rps}| RPS Battle YOYO!!`)
                        .setDescription(`**one of the players at this name \`${button.member.name}\` chose his options and we wait to secend player.**`)
                      db.set(`rps_choices_${button.guid.id}_${button.member.id}`, "paper")
                        button.update({
                          embeds: [embed],
                          components: [rps_row]
                        })
                    }else if(button.customId === 'scissors'){
                      let embed = new MessageEmbed()
                        .setAuthor({
                          name: `RPS Battle With ${message.member.tag} and ${Member.user.tag}`,
                          iconURL: Member.user.displayAvatarURL({ dynamic: true })
                        })
                        .setColor(client.colors.none)
                        .setFooter({
                          text: `Request Playing RPS By ${message.member.tag}`,
                          iconURL: message.member.displayAvatarURL({ dynamic: true })
                        })
                        .setTimestamp()
                        .setTitle(`${client.emotes.rps}| RPS Battle YOYO!!`)
                        .setDescription(`**one of the players at this name \`${button.member.name}\` chose his options and we wait to secend player.**`)
                      db.set(`rps_choices_${button.guid.id}_${button.member.id}`, "scissors")
                        button.update({
                          embeds: [embed],
                          components: [rps_row]
                        })
                    }
                } else if(button.customId === 'no'){
                    button.update({
                      embeds: [CustomErrorEmbed(
                        message,
                        "Battle Have Bin Cancel",
                        `rps battle have bin canceled by <@${Member.user.id}>`,
                        client.emotes.entry,
                        client
                      )],
                      components: [end_row]
                    })
                }
            })
          })
        } else {
          let embed = new MessageEmbed()
           .setColor(client.colors.none)
           .setDescription('Winner: **-**')
           .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)
          message.reply({
           embeds: [embed],
           components: [row]
          }).then((msg) => {
           //let filter = (interaction) => interaction.user.id === message.member.id && interaction.isButton();
           //let collector = msg.createMessageComponentCollector(filter,  {time: collector_timer})
           let collector = msg.createMessageComponentCollector({
                                componentType: 'BUTTON',  time: collector_timer
                            })           
           collector.on('collect', async(button) => {
            button.deferReply();
            button.deleteReply();
            botPick = Math.floor(Math.random() * 3) + 1;
            if(botPick === 1){
              botChose = "rock"
            }else if(botPick === 2){
              botChose = "paper"
            }else if(botPick === 3){
              botChose = "scissor"
            }
            if(!button.user.id === message.member.id){
                button.reply({
                  embeds: [errorEmbed(
                    button,
                    `my brother this button is for ${message.member} it isn't for you.\nfor use button use this command: \`${prefix}rps\``
                  )],
                  ephemeral: true
                })
            }
            //collect ✊🏻Rock button
            if(button.customId === "rock"){
             botPick = Math.floor(Math.random() * 3) + 1;
             if(botChose === "rock"){
              msg.edit({
               content: `I picked: **${rock}**\n You picked: **${rock}**\n**Result: We tied.**`,
               embeds: [
                 new MessageEmbed()
                 .setColor(client.colors.none)
                 .setDescription('Winner: **-**')
                 .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
               ],
               components: [row]
              })
             }
             if(botChose === "paper"){
              botScore++;              
              msg.edit({
               content: `I picked: **${paper}**\n You picked: **${rock}**\n**Result: You lost and I won💪🏻.**`,
               embeds: [
                 new MessageEmbed()
                 .setColor(client.colors.none)
                 .setDescription('Winner: **-**')
                 .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
              ],
               components: [row]
              })
             }
             if(botChose === "scissor"){
              playerScore++;
              msg.edit({
               content: `I picked: **${scissor}**\n You picked: **${rock}**\n**Result: You won💪🏻 and I lost.**`,
               embeds: [
                new MessageEmbed()
                .setColor(client.colors.none)
                .setDescription('Winner: **-**')
                .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
                ],               
                components: [row]
              })
             }
            }
        
            //collect 🖐🏻Paper button
            if(button.customId === "paper"){
             botPick = Math.floor(Math.random() * 3) + 1;
             if(botChose === "paper"){
              msg.edit({
               content: `I picked: **${paper}**\n You picked: **${paper}**\n**Result: We tied.**`,
               embeds: [
                new MessageEmbed()
                .setColor(client.colors.none)
                .setDescription('Winner: **-**')
                .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
               ],
               components: [row]
              })
             }
             if(botChose === "scissor"){
              botScore++;
              msg.edit({
               content: `I picked: **${scissor}**\n You picked: **${paper}**\n**Result: You lost and I won💪🏻.**`,
               embeds: [
                 new MessageEmbed()
                 .setColor(client.colors.none)
                 .setDescription('Winner: **-**')
                 .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
              ],
               components: [row]
              })
             }
             if(botChose === "rock"){
              playerScore++;
              msg.edit({
               content: `I picked: **${rock}**\n You picked: **${paper}**\n**Result: You won💪🏻 and I lost.**`,
               embeds: [
                 new MessageEmbed()
                 .setColor(client.colors.none)
                 .setDescription('Winner: **-**')
                 .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
              ],
               components: [row]
              })
             }
            }
           //collect ✌🏻Scissors button
           if(button.customId === "scissor"){
            botPick = Math.floor(Math.random() * 3) + 1;
            if(botChose === "scissor"){
             msg.edit({
              content: `I picked: **${scissor}**\n You picked: **${scissor}**\n**Result: We tied.**`,
               embeds: [
                 new MessageEmbed()
                 .setColor(client.colors.none)
                 .setDescription('Winner: **-**')
                 .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
              ],
              components: [row]
             })
            }
            if(botChose === "rock"){
             botScore++;
             msg.edit({
              content: `I picked: **${rock}**\n You picked: **${scissor}**\n**Result: You lost and I won💪🏻.**`,
               embeds: [
                 new MessageEmbed()
                 .setColor(client.colors.none)
                 .setDescription('Winner: **-**')
                 .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
              ],
              components: [row]
             })
            }
            if(botChose === "paper"){
             playerScore++;
             msg.edit({
              content: `I picked: **${paper}**\n You picked: **${scissor}**\n**Result: You won💪🏻 and I lost.**`,
               embeds: [
                 new MessageEmbed()
                 .setColor(client.colors.none)
                 .setDescription('Winner: **-**')
                 .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
              ],
              components: [row]
             })
            }
           }
           
           //this is for player had much than 10 points
           if(playerScore === 10){
               msg.edit({
                  embeds: [
                    new MessageEmbed()
                    .setColor(client.colors.green)
                    .setDescription(`Winner: **${message.member}**`)
                    .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
                  ],
                  components: [end_row]
               })
              }else if(botScore === 10){
                msg.edit({
                  embeds: [
                    new MessageEmbed()
                    .setColor(client.colors.red)
                   .setDescription(`Winner: **${client.user}**`)
                   .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
                  ],
                  components: [end_row]                  
               })
              }
           })
           collector.on('end', async(x) => {
            if(x.size === 0){
              msg.edit({
               embeds:  [
                new MessageEmbed()
                .setColor(client.colors.withe)
                .setDescription(`**No one want to VS with me!!**`)
               ],
               components: [end_row]                  
              })
            }else if(x.size > 0){
              if(botScore === playerScore){
               msg.edit({
                  embeds: [
                    new MessageEmbed()
                    .setColor(client.colors.black)
                    .setDescription(`Winner: **Tie Point**`)
                    .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
                  ],
                  components: [end_row]                  
               })
              }else if(botScore < playerScore){
               msg.edit({
                  embeds: [
                    new MessageEmbed()
                    .setColor(client.colors.green)
                    .setDescription(`Winner: **${message.member}**`)
                    .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
                  ],
                  components: [end_row]                  
               })
              }else if(botScore > playerScore){
               msg.edit({
                  embeds: [
                    new MessageEmbed()
                    .setColor(client.colors.red)
                   .setDescription(`Winner: **${client.user}**`)
                   .addField(`Score RPS`,`\`->\` ${message.member}: **${playerScore} Point**\n\`->\` ${client.user}: **${botScore} Point**`)      
                  ],
                  components: [end_row]                  
               })
              }
            }
           })
          })
        }
      /**
           const { 
             RPS 
           } = require('weky');
        const opponent = message.mentions.users.first();
        if (!opponent) return message.reply(`${client.emotes.x}| **Please mention who you want to challenge at tictactoe.**`);
        const game = new RPS({
            message: message,
            opponent: opponent, // NOT CHANGEABLE
            challenger: message.author, // NOT CHANGEABLE
            acceptMessage: "Click to fight with <@" + message.author + '> at RPS!', // message sent to see if opponent accepts
        })
        game.start() // start the game
     */
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