import { program } from 'commander';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';


import * as security from './security.js';


// initiate the settings and config
program
    .option('--k, --privateKey <privateKey>', 'Specify private key')
    // .option('-a, --apiKey <apiKey>', 'Specify API key for authentication')
    .parse(process.argv);

// ENSURE PRIVATE KEY IS PROVIDED
const options = program.opts();
if (!options.privateKey) {
    console.error('Private key is required. Please provide the private key using -k or --privateKey option.');
    process.exit(-1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load existing minted tokens from persistence file on startup
// TODO: persistance.json is stored in the root of the script, not the root of the project
const persistenceFilePath = path.join(__dirname, '../persistence.json');


// Set to store events that have already been processed
export let persistance = new Set();

// LOAD persistance:
try {
    console.log('Loading previous events... ' + persistenceFilePath);
    const persistenceData = fs.readFileSync(persistenceFilePath, 'utf-8');
    persistance = new Set(JSON.parse(persistenceData));
    console.log('Loaded existing minted tokens:', persistance);
} catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        fs.writeFileSync(persistenceFilePath, '[]', 'utf-8');
        console.log('Persistence file created.');
    } else {
        console.error('Error loading persistence file:', error);
    }
}
interface RPCEndpoint {
    name: string;
    label: string;
    contract: string;
    url: string;
}

// Neo blockchain configuration
export const privateKey = security.encrypt(options.privateKey);
delete options.privateKey;

export const endpoints: RPCEndpoint[] = [{
    name: "Neo",
    label: "N3TestNet",
    contract: "0x77676ec6aa21fcdc95257c1a5c1867b8f55ff76d",
    url: "https://testnet1.neo.coz.io:443",
},
{
    name: "Neo",
    label: "N3MainNet",
    contract: "0x202185e5053c194a17579ed8fcc9be0687b96a39",
    url: "http://seed1.neo.org:10332",
}
];

let saveUpdate = false;
setInterval(savePersistance, 5000);

// Function to save minted tokens to persistence file
// setup is hybrid to prevent multiple reads to disk and accidental overrides
export function savePersistance(id?: string) {
    // console.log("savePersistance", id, "save?:", saveUpdate)
    if (id) {
        persistance.add(id);
        saveUpdate = true;
    }
    else {
        if (!saveUpdate) return;
        try {
            const dataToSave = JSON.stringify(Array.from(persistance));
            fs.writeFileSync(persistenceFilePath, dataToSave, 'utf-8');
            console.log('Event saved to persistence file');
            saveUpdate = false;
        } catch (error) {
            console.error('Error saving event tokens to persistence file:', error);
        }
    }
}


export function load() {
    // this is used to hotload scripts into the main process
    console.log("Load config");
}
