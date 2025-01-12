const axios = require("axios");
const error = require("./error");

/**
 * 
 * @param {string} type 
 * @returns 
 */
module.exports = async function (type) {
  try {
    return await axios.get(`https://nekobot.xyz/api/image?type=${type}`, {
      headers: {
        Authorization: "Basic MDE1NDQ1NTM1NDU0NDU1MzU0RDY6"
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