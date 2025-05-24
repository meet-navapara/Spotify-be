const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserModel.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ message: 'User not found' });

      req.user = { email: user.email, id: user._id };
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token', error: err.message });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = protect;
