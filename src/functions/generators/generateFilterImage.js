const {
    createCanvas,
    loadImage
} = require("@napi-rs/canvas");
const fs = require("fs/promises");
const jimp = require("jimp");
const error = require("../error");
module.exports = class {

    /**
     * 
     * @param {{ userAvatar: string, circle: boolean, blur: boolean, level: number, gay: boolean, greyscale: boolean, invert: boolean, sepia: boolean }}  
     * @returns
     */
    constructor({ userAvatar, circle = false, blur = false, level = 5, gay = false, greyscale = false, invert = false, sepia = false } = {}) {
        this.avatar = userAvatar;
        this.circle = circle;
        this.blur = blur;
        this.level = level;
        this.gay = gay;
        this.greyscale = greyscale;
        this.invert = invert;
        this.sepia = sepia;
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
     * @param {boolean} item 
     * @returns 
     */
    setBlur(item) {
        this.blur = item;
        return this;
    };

    /**
     * 
     * @param {number} item 
     * @returns 
     */
    setBlurLevel(item) {
        this.level = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
     */
    setGay(item) {
        this.gay = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
     */
    setGreyscale(item) {
        this.greyscale = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
     */
    setInvert(item) {
        this.invert = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
     */
    setSepia(item) {
        this.sepia = item;
        return this;
    };

    /**
     * @returns 
    */
    async generate() {
        try {
            if (this.gay) {
                // Add value to canvas
                const canvas = createCanvas(480, 480);
                const ctx = canvas.getContext("2d");

                // Load background
                let background = await jimp.read(await fs.readFile("./src/storage/images/gay.png"));
                background = await background.getBufferAsync("image/png");
                background = await loadImage(background);

                // Load avatar
                let avatar = await jimp.read(this.avatar);
                if (this.circle) avatar.circle();

                avatar = await avatar.getBufferAsync("image/png");
                avatar = await loadImage(avatar);
                ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

                // Add gay filter
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                const buffer = canvas.toBuffer("image/png");
                return Buffer.from(buffer);
            };

            // Load avatar
            let avatar = await jimp.read(this.avatar);
            if (this.circle) avatar.circle();

            if (this.blur) avatar.blur(isNaN(this.level) ? 5 : parseInt(this.level));

            if (this.greyscale) avatar.greyscale();

            if (this.invert) avatar.invert();

            if (this.sepia) avatar.sepia();

            const buffer = await avatar.getBufferAsync("image/png");
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