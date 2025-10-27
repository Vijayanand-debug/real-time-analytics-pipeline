import express, { Request, Response } from 'express';
import { AnalyticsEvent } from '../types/types.js';
import { v4 } from 'uuid';
import { producer } from '../lib/kafka.js';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const event = req.body as AnalyticsEvent;

        if (!event || !event.type || !event.userid) {
            return res.status(400).json({ error: 'Invalid payload: type and userId are required' });
        }

        const eventId = v4();
        const eventPayload = {
            id: eventId,
            type: event.type,
            userid: event.userid || `guest_${Math.floor(Math.random() * 1000)}`,
            metadata: event.metadata,
            timestamp: new Date().toISOString()
        }

        await producer.send({
            topic: 'events',
            messages: [
                { value: JSON.stringify(eventPayload) },
            ],
        });
        res.status(200).json({ status: 'success', eventPayload });
    } catch (error) {
        console.error('Failed to fetch events:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

export default router;