import { ChannelType, CommandInteraction, Message, PermissionsBitField } from "discord.js";
import DiscordClient from "../classes/Client";
export default interface CommandType {
    data: {
        id?: string;
        name: string;
        description: string;
        type: number;
        default_member_permissions: PermissionsBitField;
        default_bot_permissions: PermissionsBitField;
        dm_permission: boolean;
        nsfw: boolean;
        options:
        {
            name: string;
            description: string;
            type: number;
            required?: boolean;
            choices?: { name: string, value: string }[];
            options?: [] | CommandOption[];
        }[];
    };
    category: "member" | "admin" | "music" | "owner" | "nsfw";
    aliases?: string[];
    usage?: string;
    cooldown: number;
    only_owner: boolean;
    only_slash: boolean;
    only_message: boolean;
    run: (client: DiscordClient, interaction: CommandInteraction | Message, args?: string[]) => void;
}

interface CommandOption {
    name: string;
    description: string;
    type: number;
    channel_types?: ChannelType[];
    required?: boolean;
    options?: [] | CommandOption[];
    choices?: { name: string, value: string }[];
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