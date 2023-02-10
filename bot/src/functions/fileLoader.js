/**
  * This is thanks to Lyxcode for helping me refresh on YouTube.
  */

const { glob } = require("glob");
const {promisify} = require("util");
const promisedGlob = promisify(glob);

const loadFiles = async (directoryName) => {
    const files = await promisedGlob(`${process.cwd().replace(/\\/g, "/")}/src/${directoryName}/**/*.js`);

    files.forEach((file) => delete require.cache[require.resolve(file)]);

    return files;
}

module.exports = {
    loadFiles
}