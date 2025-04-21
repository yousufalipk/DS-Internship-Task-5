import express from 'express';
const router = express();
import { registerUser, loginUser, logoutUser, referesh } from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/referesh', referesh);


export default router;