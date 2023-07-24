const clc = require('cli-color');
module.exports = async (client, thread) => {
 try{
  if (thread.joinable) await thread.join();
 }catch (error){
     console.log(clc.redBright(error))
 }
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */