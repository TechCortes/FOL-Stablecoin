import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Database } from '../database/index.js';
import type { LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../../../shared/src/types/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fol-capital-dev-secret-2024';

export function authRoutes(db: Database) {
  const router = Router();

  router.post('/register', async (req, res) => {
    try {
      const { email, password, name }: RegisterRequest = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        } as ApiResponse);
      }

      const existingUser = await db.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User already exists with this email'
        } as ApiResponse);
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const user = await db.createUser(email, passwordHash, name);

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        success: true,
        data: { user, token }
      } as ApiResponse<AuthResponse>);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password }: LoginRequest = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        } as ApiResponse);
      }

      const userWithHash = await db.findUserByEmail(email);
      if (!userWithHash) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        } as ApiResponse);
      }

      const isValidPassword = await bcrypt.compare(password, userWithHash.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        } as ApiResponse);
      }

      const { passwordHash, ...user } = userWithHash;
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        success: true,
        data: { user, token }
      } as ApiResponse<AuthResponse>);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse);
    }
  });

  router.post('/verify', async (req, res) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          error: 'Token is required'
        } as ApiResponse);
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await db.findUserById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid token'
        } as ApiResponse);
      }

      res.json({
        success: true,
        data: user
      } as ApiResponse);
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({
        success: false,
        error: 'Invalid token'
      } as ApiResponse);
    }
  });

  return router;
}