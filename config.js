const { ActivityType } = require("discord.js");
module.exports = {
  token: process.env.token || "", // Bot token from .env or place in here
  prefix: process.env.prefix || "", // Put bot message commands prefix in here.
  serverId: process.env.server_id || "", // Put bot main server's id in here.
  only_one_guild: false, // Set bot slash command to all guild or just one with placing true or false.
  source: {
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
  status: {
    activity: [
      "Build by Sobhan-SRZA (mr.sinre)",
      "Working in {servers} Servers",
      "Work for {members} Members"
    ], // Set bot status activity, you can change it. | You can use "{members}" variable to shows bot all users.
    type: [
      ActivityType.Custom
    ], // Can be: ActivityType.Competing | ActivityType.Listening | ActivityType.Playing | ActivityType.Streaming | ActivityType.Watching
    presence: [
      "dnd"
    ] // Can be: "online" | "dnd" | "idle" | "offline"
  },
  webhook: {
    url: process.env.webhook_url || "", // Place a webhook url in here.
    username: process.env.webhook_username || "Pc Bot", // Place a name for webhook in here.
    avatar: process.env.webhook_avatar || "https://cdn.discordapp.com/avatars/1182394110473150554/f971b4db65d5b6b031106371f70fe2ce.png" // Place a image url in here.
  },
  owners: [
    "865630940361785345",
    "986314682547716117",
    "866992479328665600"
  ], // Place bot developers user id in here.
  chat_bot: {
    name: "Caesar", // Place chat bot name.
    gender: "Male" // Place chat bot gender like example: "Male" | "Female"
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