import { fileURLToPath } from "url";
import fs from "node:fs";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteFile = (file) => {
  const fileFullPath = path.join(__dirname, "../", file.path);

  fs.unlink(fileFullPath, (err) => {
    if (err) console.error(err);
    else console.log(`${fileFullPath} was deleted`);
  });
};

export default deleteFile;
