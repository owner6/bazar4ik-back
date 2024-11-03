import { Router } from 'express';
import { getUserListings } from '../controllers/userListings.controller.js';

const router = Router();

// A route to receive all user announcements
router.get('/', getUserListings);

export default router;