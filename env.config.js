const fs = require('fs');
const path = require('path');

function replaceWithEnv() {
    try {
        let dirPath = process.argv[2];
        let files = fs.readdirSync(dirPath);
        let vueEnvVars = Object.keys(process.env)
            .filter((key) => key.startsWith('VUE_APP_'))
            .reduce((obj, key) => {
                obj[key] = process.env[key];
                return obj;
            }, {});
        for (let file of files) {
            let filePath = path.normalize(path.join(dirPath, file));
            let data = fs.readFileSync(filePath, 'utf8');
            for (let envVar in vueEnvVars) {
                let value = `%%${envVar}%%`;
                data = data.replace(new RegExp(value, 'g'), process.env[envVar]);
            }
            fs.writeFileSync(filePath, data, 'utf8');
        }
        let htmlPath = process.argv[3];
        let htmlFilePath = path.normalize(htmlPath);
        let data = fs.readFileSync(htmlFilePath, 'utf8');
        for (let envVar in vueEnvVars) {
            let value = `%%${envVar}%%`;
            data = data.replace(new RegExp(value, 'g'), process.env[envVar]);
        }
        fs.writeFileSync(htmlFilePath, data, 'utf8');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

replaceWithEnv();
