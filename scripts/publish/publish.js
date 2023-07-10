import { resolve } from 'path';
import { exec } from "child_process";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptsDir = resolve(__dirname);
const publishEl = resolve(__dirname, 'publish.el');

const command = `cd ${scriptsDir} && ./publish.sh`;
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
