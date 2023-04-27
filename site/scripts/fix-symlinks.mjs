// Script executed before builds

import fs from "fs";

//  If Vercel environment is detected
if (process.env.VERCEL_ENV) {
  console.log(
    "[scripts/fix-symlinks.mjs] Vercel environment detected. Fixing symlinks..."
  );

  console.log(fs.readdirSync(process.cwd()))

  const pathToAssetsLn = "./public/assets";

  fs.unlinkSync(pathToAssetsLn);

  fs.symlinkSync("../../public/assets", pathToAssetsLn);
}
