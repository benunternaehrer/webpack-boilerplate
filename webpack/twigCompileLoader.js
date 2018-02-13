const execSync = require(`child_process`).execSync;


// executes the index.js and returns nothing, just to use the webpack watcher
module.exports = () => {
    execSync(`node index.js`);
    return ``;
};