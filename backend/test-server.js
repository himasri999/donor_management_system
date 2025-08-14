const express = require('express');
const { query } = require('./src/config/db');

const app = express();
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Test database
app.get('/db-test', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('Try: http://localhost:3000/test');
});