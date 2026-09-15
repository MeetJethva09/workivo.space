import productionModel from '../models/productionModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Request, Response } from 'express';

export const createProduction = asyncHandler(
  async (req: Request, res: Response) => {
    req.body.total = req.body.craft + req.body.white;
    req.body.amount = req.body.total * 4.5;
    const production = await productionModel.create(req.body);
    res.status(201).json(production);
  },
);

export const getProductionByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter

    // Find productions by user ID
    const productions = await productionModel.find({ user: userId });
    if (!productions || productions.length === 0) {
      res.status(404).json({ message: 'No productions found for this user' });
      return;
    }

    res.status(200).json({ message: 'Productions found', data: productions });
  },
);

export const getTodayProductionByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const today = new Date().toISOString().split('T')[0];

    const productions = await productionModel.findOne({
      user: userId,
      date: today,
    });

    res.status(200).json({ message: "Today's productions found", data: productions });
  },
);

