import DiscordClient from "../../classes/Client";
import Database from "../../classes/Database";
import post from "../../functions/post";
import error from "../../utils/error";
import chooseRandom from "../../functions/chooseRandom";
import replaceValues from "../../functions/replaceValues";
import logger from "../../functions/logger";
import os from "os";
import firstUpperCase from "../../functions/firstUpperCase";
import { ActivityType, REST, Routes, version } from "discord.js";

export default async (client: DiscordClient) => {
  try {

    // Load Slash Commands
    const
      commands = client.commands
        .filter(a => a.only_slash)
        .map(a => a.data),

      rest = new REST()
        .setToken(client.config.discord.token),

      db = new Database(client.db!);

    // Start to upload all commands to api
    let data: any;
    post(
      "Updating " + String(commands.length).cyan + " (/) command.".green,
      "S"
    );

    // Create commands
    data = await rest.put(
      Routes.applicationCommands(client.user!.id),
      {
        body: commands
      }
    );
    post(
      String(data.length).cyan + " (/) command successfully reloaded.".green,
      "S"
    );

    // Change Bot Status
    setInterval(async function () {
      if (client.config.discord.status.activity.length < 1) return;

      const
        Presence = chooseRandom(client.config.discord.status.presence || ["online"]),
        Activity = chooseRandom(client.config.discord.status.activity),
        Type = firstUpperCase(
          String(chooseRandom(client.config.discord.status.type || ["Custom"])).toLowerCase()
        ),
        stateName = replaceValues(Activity, {
          username: client.user!.displayName.toLocaleString(),
          servers: client.guilds.cache.size.toLocaleString(),
          members: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
          prefix: client.config.discord.prefix,
          usedCommands: (await db.get("totalCommandsUsed") || 0).toLocaleString()
        });

      client.user!.setPresence({
        status: Presence,
        activities: [
          {
            type: ActivityType[Type as keyof typeof ActivityType],
            name: stateName,
            state: Type === "Custom" ? stateName : ""
          }
        ]
      });
    }, 30000);
    post(
      "Discord bot is online!".blue + `\n` +
      client.user!.tag.cyan + " is now online :)".green,
      "S"
    );
    logger(
      "Working Guilds: ".blue +
      `${client.guilds.cache.size.toLocaleString()} Servers`.cyan + `\n` +
      "Watching Members: ".blue +
      `${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()} Members`.cyan
      + `\n` +
      "Commands: ".blue +
      `slashCommands[${commands.length}] & messageCommands[${client.commands.filter(a => a.only_message).size}]`.cyan + `\n` +
      "Discord.js: ".blue +
      `v${version}`.cyan + `\n` +
      "Node.js: ".blue +
      `${process.version}`.cyan + `\n` +
      "Plattform: ".blue +
      `${process.platform} ${process.arch} | ${os.cpus().map((i) => `${i.model}`)[0]} | ${String(os.loadavg()[0])}%`.cyan + `\n` +
      "Memory: ".blue +
      `${Math.round(
        +((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)
      )
        .toLocaleString()
        }/${Math.round(
          +((os.totalmem()) / 1024 / 1024).toFixed(2)
        )
          .toLocaleString()
        } MB | ${(
          (
            (os.totalmem() - os.freemem()) / os.totalmem()
          ) * 100)
          .toFixed(2)
        }%`.cyan
    );

    // Add Slash Commands Id to Commands
    client.commands.forEach(async (command) => {
      const
        cmd = client.commands.get(command.data.name)!,
        slashCommand = (await client.application!.commands.fetch({ cache: true }))
          .find(a => a.name === command.data.name)!;

      return await client.commands.set(
        cmd.data.name,
        {
          ...cmd,
          data: {
            ...cmd.data,
            id: slashCommand.id
          }
        }
      );
    });
  } catch (e: any) {
    error(e);
  }
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