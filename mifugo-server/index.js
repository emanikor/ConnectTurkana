process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
require('dotenv').config()

const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')

const authRoutes = require('./routes/auth')
const priceRoutes = require('./routes/prices')

const app = express()

// ── MIDDLEWARE ────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())

// ── ROUTES ────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/prices', priceRoutes)

// ── HEALTH CHECK ──────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Mifugo Connect API is running' })
})

// ── GLOBAL ERROR HANDLER ──────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500).json({ message: err.message || 'Server error' })
})

// ── CONNECT DB + START SERVER ─────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })