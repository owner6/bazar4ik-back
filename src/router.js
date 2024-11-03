import { Router } from 'express';
import { createListing } from '../../controllers/Listings/creatingListings.controller.js';
import { getUserListings } from '../../controllers/Listings/userListings.controller.js';

const router = Router();

// route for creating ads
router.post('/', createListing);
router.get('/', getUserListings);

export default router;