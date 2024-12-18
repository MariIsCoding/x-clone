import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import  {login, logout, signup, getUser} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user',protectRoute, getUser);

export default router;