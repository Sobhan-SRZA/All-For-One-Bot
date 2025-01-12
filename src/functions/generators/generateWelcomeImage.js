const {
    createCanvas,
    GlobalFonts,
    Image,
    loadImage
} = require("@napi-rs/canvas");
const {
    request
} = require("undici");
const fs = require("fs/promises");
const jimp = require("jimp");
const error = require("../error");
module.exports = class {

    /**
     * 
     * @param {{ backGround: string, userAvatar: string, userName: string, memberCount: number, circle: boolean }}  
     * @returns
     */
    constructor({ backGround, userAvatar, userName, memberCount, circle = true } = {}) {
        this.background = backGround;
        this.username = userName;
        this.membercount = memberCount;
        this.avatar = userAvatar;
        this.circle = circle;
    };

    /**
     * 
     * @param {string} item 
     * @returns 
     */
    setBackGround(item) {
        this.background = item;
        return this;
    };

    /**
     * 
     * @param {string} item 
     * @returns 
     */
    setUserName(item) {
        this.username = item;
        return this;
    };

    /**
     * 
     * @param {number} item 
     * @returns 
     */
    setMemberCount(item) {
        this.membercount = item;
        return this;
    };

    /**
     * 
     * @param {string} item 
     * @returns 
     */
    setUserAvatar(item) {
        this.avatar = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
     */
    setAvatarToCircle(item) {
        this.circle = item;
        return this;
    };

    /**
     * 
     * @param {import("@napi-rs/canvas").Canvas} canvas 
     * @param {string} text 
     * @param {number} size 
     * @param {string} font
     * @returns 
     */
    #applyText(canvas, text, size, font) {
        const ctx = canvas.getContext("2d");
        do {
            ctx.font = `${size -= 4}px ${font}`;
        } while (ctx.measureText(text).width > canvas.width - 300);
        return ctx.font;
    };

    /**
     * @returns 
    */
    async generate() {
        try {

            // Set font family
            GlobalFonts.registerFromPath("./src/storage/fonts/Gagalin-Regular.otf", "Gagalin");


            // Add value to canvas
            const canvas = createCanvas(700, 250);
            const ctx = canvas.getContext("2d");

            // Load background
            let background = await jimp.read(this.background);
            background = await background.getBufferAsync("image/png");
            background = await loadImage(background);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            // Load Strock
            ctx.strokeStyle = "#0099ff";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Load avatar
            let avatar = await jimp.read(this.avatar);
            if (this.circle) avatar.circle();

            avatar = await avatar.getBufferAsync("image/png");
            avatar = await loadImage(avatar);
            ctx.drawImage(avatar, 26, 37, 160, 160);

            // Username
            ctx.font = this.#applyText(canvas, this.username, 45, "Gagalin");
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "left";
            ctx.fillText(this.username, 225, 187);

            // Welcome text
            ctx.fillStyle = "#ffffff";
            ctx.font = "35px Gagalin";
            ctx.textAlign = "left";
            ctx.fillText("Welcome To Our Server", 235, 90);

            // Member Count text
            const ctn = `# ${this.membercount.toLocaleString()}th Member!!`;
            ctx.fillStyle = "#ffffff";
            ctx.font = this.#applyText(canvas, ctn, 20, "Gagalin");
            ctx.textAlign = "left";
            ctx.fillText(ctn, 36, 230);

            const buffer = canvas.toBuffer("image/png");
            return Buffer.from(buffer);
        } catch (e) {
            error(e)
        };
    }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/