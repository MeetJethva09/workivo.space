import express from 'express';
import { createUser, getUser, login } from '../controllers/userController.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', login);
router.get("/user/:id" , getUser);

export default router;
