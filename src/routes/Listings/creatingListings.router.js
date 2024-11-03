import { Router } from 'express';
import { createListing } from '../../controllers/Listings/creatingListings.controller.js';

const router = Router();

// route for creating ads
router.post('/', createListing);

export default router;