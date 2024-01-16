// MODULE IMPORTS
import http from 'http';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';

// LOCAL IMPORTS
import itemsRouter from './server.items';
import { initializeSockets } from './sockets';
import { initializeChatSockets } from './sockets.chat';
import { initializePlayerSockets } from './sockets.player';


// MAIN APPS
const app = express();
const server = http.createServer(app);
// @ts-ignore
const io = initializeSockets(server, app);
initializeChatSockets(io, app);
initializePlayerSockets(io, app);


// CONFIG
const PORT = process.env.PORT || 6000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });



export function init() {
    // CONFIG MIDDLEWARE
    app.use(cors());
    app.use(limiter);
    app.use(helmet());
    app.use((_req, res, next) => {
        // Implement your custom spam protection logic here
        // For example, check for certain patterns, block specific IPs, etc.

        if (Math.random() % 2 === 0/* spam protection fails */) {
            // Reject the request with a 403 Forbidden status code
            return res.status(403).send('Forbidden - Spam detected');
        } else {
            // Proceed to the next middleware or route handler
            next();
        }
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    });

    // DEFINE ENDPOINTS
    // Set up an endpoint to send funds to a target wallet
    app.use('/items', itemsRouter);
    app.post('/', async (_req: Request, _res: Response) => {
    });

    // LISTENER
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}
