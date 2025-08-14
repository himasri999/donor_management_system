import { Router } from 'express';
import { login, register, loginValidation } from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginValidation, login);
router.post('/register', loginValidation, register);

export default router;