// routes/creatingAds.router.js

import { Router } from 'express';
import { createAd } from '../controllers/creatingAds.controller.js';

const router = Router();

// route for creating ads
router.post('/', createAd);

export default router;