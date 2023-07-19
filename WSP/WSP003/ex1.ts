const fs = require("fs");
import path from "path";

async function listAllJsInAsync(targetPath: string) {
  try {
    console.log("Async");
    const data = await fs.promises.readdir(targetPath);
    for (let filename of data) {
      let filePath: String = path.join(targetPath, "/" + filename);
      if (filename.endsWith(".js")) {
        console.log(filePath);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// function listAllJsInPromises(targetPath: string) {
//   console.log("Promise");
//   return fs.promises
//     .readdir(targetPath)

//     .then((filenames: string) => {
//       for (let filename of filenames) {
//         console.log(filename);
//       }
//     })

//     .catch((err: string) => {
//       console.log(err);
//     });
// }

// listAllJsInPromises("/Users/kn0201/Desktop/Code/Tecky/WEF/WEF000");

// listAllJsInAsync("/Users/kn0201/Desktop/Code/Tecky/WEF/WEF000");

async function test() {
  // await listAllJsInPromises("/Users/kn0201/Desktop/Code/Tecky/WEF/WEF000");
  await listAllJsInAsync(
    "/Users/kn0201/Desktop/Code/Tecky/WEF/WEF008 Project - GOL"
  );
}
test();
