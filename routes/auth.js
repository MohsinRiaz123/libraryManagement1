const express=require('express');
const router=express.Router();
const {
  signup,
  login,
  forgotPass,
  reset
} = require('../controller/auth');
router.post('/login',login);
router.post('/signup',signup);
router.post('/forgotpass',forgotPass);
router.post('/resetpass',reset);

module.exports = router;