const error = require("./error");

/**
 * 
 * @param {number} number 
 * @returns {string}
 */
module.exports = function (number) {
    try {
        let point;
        if (Number(number) > 1) point = "[(1/10) ▰](https://dsc.gg/persian-caesar)▱▱▱▱▱▱▱▱▱";

        if (Number(number) > 9) point = "[(2/10) ▰▰](https://dsc.gg/persian-caesar)▱▱▱▱▱▱▱▱";

        if (Number(number) > 19) point = "[(3/10) ▰▰▰](https://dsc.gg/persian-caesar)▱▱▱▱▱▱▱";

        if (Number(number) > 29) point = "[(4/10) ▰▰▰▰](https://dsc.gg/persian-caesar)▱▱▱▱▱▱";

        if (Number(number) > 39) point = "[(5/10) ▰▰▰▰▰](https://dsc.gg/persian-caesar)▱▱▱▱▱";

        if (Number(number) > 49) point = "[(6/10) ▰▰▰▰▰▰](https://dsc.gg/persian-caesar)▱▱▱▱";

        if (Number(number) > 59) point = "[(7/10) ▰▰▰▰▰▰▰](https://dsc.gg/persian-caesar)▱▱▱";

        if (Number(number) > 69) point = "[(8/10) ▰▰▰▰▰▰▰▰](https://dsc.gg/persian-caesar)▱▱";

        if (Number(number) > 79) point = "[(9/10) ▰▰▰▰▰▰▰▰▰](https://dsc.gg/persian-caesar)▱";

        if (Number(number) > 89) point = "[(10/10) ▰▰▰▰▰▰▰▰▰▰](https://dsc.gg/persian-caesar)";

        return point;
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