import express from 'express';
import { authenticateUser, loginUser, logoutUser, registerUser } from '../controller/user.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/auth', authenticateUser);
router.post('/logout', logoutUser);

export default router;