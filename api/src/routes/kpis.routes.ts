import express, { Request, Response } from 'express';
import { fetchKpis } from '../services/kpis.services.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const kpiData = await fetchKpis();
        res.status(200).json({ status: 'success', kpiData });
    } catch (error) {
        console.error('Failed to fetch events:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


export default router;