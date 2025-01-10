const {
    createCanvas,
    GlobalFonts,
    Image,
    loadImage
} = require("@napi-rs/canvas");
const jimp = require("jimp");
const error = require("../error");
module.exports = class {

    /**
     * 
     * @param {{ userAvatar: string, ad: boolean, affect: boolean, batslap: boolean, avatar2: string, beautiful: boolean, bed: boolean, bobross: boolean, discordblue: boolean, doublestonk: boolean, facepalm: boolean, spank: boolean, stonk: boolean, tatoo: boolean, thomas: boolean, trash: boolean, Delete: boolean, wanted: boolean, currency: string }}  
     * @returns
     */
    constructor({ userAvatar, ad = false, affect = false, batslap = false, avatar2, beautiful = false, bed = false, bobross = false, discordblack = false, discordblue = false, doublestonk = false, facepalm = false, spank = false, stonk = false, tatoo = false, thomas = false, trash = false, Delete = false, wanted = false, currency = "$" } = {}) {
        this.avatar = userAvatar;
        this.ad = ad;
        this.affect = affect;
        this.batslap = batslap;
        this.avatar2 = avatar2;
        this.beautiful = beautiful;
        this.bed = bed;
        this.bobross = bobross;
        this.discordblack = discordblack;
        this.discordblue = discordblue;
        this.doublestonk = doublestonk;
        this.facepalm = facepalm;
        this.spank = spank;
        this.stonk = stonk;
        this.tatoo = tatoo;
        this.thomas = thomas;
        this.trash = trash;
        this.delete = Delete;
        this.wanted = wanted;
        this.currency = currency;
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
    setAd(item) {
        this.ad = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setAffect(item) {
        this.affect = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setBatslap(item) {
        this.batslap = item;
        return this;
    };

    /**
     * 
     * @param {string} item 
     * @returns 
    */
    setSecondUserAvatar(item) {
        this.avatar2 = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setBeautiful(item) {
        this.beautiful = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setBed(item) {
        this.bed = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setBobross(item) {
        this.bobross = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setDiscordBlack(item) {
        this.discordblack = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setDiscordBlue(item) {
        this.discordblue = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setDoubleStonk(item) {
        this.doublestonk = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setFacepalm(item) {
        this.facepalm = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setSpank(item) {
        this.spank = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setStonk(item) {
        this.stonk = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setTatoo(item) {
        this.tatoo = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setThomas(item) {
        this.thomas = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setTrash(item) {
        this.trash = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setDelete(item) {
        this.delete = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setWanted(item) {
        this.wanted = item;
        return this;
    };

    /**
     * 
     * @param {boolean} item 
     * @returns 
    */
    setCurrency(item) {
        this.currency = item;
        return this;
    };

    /**
     * 
     * @param {import("@napi-rs/canvas").Canvas} canvas 
     * @param {string} text 
     * @param {number} size 
     * @param {number} width 
     * @param {string} font
     * @returns {import("@napi-rs/canvas").SKRSContext2D}
     */
    #applyText(canvas, text, size, width, font) {
        const ctx = canvas.getContext("2d");
        do {
            ctx.font = `${(size -= 1)}px ${font}`;
        } while (ctx.measureText(text).width > width);
        return ctx.font;
    }

    /**
     * @returns 
    */
    async generate() {
        try {
            // Load avatar
            let avatar = await jimp.read(this.avatar);
            if (this.ad) {
                avatar.resize(230, 230);
                let background = await jimp.read("./src/storage/images/ad.png");
                const compositeImage = new jimp(background.getWidth(), background.getHeight(), 0xFFFFFFFF);
                compositeImage.composite(avatar, 150, 75);
                compositeImage.composite(background, 0, 0);
                const buffer = await compositeImage.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.affect) {
                avatar.resize(200, 157);
                let background = await jimp.read("./src/storage/images/affect.png");
                background.composite(avatar, 180, 383);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.batslap) {
                let avatar2 = await jimp.read(this.avatar2);
                let background = await jimp.read("./src/storage/images/batslap.png");
                avatar.circle();
                avatar2.circle();
                background.resize(1000, 500);
                avatar.resize(220, 220);
                avatar2.resize(200, 200);
                background.composite(avatar2, 580, 260);
                background.composite(avatar, 350, 70);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.beautiful) {
                let background = await jimp.read("./src/storage/images/beautiful.png");
                background.resize(376, 400);
                avatar.resize(84, 95);
                background.composite(avatar, 258, 28);
                background.composite(avatar, 258, 229);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.bed) {
                let avatar2 = await jimp.read(this.avatar2);
                let background = await jimp.read("./src/storage/images/bed.png");
                avatar.circle();
                avatar2.circle();
                avatar.resize(100, 100);
                avatar2.resize(70, 70);
                background.composite(avatar, 25, 100);
                background.composite(avatar, 25, 300);
                background.composite(avatar.clone().resize(70, 70), 53, 450);
                background.composite(avatar2, 53, 575);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.bobross) {
                let background = await jimp.read("./src/storage/images/bobross.png");
                avatar.resize(440, 440);
                const compositeImage = new jimp(background.getWidth(), background.getHeight(), 0xFFFFFFFF);
                compositeImage.composite(avatar, 15, 20);
                compositeImage.composite(background, 0, 0);
                const buffer = await compositeImage.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.delete) {
                let background = await jimp.read("./src/storage/images/delete.png");
                avatar.resize(195, 195);
                background.composite(avatar, 120, 135);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.discordblack || this.discordblue) {
                let background;
                if (this.discordblack) background = await jimp.read("./src/storage/images/discordblack.png");
                else background = await jimp.read("./src/storage/images/discordblue.png");
                avatar.resize(background.getWidth(), background.getHeight());
                const compositeImage = new jimp(background.getWidth(), background.getHeight(), 0xFFFFFFFF);
                compositeImage.composite(avatar, 0, 0);
                compositeImage.composite(background, 0, 0);
                const buffer = await compositeImage.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.doublestonk) {
                let avatar2 = await jimp.read(this.avatar2);
                let background = await jimp.read("./src/storage/images/doublestonk.png");
                avatar.circle();
                avatar2.circle();
                background.resize(577, 431);
                avatar.resize(140, 140);
                avatar2.resize(140, 140);
                background.composite(avatar2, 60, 20);
                background.composite(avatar, 0, 30);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.facepalm) {
                let background = await jimp.read("./src/storage/images/facepalm.png");
                const compositeImage = new jimp(background.getWidth(), background.getHeight(), 0xFFFFFFFF);
                avatar.resize(235, 235);
                compositeImage.composite(avatar, 199, 112);
                compositeImage.composite(background, 0, 0);
                const buffer = await compositeImage.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.spank) {
                let avatar2 = await jimp.read(this.avatar2);
                let background = await jimp.read("./src/storage/images/spank.png");
                avatar.circle();
                avatar2.circle();
                avatar.greyscale();
                avatar2.greyscale();
                background.resize(500, 500);
                avatar.resize(140, 140);
                avatar2.resize(120, 120);
                background.composite(avatar2, 350, 220);
                background.composite(avatar, 225, 5);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.stonk) {
                let background = await jimp.read("./src/storage/images/stonk.png");
                const compositeImage = new jimp(background.getWidth(), background.getHeight(), 0xFFFFFFFF);
                avatar.resize(240, 240);
                compositeImage.composite(avatar, 70, 41);
                compositeImage.composite(background, 0, 0);
                const buffer = await compositeImage.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.tatoo) {
                let background = await jimp.read("./src/storage/images/tatoo.png");
                const compositeImage = new jimp(background.getWidth(), background.getHeight(), 0xFFFFFFFF);
                avatar.resize(400, 400);
                compositeImage.composite(avatar, 145, 575);
                compositeImage.composite(background, 0, 0);
                const buffer = await compositeImage.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.thomas) {
                let background = await jimp.read("./src/storage/images/thomas.png");
                avatar.resize(400, 400);
                avatar.circle();
                background.composite(avatar, 220, 190);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.trash) {
                let background = await jimp.read("./src/storage/images/trash.png");
                avatar.resize(309, 309);
                avatar.blur(5);
                background.composite(avatar, 309, 0);
                const buffer = await background.getBufferAsync("image/png");
                return Buffer.from(buffer);
            } else if (this.wanted) {
                const currency = this.currency;
                if (typeof currency != "string") return "You must provide a string for the currency.";
                if (currency.length > 1) return "You must provide only one character for the currency.";
                let background = await jimp.read("./src/storage/images/wanted.png");
                background = await background.getBufferAsync("image/png");
                background = await loadImage(background);
                avatar = await avatar.getBufferAsync("image/png");
                avatar = await loadImage(avatar);
                const price = Math.floor(Math.random() * 188708) + 329889;
                const canvas = createCanvas(257, 383);
                const ctx = canvas.getContext("2d");
                ctx.drawImage(avatar, 25, 60, 210, 210);
                ctx.drawImage(background, 0, 0, 257, 383);
                ctx.textAlign = "center";
                ctx.font = this.#applyText(canvas, price.toLocaleString() + currency, 80, 200, "Times New Roman");
                ctx.fillStyle = "#513d34";
                ctx.fillText(price.toLocaleString() + currency, 128, 315);
                const buffer = canvas.toBuffer("image/png");
                return Buffer.from(buffer);
            };
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