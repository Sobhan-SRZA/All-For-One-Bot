const config = {
    source: {
        default_language: process.env.default_language || "en", // Bot default language in discord.
        anti_crash: process.env.anti_crash === "true" ? true : false || false, // Anticrash on or off
        one_guild: process.env.one_guild === "true" ? true : false || false, // One Guild on or off
        logger: process.env.logger === "true" ? true : false || false, // Webhook logger on or off
        dashboard: {
            on: process.env.dashboard === "true" ? true : false || false, // Dashboad on or off
            port: process.env.dashboard_port || 3000, // Dashboard port server.
            host: process.env.dashboard_host || "http://localhost:" + process.env.dashboard_port || 3000 // Dashboard host url.
        },
        database: {
            type: process.env.database_type || "", // Choose one type for save users and guilds data. Types: "mysql" | "sql" | "mongodb" | "json"
            mongoURL: process.env.database_mongoURL || "", // If you choose "mongodb" type place your mongo url.
            mysql: {
                host: process.env.database_msql_host || "", // Place your Mysql server host name.
                user: process.env.database_msql_user || "", // Place your Mysql server username.
                password: process.env.database_msql_password || "", // Place your Mysql server password.
                database: process.env.database_msql_database || "" // Place your Mysql server database name.
            } // If you choose "mysql" type place your Mysql server information.
        }
    },
    discord: {
        token: process.env.token || "", // Bot token.
        prefix: process.env.prefix || "", // Bot message command prefix.
        status: {
            activity: JSON.parse(process.env.status_activity || "[]") || [], // Set bot status activity, you can change it. | You can use "{members}" variable to shows bot all users or {servers} to shows counts of all servers bot joined.
            type: JSON.parse(process.env.status_type || "[]") || [], // Set bot status type and it"s can be: "Competing" | "Listening" | "Playing" | "Streaming" | "Watching" | "Custom"
            presence: JSON.parse(process.env.status_presence || "[]") || [] // Set bot status presence and it"s can be: "online" | "dnd" | "idle" | "offline"
        },
        noperms_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}", // Discord bot invite link with no permission.
        admin_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}&permissions=8", // Discord bot invite link with administrator permission.
        default_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}&permissions=3230729", // Discord bot invite link with recommended permission.
        support: {
            invite: process.env.support_url || "https://discord.gg/AfkuXgCKAQ", // Support server invite link.
            id: process.env.support_id || "", // Support server Id.
            stats_channel: process.env.support_stats || "", // Id of  channel to send bot stats on discord.
            webhook: {
                url: process.env.webhook_url || "", // Webhook logger url.
                avatar: process.env.webhook_avatar || "", // Webhook logger avatar.
                username: process.env.webhook_username || "", // Webhook logger username.
                threads: {
                    status: process.env.webhook_thread_status || "", // Id of thread for webhook to bot status alerts.
                    bugs: process.env.webhook_thread_bugs || "", // Id of thread for webhook to send console errors.
                    report: process.env.webhook_thread_report || "" // Id of thread for webhook to send users report messages.
                }
            },
            owners: JSON.parse(process.env.owners || "[]") || [] // Source owners.
        }
    }
};
export default config;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */