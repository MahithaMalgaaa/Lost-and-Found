const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // 👇 NEW FIELD: Role
    role: { 
        type: String, 
        default: 'user', // Everyone starts as a normal user
        enum: ['user', 'admin'] // Only these two values are allowed
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);