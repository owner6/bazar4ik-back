import { Router } from 'express';
import { updateUserListing } from '../../controllers/Listings/updateUserListing.controller.js';


const router = Router();

router.put('/', updateUserListing)

export default router;