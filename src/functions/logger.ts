import error from "../utils/error";

export default function logger(data: any) {
  try {
    const logstring = `${`[G]〢┃  ${"Perisan Caesar".green}`.yellow}${" 〢 ".magenta}`;
    if (typeof data == "string")
      console.log(
        logstring +
        data
          .split("\n")
          .map(d => `${d}`.green)
          .join(`\n${logstring}`)
      );

    else if (typeof data == "object")
      console.log(logstring + JSON.stringify(data, null, 3).green);

    else if (typeof data == "boolean")
      console.log(logstring + String(data).cyan);

    else
      console.log(logstring + data);
  } catch (e: any) {
    error(e);
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