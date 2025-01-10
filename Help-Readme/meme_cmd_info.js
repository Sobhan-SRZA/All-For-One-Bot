
const base = "http://memer-api.live/api/v4";
const fetch = require('node-fetch')

/**
 * Mmemer API Memes Generator
 * @example const Meme = require("memer-api");
 * const memer = new Meme('Your Cool API Token');
 * 
 * memer.youtube("./image.png", "Memer API", "A Youtube Comment")
 *  .then(youtube => {
 *      const attachment = new Discord.MessageAttachment(youtube, "youtube.png");
 *  })
 */
class Meme {

  constructor(token) {
    if (!token) throw new TypeError('Memer API Token was not provided!');
    this.token = token;
  }

  /**
  * Sends a random anime quote.
  * @returns {json}
  */
  animequotes() {

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/animequote?token=${this.token}`)).then(async data => {
        //send data back
        let quote = await data.json()
        resolve(quote)

        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }
  
  /**
  * Generates a Meme on  SaveHumanity.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async savehumanity(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/savehumanity?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Stonks.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async stonks(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/stonks?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }
  
  /**
  * Generates a Meme on abandon.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async abandon(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/abandon?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on NotStonks.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async notstonks(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/notstonks?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Piccolo.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async piccolo(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/piccolo?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Tornado.
  * @param {string} text Text to Generate meme
  * @param {string} text2 Text2 to Generate meme
  * @returns {Promise<Buffer>}
  */
async tornado(text, text2) {
    if (!text) throw new SyntaxError('You are missing the Text')
    if (!text2) throw new SyntaxError('You are missing the Text 2')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/tornado?text=${text}&text2=${text2}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Ohno.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async ohno(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/ohno?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Drake.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async drake(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/drake?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a PepeSign meme.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async pepesign(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/pepesign?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on VR.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async vr(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/vr?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        console.log(data.body)
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Search.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async search(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/isearch?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Failure.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async failure(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/failure?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Trash.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async trash(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/trash?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Satan.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async satan(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/satan?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Stroke.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async stroke(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/stroke?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Roblox.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async roblox(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/roblox?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Hitler.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async hitler(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/hitler?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Bed.
  * @param {string} avatar Avatar1 URL to Generate meme
  * @param {string} avatar Avatar2 URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async bed(avatar1, avatar2) {
    if (!avatar1) throw new SyntaxError("You are Missing the first AVATAR")
    if (!avatar2) throw new SyntaxError("You are Missing the second AVATAR")

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/bed?avatars=${avatar1},${avatar2}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Jail.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async jail(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/jail?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Delete.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async delete(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/delete?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on EmergencyMeeting.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
async emergencymeeting(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/emergencymeeting?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Byemom.
  * @param {string} avatar Avatar URL to Generate meme
  * @param {string} username Username  of the user to Generate meme
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async byemom(avatar, username, text) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')
    if (!username) throw new SyntaxError("You are Missing the USERNAME")
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/byemom?text=${text}&avatars=${avatar}&usernames=${username}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Draw25.
  * @param {string} avatar Avatar URL to Generate meme
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async draw25(avatar, text) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/draw25?text=${text}&avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Walking.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async walking(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/walking?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Keepdistance.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async keepdistance(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/keepdistance?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Fakenews.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async fakenews(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/fakenews?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Wanted.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async wanted(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/wanted?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Godwhy.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async godwhy(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/godwhy?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Violence.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async violence(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/violence?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Ipad.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async ipad(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/ipad?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Laid.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async laid(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/laid?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Ugly.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async ugly(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/ugly?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Shit.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async shit(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/shit?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on humansgood.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async humansgood(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/humansgood?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on whodidthis.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async whodidthis(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/whodidthis?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Floor.
  * @param {string} avatar Avatar URL to Generate meme
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async floor(text, avatar) {
    if (!text) throw new SyntaxError('You are missing the Text')
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/floor?text=${text}&avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Obama.
  * @param {string} avatar Avatar URL to Generate meme
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async obama(text, avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/obama?text=${text}&avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Note.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async note(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/note?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on America.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async america(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/america?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Aborted.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async aborted(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/aborted?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Affect.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async affect(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/affect?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Armor.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async armor(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/armor?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Facts.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async facts(text) {
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/facts?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Bongocat.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async bongocat(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/bongocat?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Brazzers.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async brazzers(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/brazzers?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Cancer.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async cancer(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/cancer?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Changemymind.
  * @param {string} text Text to Generate meme
  * @returns {Promise<Buffer>}
  */
  async changemymind(text) {

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/changemymind?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Communism.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async communism(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/communism?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Corporate.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async corporate(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/corporate?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Cry.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async cry(text) {
    if (!text) throw new SyntaxError("You are Missing the AVATAR")

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/cry?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Dab.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async dab(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/dab?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Disability.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async disability(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/disability?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Door.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async door(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/door?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Egg.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async egg(avatar) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/egg?avatars=${avatar}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Excuseme.
  * @param {string} avatar Avatar URL to Generate meme
  * @returns {Promise<Buffer>}
  */
  async excuseme(text) {
    if (!text) throw new SyntaxError("You are Missing the AVATAR")

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/excuseme?text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Youtube Comment.
  * @param {string} avatar Avatar URL to Generate youtube comment
  * @param {string} username Username  of the user to Generate youtube comment
  * @param {string} text Text to Generate youtube comment
  * @returns {Promise<Buffer>}
  */
  async youtube(avatar, username, text) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')
    if (!username) throw new SyntaxError("You are Missing the USERNAME")
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/youtube?avatars=${avatar}&usernames=${username}&text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Welcome.
  * @param {string} avatar Avatar URL to Generate welcome image
  * @param {string} username Username  of the user to Generate welcome image
  * @param {string} background Background URL to Generate welcome image
  * @returns {Promise<Buffer>}
  */
  async welcome(username, avatar, background) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')
    if (!username) throw new SyntaxError("You are Missing the USERNAME")
    if (!background) throw new SyntaxError("You are Missing the BACKGROUND")
    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/welcomeimage?av=${avatar}&usernames=${username}&background=${background}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Meme on Leave.
  * @param {string} avatar Avatar URL to Generate leave image
  * @param {string} username Username  of the user to Generate leave image
  * @param {string} background Background URL to Generate leave image
  * @returns {Promise<Buffer>}
  */
  async leave(username, avatar, background) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')
    if (!username) throw new SyntaxError("You are Missing the USERNAME")
    if (!background) throw new SyntaxError("You are Missing the BACKGROUND")
    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/leaveimage?av=${avatar}&usernames=${username}&background=${background}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }

  /**
  * Generates a Twitter Tweet.
  * @param {string} avatar Avatar URL to Generate Twitter Tweet
  * @param {string} username Username  of the user to Generate Twitter Tweet
  * @param {string} text Text to Generate Twitter Tweet
  * @returns {Promise<Buffer>}
  */
  async tweet(avatar, username, text) {
    if (!avatar) throw new SyntaxError('You are missing the Avatar')
    if (!username) throw new SyntaxError("You are Missing the USERNAME")
    if (!text) throw new SyntaxError('You are missing the Text')

    return new Promise((resolve, reject) => {
      fetch(encodeURI(`${base}/tweet?avatars=${avatar}&usernames=${username}&text=${text}&token=${this.token}`)).then((data) => {
        //send data back
        resolve(data.buffer())
        return;
      }).catch(error => {
        //if error reject the error
        reject(error)
      })
    })
  }
}
module.exports = Meme;
