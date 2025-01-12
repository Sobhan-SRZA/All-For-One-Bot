import error from "../utils/error";

type Color = "strip" | "stripColors" | "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough" | "rainbow" | "zebra" | "america" | "trap" | "random" | "zalgo";

export default function post(data: any, name: string, color1?: Color, color2?: Color) {
  try {
    const dataColor = color1 || "yellow";
    const textColor = color2 || "green";
    const message = `${(`[${name || "U"}]〢┃  `)[dataColor]}`;
    if (typeof data == "string")
      console.log(
        message +
        data
          .split("\n")
          .map(d => `${`${d}`[textColor]}`.green)
          .join(`\n${message}`)
      );

    else if (typeof data == "object")
      console.log(
        message + JSON.stringify(`${data}`[textColor], null, 3).green
      );

    else if (typeof data == "boolean")
      console.log(message + `${`${data}`[textColor]}`.cyan);

    else
      console.log(message + `${data}`[textColor]);
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