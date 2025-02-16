import express from 'express';
import { authenticateUser, loginUser, registerUser } from '../controller/user.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/auth', authenticateUser);


export default router;