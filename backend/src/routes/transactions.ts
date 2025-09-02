import { Router } from 'express';
import jwt from 'jsonwebtoken';
import type { Database } from '../database/index.js';
import type { ApiResponse, Portfolio } from '../../../shared/src/types/index.js';

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

export function transactionRoutes(db: Database) {
  const router = Router();

  router.get('/portfolio', authenticateToken, async (req: any, res) => {
    try {
      const transactions = await db.getUserTransactions(req.userId);
      
      const completedTransactions = transactions.filter(tx => tx.status === 'completed');
      const totalBalance = completedTransactions.reduce((acc, tx) => {
        if (tx.type === 'mint') return acc + tx.amount;
        if (tx.type === 'redeem') return acc - tx.amount;
        return acc;
      }, 0);

      const portfolio: Portfolio = {
        totalBalance,
        stablecoinHoldings: totalBalance,
        transactions
      };

      res.json({
        success: true,
        data: portfolio
      } as ApiResponse<Portfolio>);
    } catch (error) {
      console.error('Portfolio fetch error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse);
    }
  });

  router.post('/mint', authenticateToken, async (req: any, res) => {
    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Valid amount is required'
        } as ApiResponse);
      }

      const transaction = await db.createTransaction({
        userId: req.userId,
        type: 'mint',
        amount: parseFloat(amount),
        status: 'completed'
      });

      res.status(201).json({
        success: true,
        data: transaction
      } as ApiResponse);
    } catch (error) {
      console.error('Mint transaction error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse);
    }
  });

  router.post('/redeem', authenticateToken, async (req: any, res) => {
    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Valid amount is required'
        } as ApiResponse);
      }

      const transactions = await db.getUserTransactions(req.userId);
      const completedTransactions = transactions.filter(tx => tx.status === 'completed');
      const currentBalance = completedTransactions.reduce((acc, tx) => {
        if (tx.type === 'mint') return acc + tx.amount;
        if (tx.type === 'redeem') return acc - tx.amount;
        return acc;
      }, 0);

      if (currentBalance < parseFloat(amount)) {
        return res.status(400).json({
          success: false,
          error: 'Insufficient balance'
        } as ApiResponse);
      }

      const transaction = await db.createTransaction({
        userId: req.userId,
        type: 'redeem',
        amount: parseFloat(amount),
        status: 'completed'
      });

      res.status(201).json({
        success: true,
        data: transaction
      } as ApiResponse);
    } catch (error) {
      console.error('Redeem transaction error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse);
    }
  });

  return router;
}