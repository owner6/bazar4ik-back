// routes/creatingAds.router.js

import { Router } from 'express';
import { createAd } from '../controllers/creatingAds.controller.js';

const router = Router();

// Маршрут for creating ads
router.post('/creatingAds', createAd);

export default router;