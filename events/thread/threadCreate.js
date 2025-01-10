let clc = require('cli-color');
module.exports = async (client, thread) => {
if(thread.joinable){
    try{
        await thread.join();
    }catch (error){
        console.log(clc.redBright(error))
    }
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