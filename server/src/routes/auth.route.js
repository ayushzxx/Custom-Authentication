const express = require('express');
const userController = require('../controllers/auth.controllers');

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/verify-email', userController.verifyEmail);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.post('/logout', userController.logoutUser)




module.exports = router;