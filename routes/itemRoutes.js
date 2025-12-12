const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const multer = require('multer');
const auth = require('../middleware/authMiddleware');

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// ROUTE 1: GET ALL ITEMS
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().populate('postedBy', 'name');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ROUTE 2: CREATE A NEW ITEM
router.post('/', auth, upload.single('image'), async (req, res) => {
    const newItem = new Item({
        type: req.body.type,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        image: req.file ? req.file.path : null, 
        contact: req.body.contact,
        postedBy: req.user.id 
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// ... existing GET / route ...

// 👇 NEW ROUTE: GET LOGGED IN USER'S ITEMS
router.get('/my-items', auth, async (req, res) => {
    try {
        // Find items where postedBy matches the User ID from the token
        const items = await Item.find({ postedBy: req.user.id }).populate('postedBy', 'name');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ... existing PUT /:id route ...

// ROUTE 3: UPDATE STATUS (Owner Only)
router.put('/:id', auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        
        if (item.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        item.status = 'Solved';
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ROUTE 4: DELETE ITEM (Owner OR Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        
        if (!item) return res.status(404).json({ message: "Item not found" });

        // 👇 UPDATED SECURITY CHECK
        // Allow if: (User is Owner) OR (User is Admin)
        if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: "Not authorized" });
        }

        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;