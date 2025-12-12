const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type: { type: String, required: true }, // 'Lost' or 'Found'
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String }, // Stores the file path
    contact: { type: String, required: true },
    status: { 
        type: String, 
        default: 'Open' // Can be 'Open' or 'Solved'
    },
    
    // 👇 NEW: This stores the ID of the user who posted it
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // It links to the User model
        // required: true <--- We will leave this off for a second to prevent errors with old items
    }

}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);