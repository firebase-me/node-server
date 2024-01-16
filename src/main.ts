// import and load config/persistance
import * as config from './config/config.js';

// start and monitor server
import * as server from './connections/server.js';

// LOAD CONFIG
config.load();

// INITIATE SERVICES
server.init();

// HANDLE STATE PERSISTANCE
process.on('SIGINT', () => {
    // ON FORCE CLOSE
    // config.savePersistance();
    process.exit();
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error here or log it as needed
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // config.savePersistance();

    // process.exit(1);
});