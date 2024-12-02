import { Router } from 'express';

import { authMiddleware } from "../middleware/auth.middleware.js";
import authController from "../controllers/auth.controller.js";
import { createListingAction, getUserListingsAction, updateUserListingAction, deleteListingAction, deactivateListingAction} from "../controllers/listings.controller.js";

const router = Router();

// Auth routes
router.post('/auth/registration', authController.registration);
router.post('/auth/login', authController.login);

// Users routes
router.get('/users', authMiddleware, authController.getUsers)

// Listings routes
router.post('/listings', authMiddleware, createListingAction);
router.get('/listings', authMiddleware, getUserListingsAction);
router.get('/listings/:id', () => {});
router.put('/listings/:id', authMiddleware, updateUserListingAction);
router.delete('/listings/:id', authMiddleware, deleteListingAction);
router.patch('/listings/:id/deactivate', authMiddleware,   deactivateListingAction);
//router.get("/inactive", getInactiveListings);

export default router;