import DiscordClient from "../classes/Client";
import error from "../utils/error";
import firstUpperCase from "../functions/firstUpperCase";
import loadCommand from "../utils/loadCommand";
import post from "../functions/post";

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
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */