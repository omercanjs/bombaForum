const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// tüm kullanıcıları görme (only admin kullancıı görebilr)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.find({}, { password: 0 }); 
  res.json(users);
});

// kullanıcılara admin verme
router.put('/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { isAdmin } = req.body;
  await User.findByIdAndUpdate(req.params.id, { isAdmin });
  res.json({ message: 'Yetki güncellendi' });
});

//kullanıcıı silme
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Kullanıcı silindi' });
});

module.exports = router;
