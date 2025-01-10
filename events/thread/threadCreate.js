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
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */