const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// ── USER ──────────────────────────────────────────
const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true },
  phone:     { type: String, required: true, unique: true, trim: true },
  email:     { type: String, sparse: true, trim: true, lowercase: true },
  password:  { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ['admin', 'officer', 'trader', 'vet'],
    default: 'trader'
  },
  sub_county: {
    type: String,
    enum: [
      'Turkana Central',
      'Turkana West',
      'Turkana North',
      'Turkana East',
      'Turkana South',
      'Loima'
    ]
  },
  is_verified: { type: Boolean, default: false },
  created_at:  { type: Date, default: Date.now }
})

// Hash password before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

// Method to check password on login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// ── PRICE (your existing schema) ──────────────────
  const PriceSchema = new mongoose.Schema({
  animal:       { type: String, required: true, enum: ['Cattle', 'Goat', 'Camel', 'Sheep', 'Donkey'] },
  market:       { type: String, required: true, enum: ['Lodwar', 'Kakuma', 'Kalokol', 'Lokichar', 'Lokichoggio', 'Kibish'] },
  price:        { type: Number, required: true },
  demand:       { type: String, required: true, enum: ['High', 'Medium', 'Low'] },
  entered_by:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  entered_by_name: { type: String },
  created_at:   { type: Date, default: Date.now }
})


// ── LISTING (your existing schema) ────────────────
const ListingSchema = new mongoose.Schema({
  phone:         String,
  animal:        String,
  location:      String,
  expectedPrice: Number,
  isSold:        { type: Boolean, default: false }
})

const User    = mongoose.model('User', UserSchema)
const Price   = mongoose.model('Price', PriceSchema)
const Listing = mongoose.model('Listing', ListingSchema)

module.exports = { User, Price, Listing }