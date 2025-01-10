const Canvas = require('canvas');
const {
    MessageAttachment
} = require('discord.js');
module.exports = {
    name: 'textlogo',
    aliases: ['text','text-logo','tlogo','logo'],
    category: 'Fun 🎭 | Image',
    description: 'change your text font.',
    usage: '[text]',
  async execute(client, message, args) {
    var tempmsg = await message.reply({
        content: client.emotes.loading + "| **loading image please wait.**"
      }) 
   const applyText = (canvas, text) => {
       const ctx = canvas.getContext('2d');
       let fontSize = 70 ;
       do {
          ctx.font = `${fontSize -= 10}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 300);
       return ctx.font;
   };
   const Text = message.content.slice(7).trim();
   const canvas = Canvas.createCanvas(700, 250, "svg");
   const ctx = canvas.getContext('2d');
   const background = await Canvas.loadImage("./../../assets/pictures/logo_background.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = applyText(canvas, Text);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(Text, canvas.width / 2.5, canvas.height / 1.8);
    ctx.beginPath();
    ctx.arc(125, 125, 0, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
   const attachment = new MessageAttachment(canvas.toBuffer(),'/text_logo.png');
    tempmsg.edit({
            files: [{
                attachment: [attachment]
            }]
    });
 
    }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */