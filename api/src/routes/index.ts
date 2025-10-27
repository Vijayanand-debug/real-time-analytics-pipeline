import { Router } from "express";
import eventRoutes from '../routes/events.routes.js';
import trackRoutes from '../routes/track.routes.js';
import statsRoutes from '../routes/stats.routes.js';
import kpisRoutes from '../routes/kpis.routes.js';

const router = Router();

router.use('/events', eventRoutes);
router.use('/track', trackRoutes);
router.use('/stats', statsRoutes);
router.use('/kpis', kpisRoutes);

export default router;