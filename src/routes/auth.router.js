import { Router } from 'express';

import controller from '../controllers/auth.controller.js'

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router()

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUsers)

export default router