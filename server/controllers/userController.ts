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
  const { emailOrMobile, password } = req.body;

  if (!emailOrMobile || !password) {
    res
      .status(400)
      .json({ message: 'Email/mobile  are required!!' });
    return;
  }
  const user = await userModel.findOne({
    $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
  })

  if (!user || !user.password) {
    res.status(400).json({ message: 'User not found!!' });
    return;
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid password!!' });
    return;
  }
  const token = generateToken(user);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Login successful', user, token });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id; // Assuming the user ID is passed as a route parameter
  // Find the user by ID
  const user = await userModel.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).json({ message: 'User found', data: user });
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userModel.find();
  res.status(200).json({ message: 'Users found', data: users });
});