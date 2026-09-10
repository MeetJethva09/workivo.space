import userModel from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Request, Response } from 'express';
import { comparePassword } from '../utils/bcryptPassword.js';
import { generateToken } from '../utils/jwt.js';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userModel.create(req.body);
  res.status(201).json(user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    res.status(400).json({ message: 'User not found!!' });
    return;
  }
  // Compare the provided password with the stored hashed password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    res.status(404).json({ message: 'Invalid password!!' });
    return;
  }
  // Generate a JWT token
  const token = generateToken(user);

  //store in cookies
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Login successful', user, token });
});
