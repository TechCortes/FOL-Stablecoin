import { Router } from 'express';
import jwt from 'jsonwebtoken';
import type { Database } from '../database/index.js';
import type { ApiResponse } from '../../../shared/src/types/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fol-capital-dev-secret-2024';

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    } as ApiResponse);
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token'
      } as ApiResponse);
    }
    req.userId = decoded.userId;
    next();
  });
}

export function userRoutes(db: Database) {
  const router = Router();

  router.get('/profile', authenticateToken, async (req: any, res) => {
    try {
      const user = await db.findUserById(req.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        } as ApiResponse);
      }

      res.json({
        success: true,
        data: user
      } as ApiResponse);
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse);
    }
  });

  return router;
}