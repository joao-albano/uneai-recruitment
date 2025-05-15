const express = require('express');
const { register, login, logout, getCurrentUser } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Rotas públicas - não requerem autenticação
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas - requerem autenticação
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router; 
 
 
 
 
 
 
 
 