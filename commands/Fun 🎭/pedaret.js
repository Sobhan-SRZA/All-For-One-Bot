const Discord = require('discord.js');
module.exports = {
    name: 'pedaret',
    aliases: ['pedar'],
    category: 'Fun 🎭',
    utilisation: '{prefix}pedaret',
  async execute(client, message, args) { 
var pedar = ["پدرت","دک خر تو پوسی  بابات",'خفه شو و بزار از خوردن بابات لذت ببریم','پوسی بابات','اسب دریایی دارم باباتو میخورم خفه شو و گریه کن','پدرت قبل خورده شدن میگفت پسرم مرده😱','دک سیاه بره تو پوسی بابات','دک شدی حالا بیا دکمو بخور😋','پدرت یام یام شد😋'];
const shotor = pedar[Math.floor(Math.random () * pedar.length)];
message.channel.send(shotor);
  }
}

