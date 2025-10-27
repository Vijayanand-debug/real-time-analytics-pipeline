import express, { Request, Response } from 'express';
import { fetchDailyActiveUsers, fetchTopEvents } from '../services/stats.services.js';
import { getLastSevenDays } from '../utils.js';

const router = express.Router();

router.get('/daily-active-users', async (req: Request, res: Response) => {
    try {
        const lastSevenDaysData = await fetchDailyActiveUsers();
        res.status(200).json({ status: 'success', lastSevenDaysData });
    } catch (error) {
        console.error('Failed to fetch events:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.get('/top-events', async (req: Request, res: Response) => {
    try {
        const topEvents = await fetchTopEvents();
        res.status(200).json({ status: 'success', topEvents });
    } catch (error) {
        console.error('Failed to fetch events:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

export default router;