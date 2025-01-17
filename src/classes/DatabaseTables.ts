import { QuickDB } from "quick.db";
import client from "../..";
import Database from "./Database";

class BotChannels extends Database {
  constructor(db?: QuickDB) {
    super(db ?? client.db!.table("BotChannels"))
  }
}

class tickets extends Database {
  constructor(db?: QuickDB) {
    super(db ?? client.db!.table("BotChannels"))
  }
}
export {
  BotChannels,
  tickets
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