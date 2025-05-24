const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../model/user.model');

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const register = async (req, res) => {
  const { name, email, number, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = await UserModel.create({
      name,
      email,
      number,
      password
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          number: user.number,
          token: generateToken(user)
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check for user email
    const user = await UserModel.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email does not exist'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log("req.body",isMatch)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Wrong password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        token: generateToken(user)
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

module.exports = {register,login}