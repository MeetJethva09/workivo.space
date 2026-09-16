import express from 'express';
import { createUser, getAllUsers, getUser, login } from '../controllers/userController.js';
import { authenticationMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', login);
router.get("/user/:id" , authenticationMiddleware , getUser);
router.get("/" , authenticationMiddleware , getAllUsers);

export default router;
