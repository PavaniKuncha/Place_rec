import { createReadStream, createWriteStream } from "fs";
import { createDecipheriv } from "crypto";
import path from "path";

const configFile = path.join("./src/config/auth.json");
const encryptedfile = path.join("./src/config/auth.json.enc");
const key = process.env.DECRYPT_KEY || process.argv[process.argv.length - 1];
const iv1 = "wF2kRE4CQayRFc86";


try {
  const input = createReadStream(encryptedfile);
  const decipher = createDecipheriv("aes-256-cbc", key, iv1);
  const output = createWriteStream(configFile);

  input.pipe(decipher).pipe(output);

  output.on("finish", () => {
    console.log("Decrypted file written to disk!");
  });
} catch (e) {
  console.error("No file decrypted.");
  console.error(e);
}
