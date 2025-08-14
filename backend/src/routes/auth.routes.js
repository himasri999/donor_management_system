const { Router } = require('express');
const { login, register, loginValidation } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', loginValidation, login);
router.post('/register', loginValidation, register);

module.exports = router;