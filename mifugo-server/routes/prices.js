const express = require('express')
const axios = require('axios') 
const { Price } = require('../models')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

// 1. GET all prices
router.get('/', async (req, res) => {
  try {
    const prices = await Price.find()
      .sort({ created_at: -1 })
      .limit(50)
    res.json({ prices })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// 2. POST a new price (The Bridge)
router.post('/', protect, authorize('admin', 'officer'), async (req, res) => {
  try {
    const { animal, market, price, demand } = req.body

    if (!animal || !market || !price || !demand) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    //  Save to MongoDB
    const newPrice = await Price.create({
      animal,
      market,
      price,
      demand,
      entered_by: req.user._id,
      entered_by_name: req.user.full_name
    })

    //  THE BRIDGE - Sync to FastAPI (Port 8000)
    try {
      await axios.post('http://localhost:8000/sync-data', {
        animal: animal,
        price: price,
        location: market // Mapping 'market' to 'location' for AI
      })
      console.log("AI Agent Synced: Data sent to PostgreSQL")
    } catch (aiErr) {
      console.error(" AI Project is offline. Data saved to Mongo only.")
    }

    res.status(201).json({
      message: 'Price recorded successfully',
      price: newPrice
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// 3. DELETE a price
router.delete('/:id', protect, authorize('admin','officer'), async (req, res) => {
  try {
    const price = await Price.findByIdAndDelete(req.params.id)
    if (!price) {
      return res.status(404).json({ message: 'Price not found' })
    }
    res.json({ message: 'Price deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router