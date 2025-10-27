import express from 'express';
import bodyParser from "body-parser";
import { producer } from '../lib/kafka.js';
import { port } from '../config/index.js';
import { createServer } from 'http';
import { startWebSocketServer } from '../lib/websocket.js';
import cors from "cors";
import { dbConfig } from "../config/index.js";
import { Pool } from 'pg';
const pool = new Pool(dbConfig);
export const producerService = async () => {
    await producer.connect();
    console.log('Kafka Producer connected');
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.post('/track', async (req, res) => {
        try {
            const event = req.body;
            if (!event || !event.type || !event.userid) {
                return res.status(400).json({ error: 'Invalid payload: type and userId are required' });
            }
            event.timestamp = new Date().toISOString();
            await producer.send({
                topic: 'events',
                messages: [
                    { value: JSON.stringify(event) },
                ],
            });
            return res.status(200).json({ status: 'success', eventInfo: event });
        }
        catch (error) {
            console.error('Error sending event to Kafka:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
    app.get('/events', async (req, res) => {
        try {
            const query = `select id, event_type as type, user_id as userid, metadata, timestamp from events order by events.id desc limit 20;`;
            const result = await pool.query(query);
            return res.status(200).json({ status: 'success', eventInfo: result.rows });
        }
        catch (error) {
            console.error('Failed to execute select query:', error);
        }
    });
    const server = createServer(app);
    startWebSocketServer(server);
    server.listen(port, () => {
        console.log(`Api server is listening on ${port}`);
    });
};
