import express from 'express';
import { signup, login, sendOtp, verifyOtp } from '../controllers/authController.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/get-otp/:mobile',sendOtp);
router.post('/verify-otp',verifyOtp);

export default router;
