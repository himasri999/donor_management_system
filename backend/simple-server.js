const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@example.com' && password === 'admin123') {
    res.json({ 
      token: 'fake-token-for-testing',
      user: { id: 1, email: 'admin@example.com' }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const PORT = 3000;
console.log('Starting server...');
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('Test login: POST http://localhost:3000/api/auth/login');
});