import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/auth.service';
import logger from '../utils/logger';

const authService = new AuthService();

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await authService.login(email, password);
    
    logger.info(`User logged in: ${email}`);
    res.json(result);
  } catch (error: any) {
    logger.error(`Login failed: ${error.message}`);
    res.status(401).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await authService.register(email, password);
    
    logger.info(`User registered: ${email}`);
    res.status(201).json(user);
  } catch (error: any) {
    logger.error(`Registration failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};