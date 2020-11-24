const copy = require("./helpers/copy");
const install = require("./helpers/install");
const path = require('path');

(async ()=>{
  const root = [__dirname, "templates"].join(path.sep);
  await copy(root,"Datahub")
  await install("Datahub", true);
})().catch(e=> console.log(e));