const Discord = require('discord.js');
module.exports = {
    name: 'logo',
    aliases: ['image', 'il'],
    category: 'Fun 🎭',
    utilisation: '{prefix}logo',

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        const Canvas = require('@napi-rs/canvas');
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
            let fontSize = 70;
            do {
                ctx.font = `${fontSize -= 10}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 300);
            return ctx.font;
        };
        const Text = message.content.slice(7).trim();
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        // dar in ghesmat be jay wallpaper.jpg esm file khod ra ghrar dahid
        const background = await Canvas.loadImage('./wallpaper.jpg');
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
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './wallpaper.jpg');
        //    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        message.channel.send(attachment);

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