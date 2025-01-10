const { 
  createCanvas, 
  loadImage 
} = require('canvas');
const {
   MessageAttachment
} = require('discord.js')
const db = require('quick.db')
module.exports = async (client, member) => {
	const welcome_channel = await db.fetch(`welcome_${member.guild.id}`);
    if (!welcome_channel) return;
	const applyText = (canvas, text) => {
	canvas, `${member.displayName}!`
};

    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await loadImage('./Welcome2.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    ctx.font = applyText
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'Welcome2.png');
    let channel = member.guild.channels.cache.get(ch => ch.id === welcome_channel.id);
	   channel.send({
     content: `Welcome to the server, ${member}! :D`,
      files: [attachment]
 })
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