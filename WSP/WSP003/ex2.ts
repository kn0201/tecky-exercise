const fs = require("fs");
import path from "path";

async function checkFile(path: string) {
  try {
    const stats = await fs.promises.stat(path);
    return stats.isDirectory();
  } catch (err) {
    console.log(err);
  }
}

async function listAllJsRecursive(targetPath: string) {
  try {
    let data = await fs.promises.readdir(targetPath);
    for (let filename of data) {
      let newPath: string = path.join(targetPath, filename);
      if (await checkFile(newPath)) {
        await listAllJsRecursive(newPath);
      } else if (filename.endsWith(".js")) {
        console.log(newPath);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

listAllJsRecursive("/Users/kn0201/Desktop/Code/Tecky/WEF");
