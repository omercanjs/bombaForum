const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Giriş yapınız' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'yanlış token' });
  }
}
// giren kullnıcınnın admin olup olmadığını kontrol edr
function verifyAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) return next();
    return res.status(403).json({ message: 'Yetkisiz' });
  }

module.exports = { verifyToken, verifyAdmin };
