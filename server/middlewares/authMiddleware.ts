import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface AuthRequest extends Request {
  user?: any;
}

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized!!' });
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret_key',
    );
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token expire or invalid!' });
  }
};
