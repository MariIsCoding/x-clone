import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserProfile } from '../controllers/userController.js';



const router = express.Router();

router.get('/profile/:username',protectRoute, getUserProfile);
// router.get('/suggested', protectRoute, getUserProfile);
// router.post('/follow/:id', protectRoute, toggleFollow);
// router.post('/update', protectRoute, updateUserProfile);

export default router;