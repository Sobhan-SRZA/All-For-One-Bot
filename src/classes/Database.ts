import { QuickDB } from "quick.db";

export default class Database {

  db: QuickDB;
  constructor(db: QuickDB) {
    this.db = db;
    return this;
  }

  async has(name: string) {
    if (await this.db.has(name))
      return true;

    else
      return false;
  }

  async get(name: string) {
    if (await this.db.has(name))
      return await this.db.get(name);

    else
      return false;
  }

  async set(name: string, input: any) {
    return await this.db.set(name, input);
  }

  async push(name: string, input: any) {
    return await this.db.push(name, input);
  }


  async pull(name: string, input: any) {
    return await this.db.pull(name, input);
  }

  async add(name: string, input: number) {
    return await this.db.add(name, input);
  }

  async sub(name: string, input: any) {
    return await this.db.sub(name, input);
  }


  async delete(name: string) {
    return await this.db.delete(name);
  }

  async deleteAll() {
    return await this.db.deleteAll();
  }

  async all() {
    return await this.db.all();
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