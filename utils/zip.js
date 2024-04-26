const { readFile } = require("fs/promises");
const { directory } = require("./modules/config");
const AdmZip = require("adm-zip");
const zip = new AdmZip();

const run = async () => {
  const manifest = await readFile("extension/manifest-build.json", "utf-8");
  const { name, version } = JSON.parse(manifest);
  zip.addLocalFolder(directory);
  zip.toBuffer();
  zip.writeZip(`zip/${name} v${version}.zip`);
};

run();
