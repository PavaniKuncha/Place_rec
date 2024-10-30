import { createReadStream, createWriteStream } from "fs";
import { createCipheriv } from "crypto";
import path from "path";

const configFile = path.join("./src/config/auth.json");
const encryptedfile = path.join("./src/config/auth.json.enc");
const key = process.argv[process.argv.length - 1];
const iv1 = "wF2kRE4CQayRFc86";

const input = createReadStream(configFile);
const cipher = createCipheriv("aes-256-cbc", key, iv1);
const output = createWriteStream(encryptedfile);

input.pipe(cipher).pipe(output);

output.on("finish", () => {
  console.log("Encrypted file written to disk!");
});