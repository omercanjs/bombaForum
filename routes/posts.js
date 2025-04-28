const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// response ile tüm konuları gösterir
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

// yen ikonu açma
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({
    title,
    content,
    author: req.user.username
  });
  await newPost.save();
  res.json({ message: 'Konu oluşturuldu' });
});

// konu altlarına reply açma
router.post('/:id/reply', verifyToken, async (req, res) => {
  const { message } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Konu bulunamadı' });

  post.replies.push({ user: req.user.username, message });
  await post.save();
  res.json({ message: 'Cevap eklendi' });
});

// admin check yapıp konu silme isteklerini gerçekleştirir
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Konu silindi' });
});

// admin check yapip reply silme isteklerini gerçekleştirir
router.delete('/:postId/replies/:replyId', verifyToken, verifyAdmin, async (req, res) => {
  const { postId, replyId } = req.params;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: 'Konu bulunamadı' });

  post.replies = post.replies.filter(reply => reply._id.toString() !== replyId);
  await post.save();

  res.json({ message: 'Cevap silindi' });
});


// konu raporlama
router.post('/:id/report', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Konu bulunamadı' });

  if (!post.reportedBy.includes(req.user.username)) {
    post.reportedBy.push(req.user.username);
    post.reported = true;
  }
  
  await post.save();

  res.json({ message: 'Konu başarıyla raporlandı' });
});


router.post('/:id/unreport', verifyToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Yetki yok' });

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Konu bulunamadı' });

  post.reported = false;
  post.reportedBy = [];
  post.reportedReplies = [];

  console.log("TEMİZLEME BAŞLIYOR", post); 

  await post.save();

  const kontrol = await Post.findById(post._id);
  console.log("KAYITTAN SONRA:", kontrol); 

  res.json({ message: 'Rapor temizlendi' });
});





router.delete('/:postId/replies/:replyId/unreport', verifyToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Yetki yok' });

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Konu bulunamadı' });

  post.reportedReplies = post.reportedReplies.filter(r => r.replyId !== req.params.replyId);
  await post.save();

  res.json({ message: 'Yorum raporu temizlendi' });
});


router.post('/:id/reply', verifyToken, async (req, res) => {
  const { message } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Konu bulunamadı' });

  post.replies.push({
    user: req.user.username,
    message,
    date: new Date()
  });

  await post.save();
  res.json({ message: 'Cevap eklendi' });
});

router.post('/:postId/replies/:replyId/report', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Konu bulunamadı' });

  
  // raporlama spamını engeller
  const alreadyReported = post.reportedReplies.some(r =>
    r.replyId === req.params.replyId && r.user === req.user.username
  );
  if (alreadyReported) return res.status(400).json({ message: 'Zaten raporladınız' });

  post.reportedReplies.push({
    replyId: req.params.replyId,
    user: req.user.username
  });

  await post.save();
  res.json({ message: 'Yorum başarıyla raporlandı' });
});


module.exports = router;
