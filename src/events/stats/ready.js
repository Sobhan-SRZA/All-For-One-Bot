const moment = require("jalali-moment");
const error = require("../../functions/error");
const { ChannelType } = require("discord.js");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns
 */
module.exports = async (client) => {
  try {
    const db = client.db;
    const intervalTimer = 1000 * 60 * 5;
    const date = (name, locale) => {
      const time = moment(new Date()).locale(locale);
      const year = time.format("YYYY");
      const month = time.format("MM");
      const day = time.format("DD");
      const hour = time.format("HH");
      const minute = time.format("mm");
      return name
        .replace("{year}", year)
        .replace("{month}", month)
        .replace("{day}", day)
        .replace("{hour}", hour)
        .replace("{minute}", minute);
    };
    setInterval(async () => {
      const database = await db.get("stats");
      if (database) {
        const guilds = Object.keys(database);
        guilds.forEach((guild) => {
          const datas = database[guild];
          const clean = datas.filter(a => client.channels.fetch(a.channel));
          clean.forEach((data) => {
            const channel = client.channels.cache.get(data.channel);
            try {
              switch (data.type) {
                case "gmc": {
                  channel.setName(data.name.replace("{count}", channel.guild.memberCount.toLocaleString()));
                } break;

                case "gvmc": {
                  const voiceChannels = channel.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice);
                  let count = 0;
                  for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
                  channel.setName(data.name.replace("{count}", count.toLocaleString()));
                } break;

                case "date-fa": {
                  const name = date(data.name, "fa");
                  channel.setName(name);
                } break;

                case "date-en": {
                  const name = date(data.name, "en");
                  channel.setName(name);
                } break;
              }
            } catch {
            }
          });
        });
      }
    }, intervalTimer);
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