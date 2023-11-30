const express = require('express') 
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router
    .route('/')
    .get(AuthController.signIn)
    .post(AuthController.signUp)

module.exports = router;