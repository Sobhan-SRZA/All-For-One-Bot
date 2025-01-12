"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    db;
    constructor(db) {
        this.db = db;
        return this;
    }
    async has(name) {
        if (await this.db.has(name))
            return true;
        else
            return false;
    }
    async get(name) {
        if (await this.db.has(name))
            return await this.db.get(name);
        else
            return false;
    }
    async set(name, input) {
        return await this.db.set(name, input);
    }
    async push(name, input) {
        return await this.db.push(name, input);
    }
    async pull(name, input) {
        return await this.db.pull(name, input);
    }
    async add(name, input) {
        return await this.db.add(name, input);
    }
    async sub(name, input) {
        return await this.db.sub(name, input);
    }
    async delete(name) {
        return await this.db.delete(name);
    }
    async deleteAll() {
        return await this.db.deleteAll();
    }
    async all() {
        return await this.db.all();
    }
}
exports.default = Database;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=Database.js.map