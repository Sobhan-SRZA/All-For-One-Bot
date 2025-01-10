const clc = require("cli-color");
const post = require("../../functions/post");
const error = require("../../functions/error");
const logger = require("../../functions/logger");
const config = require("../../../config");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns
 */
module.exports = async (client) => {
  try {
    // Load Slash Commands
    const commands = client.commands.filter(a => a.only_slash);
    if (config.only_one_guild) {
      await client.guilds.cache.get(config.serverId).commands.set(commands);
    } else {
      await client.application.commands.set(commands);
    };

    post(`${clc.cyanBright(commands.size)} Slash Commands Is Uploaded!!`, "S");

    // Change Bot Status
    setInterval(function () {
      const Presence = config.status.presence,
        PresencePower = Presence[Math.floor(Math.random() * Presence.length)],
        Activity = config.status.activity,
        ActivityPower = Activity[Math.floor(Math.random() * Activity.length)],
        Display = config.status.type,
        DisplayPower = Display[Math.floor(Math.random() * Display.length)],
        stateName = ActivityPower.replace("{servers}", `${client.guilds.cache.size.toLocaleString()}`).replace("{members}", client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString());

      client.user.setPresence({
        status: PresencePower,
        activities: [
          {
            type: DisplayPower,
            name: stateName,
            state: DisplayPower === 4 ? stateName : ""
          }
        ]
      });
    }, 30000);
    post(
      `${clc.blueBright("Discord Bot is online!")}` + `\n` +
      `${clc.cyanBright(client.user.tag)} Is Now Online :)`,
      "S"
    );
    logger(
      clc.blueBright("Working Guilds: ") + clc.cyanBright(`${client.guilds.cache.size.toLocaleString()} Servers`) + `\n` +
      clc.blueBright("Watching Members: ") + clc.cyanBright(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Members`) + `\n` +
      clc.blueBright("Commands: ") + clc.cyanBright(`slashCommands[${commands.size}] & messageCommands[${client.commands.filter(a => a.only_message).size}]`) + `\n` +
      clc.blueBright("Discord.js: ") + clc.cyanBright(`v${require("discord.js").version}`) + `\n` +
      clc.blueBright("Node.js: ") + clc.cyanBright(`${process.version}`) + `\n` +
      clc.blueBright("Plattform: ") + clc.cyanBright(`${process.platform} ${process.arch}`) + `\n` +
      clc.blueBright("Memory: ") + clc.cyanBright(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`)
    );
  } catch (e) {
    error(e)
  }
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