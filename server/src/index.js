require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Database Connection Setup ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// --- JWT Verification Middleware ---
// This function will protect our user-specific routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.sendStatus(403); // Forbidden if no token is provided
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401); // Unauthorized if token is invalid
    }
    req.user = user; // Add the decoded user payload (e.g., { userId: 1 }) to the request
    next();
  });
};


// --- API Routes ---

// --- Public Routes ---

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET static data for services
app.get('/api/services', (req, res) => {
  res.json([
    { name: 'Grocery Delivery', icon: 'fa-shopping-cart' },
    { name: 'Medicine Supply', icon: 'fa-pills' },
    { name: 'Agri-Tools Rental', icon: 'fa-tractor' },
    { name: 'Bill Payments', icon: 'fa-file-invoice-dollar' },
    { name: 'Govt. Scheme Info', icon: 'fa-info-circle' },
  ]);
});

// GET static data for news
app.get('/api/news', (req, res) => {
  res.json([
    { id: 1, headline: 'New government subsidy announced for local farmers.' },
    { id: 2, headline: 'Mobile health clinic to visit the village next week.' },
    { id: 3, headline: 'Digital literacy workshop scheduled for Saturday.' },
  ]);
});

// POST a contact message
app.post('/api/contact', async (req, res) => {
    const { name, message } = req.body;
    try {
        const query = 'INSERT INTO contacts (name, message) VALUES ($1, $2) RETURNING *';
        const { rows } = await pool.query(query, [name, message]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Authentication Routes ---

// POST /api/register - User Registration
app.post('/api/register', async (req, res) => {
    const { username, password, phone } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        
        const query = 'INSERT INTO users (username, password_hash, phone) VALUES ($1, $2, $3) RETURNING id, username';
        const { rows } = await pool.query(query, [username, password_hash, phone]);

        res.status(201).json({ message: 'User registered successfully', user: rows[0] });
    } catch (err) {
        // Check for unique constraint violation (username already exists)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Username already exists.' });
        }
        res.status(500).json({ error: err.message });
    }
});

// POST /api/login - User Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const { rows } = await pool.query(userQuery, [username]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token, userId: user.id, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- Protected User Routes (Require Authentication) ---

// GET /api/user/:id - Get a user's profile information
app.get('/api/user/:id', verifyToken, async (req, res) => {
    // Ensure the logged-in user is requesting their own data
    if (req.user.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ error: "You are not authorized to view this profile." });
    }
    try {
        const query = 'SELECT id, username, phone, created_at FROM users WHERE id = $1';
        const { rows } = await pool.query(query, [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/user/:id/bookings - Get all bookings for a user
app.get('/api/user/:id/bookings', verifyToken, async (req, res) => {
    if (req.user.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ error: "You are not authorized to view these bookings." });
    }
    try {
        const query = 'SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC';
        const { rows } = await pool.query(query, [req.params.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ** NEW ** POST /api/user/:id/bookings - Create a new booking
app.post('/api/user/:id/bookings', verifyToken, async (req, res) => {
    if (req.user.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ error: "You are not authorized to create a booking for this user." });
    }
    const { products } = req.body; // Expecting an array of product names, e.g., ["Milk", "Bread"]
    
    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Products must be a non-empty array.' });
    }

    // For the prototype, we store the product list as a simple comma-separated string.
    const productsText = products.join(', ');

    try {
        const query = 'INSERT INTO bookings (user_id, products) VALUES ($1, $2) RETURNING *';
        const { rows } = await pool.query(query, [req.params.id, productsText]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/user/:id - Update a user's profile
app.put('/api/user/:id', verifyToken, async (req, res) => {
    if (req.user.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ error: "You are not authorized to edit this profile." });
    }
    const { phone } = req.body;
    try {
        const query = 'UPDATE users SET phone = $1 WHERE id = $2 RETURNING id, username, phone, created_at';
        const { rows } = await pool.query(query, [phone, req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
  res.send('Server is live and running! ');
})


// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
