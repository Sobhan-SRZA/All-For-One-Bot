const axios = require("axios");
const error = require("./error");

/**
 * 
 * @param {string} userId 
 * @param {string} botToken 
 * @returns 
 */
module.exports = async function (userId, botToken) {
  try {
    return await axios.get(`https://discord.com/api/users/${userId}`, {
      headers: {
        Authorization: `Bot ${botToken}`,
      }
    }).then((res) => res.data);
  } catch (e) {
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