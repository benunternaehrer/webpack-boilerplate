const Twig = require('twig');
const YAML = require('yamljs');
const fs = require('fs');

// Parse global yaml config
const golbalVars = YAML.load('./src/data/data-global.yml');

if(!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
}

const renderView = filename => {
    Twig.renderFile(`./src/views/${filename}`, {data: golbalVars, nodeEnv: process.env.NODE_ENV}, (err, html) => {
        fs.writeFile(`./dist/${filename.substring(2).replace('.twig', '.html')}`, html, (error) => {
            if(error) throw Error(error);
        });
    });
};

fs.readdirSync('./src/views').forEach((file) => {
    renderView(file);
});


