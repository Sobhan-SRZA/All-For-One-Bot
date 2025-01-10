const fs = require("fs");
const clc = require("cli-color");
const post = require("../functions/post");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns
 */
module.exports = async (client) => {
  fs.readdirSync(`${process.cwd()}/commands`).forEach(dirs => {
    const commandFiles = fs.readdirSync(`${process.cwd()}/commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`${process.cwd()}/commands/${dirs}/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
      } else {
        post(`Message Command Not Loaded: ${file}`, "E", "red", "redBright");
        continue;
      }
    };
  });
  post(`${clc.cyanBright(client.commands.size)} Message Commands Is Loaded!!`, "S");
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