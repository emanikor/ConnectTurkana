// // TOP OF THE FILE: Make sure you import axios
// const axios = require('axios');
// const Livestock = require('../models/Livestock'); // Your MongoDB Model

// // THIS IS YOUR FUNCTION
// const createLivestockEntry = async (req, res) => {
//     try {
//         // 1. SAVE TO MONGODB (The "Live" App DB)
//         // This ensures the data is saved for your React app immediately
//         const mongoData = await Livestock.create({
//             animal_type: req.body.animal_type,
//             price: req.body.price,
//             location: req.body.location || 'Lodwar',
//             description: req.body.description
//         });

//         console.log("✅ Saved to MongoDB");

//         // 2. THE BRIDGE: Send to FastAPI (The AI "Brain")
//         // This sends a COPY to the PostgreSQL database on port 8000
//         try {
//             await axios.post('http://localhost:8000/sync-data', {
//                 animal: req.body.animal_type,
//                 price: req.body.price,
//                 location: req.body.location || 'Lodwar'
//             });
//             console.log("🚀 AI Agent Synced!");
//         } catch (aiErr) {
//             // We use a separate try/catch so that if the AI is OFF, 
//             // the main app still works and doesn't crash.
//             console.error("⚠️ AI Project is offline, but Mongo is safe.");
//         }

//         // Return the saved data to your React Frontend
//         res.status(201).json(mongoData);

//     } catch (err) {
//         res.status(400).json({ message: "Error saving data", error: err.message });
//     }
// };

// module.exports = { createLivestockEntry };