const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { query } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load routes
const authRoutes = require('./routes/auth.routes');
const donorRoutes = require('./routes/donor.routes');
const donationRoutes = require('./routes/donation.routes');
const communicationRoutes = require('./routes/communication.routes');

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/communications', communicationRoutes);

// Simple auth route without external dependencies
app.post('/api/auth/login-simple', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (email === 'admin@example.com' && password === 'admin123') {
      // Test database connection
      const result = await query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      
      if (user) {
        res.json({ 
          token: 'test-token-123',
          user: { id: user.id, email: user.email }
        });
      } else {
        res.status(401).json({ message: 'User not found in database' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Test database connection on startup
query('SELECT NOW()')
  .then(() => {
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log('Test login: POST http://localhost:3000/api/auth/login');
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
  });