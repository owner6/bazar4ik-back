import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getUserAds } from '../controllers/adsUser.controller.js';

const router = Router();

// A route to receive all user announcements
router.get('/', getUserAds, authMiddleware);

export default router;
