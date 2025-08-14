const { body, validationResult } = require('express-validator');
const { AuthService } = require('../services/auth.service');
const logger = require('../utils/logger');

const authService = new AuthService();

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await authService.login(email, password);
    
    logger.info(`User logged in: ${email}`);
    res.json(result);
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);
    res.status(401).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await authService.register(email, password);
    
    logger.info(`User registered: ${email}`);
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { login, register, loginValidation };