import express from 'express';
import { createUser, getAllUsers, getUser, login, updateUserPassword } from '../controllers/userController.js';
import { authenticationMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', login);
router.get("/user/:id" , authenticationMiddleware , getUser);
router.get("/" , authenticationMiddleware , getAllUsers);
router.patch("/update-password" , authenticationMiddleware , updateUserPassword);

export default router;
