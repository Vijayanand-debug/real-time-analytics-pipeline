import express, { type Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import { producer } from '../lib/kafka.js';
import { port } from '../config/index.js';
import { AnalyticsEvent } from '../types/types.js';
import { createServer, Server } from 'http';
import { startWebSocketServer } from '../lib/websocket.js';
import cors from "cors";
import router from '../routes/index.js';

export const producerService = async () => {
    await producer.connect();
    console.log('Kafka Producer connected');

    const app: Express = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api/services', router);
    app.use('/health', router);

    const server: Server = createServer(app);

    startWebSocketServer(server);

    server.listen(port, () => {
        console.log(`Api server is listening on ${port}`);
    });
}