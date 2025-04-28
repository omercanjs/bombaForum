const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Kayıt
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  await user.save();
  res.json({ message: 'Kayıt başarılı' });
});

// Giriş
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Hatalı şifre' });

  const token = jwt.sign(
    { id: user._id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );

  res.cookie('token', token, { httpOnly: true }).json({ message: 'Giriş başarılı' });
});


router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});


router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Çıkış yapıldı' });
});

module.exports = router;
