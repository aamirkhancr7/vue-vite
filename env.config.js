const fs = require('fs');
const path = require('path');

function replaceWithEnv() {
    try {
        const dirPath = process.argv[2];
        const files = fs.readdirSync(dirPath);
        const vueEnvVars = Object.keys(process.env)
            .filter(key => key.startsWith('VUE_APP_'))
            .reduce((obj, key) => {
                obj[key] = process.env[key];
                return obj;
            }, {});
        for (const file of files) {
            const filePath = path.normalize(path.join(dirPath, file));
            let data = fs.readFileSync(filePath, 'utf8');
            for (const envVar in vueEnvVars) {
                const value = `%%${envVar}%%`;
                data = data.replace(new RegExp(value, 'g'), process.env[envVar]);
            }
            fs.writeFileSync(filePath, data, 'utf8');
        }
        const htmlPath = process.argv[3];
        const htmlFilePath = path.normalize(htmlPath);
        let data = fs.readFileSync(htmlFilePath, 'utf8');
        for (const envVar in vueEnvVars) {
            const value = `%%${envVar}%%`;
            data = data.replace(new RegExp(value, 'g'), process.env[envVar]);
        }
        fs.writeFileSync(htmlFilePath, data, 'utf8');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

replaceWithEnv();
