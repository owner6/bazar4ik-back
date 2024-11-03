import { Router } from 'express';
import { getUserListings } from '../../controllers/Listings/userListings.controller.js';

const router = Router();

// A route to receive all user announcements
router.get('/', getUserListings);

export default router;
