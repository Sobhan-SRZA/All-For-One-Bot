const error = require("./error");

/**
 * 
 * @param {string} question 
 * @param {import("discord.js").User} user 
 * @returns 
*/
module.exports = async function (question, user) {
    try {
        /**
         * 
         * @param {string[]} string_array An array of strings to encoding
         * @returns {string} The encoding of the return value. 
         */
        function toHash(string_array) {
            const
                crypto = require("crypto"),
                hash = crypto.createHmac("sha256", string_array[0]);

            for (let index = 1; index < string_array.length; index++)
                hash.update(string_array[index])

            return hash.digest("hex")
        }

        /**
         * 
         * @param {object} object
         * @returns {string} 
         */
        function getAPI(object) {
            object = JSON.stringify(object);
            const
                { apiKey, apiSecret } = { apiKey: "5LiRo3KQ2l7e1viT", apiSecret: "lRBGT1T6ZpgTcwLNudjLFCYfEePqxeSb" },
                host = "https://www.personalityforge.com/api/chat/",
                hash = toHash([apiSecret, object]),
                url = `${host}?apiKey=${apiKey}&hash=${hash}&message=${encodeURIComponent(object)}`;

            return url;
        }
        const response = await fetch(
            getAPI({
                message: {
                    message: question,
                    chatBotID: 6,
                    timestamp: Math.floor(Date.now() / 1000)
                },
                user: {
                    firstName: user?.username || Math.floor(Date.now() / 1000).toString(),
                    externalID: user?.id || Math.floor(Date.now() / 1000)
                }
            })
        ).then((res) => res.json())
        const answer = response.message.message
        return answer ? `${answer.replaceAll("@", "@ ")}` : "???";
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