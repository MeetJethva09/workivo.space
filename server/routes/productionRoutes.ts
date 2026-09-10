import express from 'express';
const router = express.Router();    
import {
	createProduction,
	getProductionByUserId,
	getTodayProductionByUserId,
} from '../controllers/productionController.js';

router.post('/create', createProduction);
router.get('/user/:userId/today', getTodayProductionByUserId);
router.get('/user/:userId', getProductionByUserId);

export default router;