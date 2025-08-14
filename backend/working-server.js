const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { query } = require('./src/config/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Auth route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'admin123') {
      const result = await query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      if (user) {
        res.json({ 
          token: 'test-token-123',
          user: { id: user.id, email: user.email }
        });
      } else {
        res.status(401).json({ message: 'User not found' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Donor routes
app.get('/api/donors', async (req, res) => {
  try {
    const result = await query('SELECT * FROM donors ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/donors', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const result = await query(
      'INSERT INTO donors (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating donor:', error);
    res.status(400).json({ message: error.message });
  }
});

// Donation routes
app.get('/api/donations', async (req, res) => {
  try {
    const result = await query(`
      SELECT d.*, don.name as donor_name 
      FROM donations d 
      LEFT JOIN donors don ON d.donor_id = don.id 
      ORDER BY d.donation_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/donations', async (req, res) => {
  try {
    const { donor_id, amount } = req.body;
    const result = await query(
      'INSERT INTO donations (donor_id, amount) VALUES ($1, $2) RETURNING *',
      [donor_id, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(400).json({ message: error.message });
  }
});

// Communication routes
app.get('/api/communications', async (req, res) => {
  try {
    const result = await query(`
      SELECT c.*, d.name as donor_name 
      FROM communications c 
      LEFT JOIN donors d ON c.donor_id = d.id 
      ORDER BY c.communication_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/communications', async (req, res) => {
  try {
    const { donor_id, message } = req.body;
    const result = await query(
      'INSERT INTO communications (donor_id, message) VALUES ($1, $2) RETURNING *',
      [donor_id, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating communication:', error);
    res.status(400).json({ message: error.message });
  }
});

// Test database and start server
query('SELECT NOW()')
  .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log('Available routes:');
      console.log('  POST /api/auth/login');
      console.log('  GET  /api/donors');
      console.log('  POST /api/donors');
      console.log('  GET  /api/donations');
      console.log('  POST /api/donations');
      console.log('  GET  /api/communications');
      console.log('  POST /api/communications');
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
  });