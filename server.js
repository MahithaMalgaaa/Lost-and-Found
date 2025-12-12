const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes'); // 1. NEW IMPORT
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://127.0.0.1:27017/lost-and-found')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Failed to connect:', err));

app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes); // 2. NEW ROUTE

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});