const express  = require('express')
const jwt      = require('jsonwebtoken')
const { User } = require('../models')
const { protect } = require('../middleware/auth')

const router = express.Router()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

// REGISTER
router.post('/register', async (req, res, next) => {
  try {
    const { full_name, phone, password, role, sub_county } = req.body

    if (!full_name || !phone || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' })
    }

    const existing = await User.findOne({ phone })
    if (existing) {
      return res.status(400).json({ message: 'Phone number already registered' })
    }

    const user = await User.create({ full_name, phone, password, role, sub_county })

    res.status(201).json({
      message: 'Account created successfully',
      token: generateToken(user._id),
      user: {
        id:         user._id,
        full_name:  user.full_name,
        phone:      user.phone,
        role:       user.role,
        sub_county: user.sub_county
      }
    })
  } catch (err) {
    next(err)
  }
})

// LOGIN
router.post('/login', async (req, res, next) => {
  try {
    const { phone, password } = req.body

    if (!phone || !password) {
      return res.status(400).json({ message: 'Please enter phone and password' })
    }

    const user = await User.findOne({ phone })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid phone number or password' })
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id:         user._id,
        full_name:  user.full_name,
        phone:      user.phone,
        role:       user.role,
        sub_county: user.sub_county
      }
    })
  } catch (err) {
    next(err)
  }
})

// GET CURRENT USER
router.get('/me', protect, async (req, res, next) => {
  try {
    res.json({ user: req.user })
  } catch (err) {
    next(err)
  }
})

// LOGOUT
router.post('/logout', protect, (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

module.exports = router