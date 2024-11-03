import { Router } from 'express';
import { getUserAds } from '../controllers/adsUser.controller.js';

const router = Router();

// A route to receive all user announcements
router.get('/', getUserAds);

export default router;
