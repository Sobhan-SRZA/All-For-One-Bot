import DiscordClient from "../classes/Client";
import error from "../utils/error";
import firstUpperCase from "../functions/firstUpperCase";
import post from "../functions/post";
import CommandType from "../types/command";
import { readdirSync } from "fs";

export default async (client: DiscordClient) => {
    try {
        const commandTypes = ["only_message", "only_slash"] as const;
        commandTypes.forEach(async (type) => {
            await loadCommand(`${process.cwd()}/dist/src/commands`, type, client.commands);
            post(`${client.commands.filter(a => a[type]).size}`.cyan + ` ${firstUpperCase(type.replace("only_", ""))} Commands Is Loaded!!`.green, "S");
        });
    } catch (e: any) {
        error(e)
    }
};

// Function
async function loadCommand(dirname: string, type: "only_slash" | "only_message", object: Map<string, any>) {
    try {
        for (const dirs of readdirSync(dirname)) {
            const commandFiles = readdirSync(`${dirname}/${dirs}`)
                .filter(files => files.endsWith(".js"));

            for (const file of commandFiles) {
                const commandData = await import(`${dirname}/${dirs}/${file}`);
                const command: CommandType = commandData.default || commandData;
                if (command[type])
                    object.set(command.data.name, command);

                else {
                    post(
                        `${firstUpperCase(type.replace("only_", ""))} Command Not Loaded: ${file}`,
                        "E",
                        "red",
                        "red"
                    );
                    continue;
                }
            }

        };

    } catch (e: any) {
        error(e)
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