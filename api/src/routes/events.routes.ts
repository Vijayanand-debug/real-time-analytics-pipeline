import express, { Request, Response } from 'express';
import { fetchRecentEvents } from '../services/events.services.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const eventInfo = await fetchRecentEvents();
        res.status(200).json({ status: 'success', eventInfo });
    } catch (error) {
        console.error('Failed to fetch events:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

export default router;