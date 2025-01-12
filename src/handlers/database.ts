import DiscordClient from "../classes/Client";
import { QuickDB } from "quick.db";
import post from "../functions/post";
import { error } from "console";
import config from "../../config";

export default async (client: DiscordClient) => {
    try {
        let driver: any;
        switch (config.source.database.type) {
            case "sql": {
                const { SqliteDriver } = await import("quick.db");

                driver = new SqliteDriver("./");
                break;
            }

            case "mysql": {
                const { MySQLDriver } = await import("quick.db");

                driver = new MySQLDriver(config.source.database.mysql)
                break;
            }

            case "json": {
                const { JSONDriver } = await import("quick.db");

                driver = new JSONDriver();
                break;
            }

            case "mongodb": {
                // const { MongoDriver } = await import("quickmongo");
                // driver = new MongoDriver(config.source.database.mongoURL);
                // await driver.connect();
                break;
            }
        };

        const db = new QuickDB({ driver });
        await db.init();
        client.db = db;
        post(
            `Database Is Successfully Activated!! (Type: ${config.source.database.type.toLocaleUpperCase()})`,
            "S"
        );
    } catch (e: any) {
        post(`Database Doesn't Work!!`.red, "E", "red", "red")
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