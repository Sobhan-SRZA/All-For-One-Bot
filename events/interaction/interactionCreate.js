const {
    MessageEmbed,
    Collection,
    Permissions
} = require("discord.js");
var clc = require("cli-color");
const { 
    slashCommandsCoolDown 
} = require('../../functions/functions.js');
module.exports = async (client, interaction) => {
try {
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) 
    return interaction.reply({content: `${client.emotes.off}| I am missing the Permission to \`USE_EXTERNAL_EMOJIS\`` })
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) 
    return interaction.reply({content: `${client.emotes.error}| I am missing the Permission to \`EMBED_LINKS\`` })
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.ADD_REACTIONS)) 
    return interaction.reply({embeds: [new MessageEmbed()
      .setColor(client.colors.red)
      .setTitle(`${client.emotes.entry}| I am missing the Permission to \`ADD_REACTIONS\``)]})

        if (interaction.isCommand()) {
            const command = client.slashCommands.get(interaction.commandName);

      if (command) {
            const args = [];

            for (let option of interaction.options.data) {
                if (option.type === "SUB_COMMAND") {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    })
                } else if (option.value) args.push(option.value);
            }
                if (command.toggleOff) {
                    return await interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`${client.emotes.badage}| **That Command Has Been Disabled By The Developers! Please Try Later.**`)
                            .setColor(client.colors.red)
                        ]
                    }).catch((e) => {
                        console.log(e)
                    });
                }
                if (!interaction.member.permissions.has(command.userPermissions || [])) return await interaction.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.emotes.error}| **You do not have \`${command.userPermissions.join(", ")}\` permission to use \`${command.name}\` command!**`)
                        .setColor(client.colors.red)
                    ],
                    ephemeral: true
                }).catch((e) => {
                    console.log(e)
                });
                if (!interaction.guild.me.permissions.has(command.botPermissions || [])) return await interaction.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x}| **I do not have \`${command.botPermissions.join(", ")}\` permission to use \`${command.name}\` command!**`)
                        .setColor(client.colors.orange)
                    ],
                    ephemeral: true
                }).catch((e) => {
                    console.log(e)
                });
                
                //======== Slash Command Cooldown ========
                slashCommandsCoolDown(client, interaction, command)
                
                //======== Slash Command Handler ========
                command.run(client, interaction, args);
            } else {
                return;
            }
        }

        if (interaction.isContextMenu()) {
            const command = client.Commands.get(interaction.commandName);
            if (command) command.run(client, interaction);
        }

    } catch (err) {
        console.log(err)
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