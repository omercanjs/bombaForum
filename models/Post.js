const mongoose = require('mongoose');

//mongo db şeması aynı mysql gibi fakat daha modern ve hızlı
const replySchema = new mongoose.Schema({
  user: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
  replies: [replySchema],
  reported: { type: Boolean, default: false },
  reportedReplies: [{
    replyId: String,
    user: String,
    date: { type: Date, default: Date.now }
  }],
  reportedBy: {
    type: [String],
    default: []
  }
  
});

module.exports = mongoose.model('Post', postSchema);
