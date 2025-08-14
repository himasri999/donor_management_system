const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const donorRoutes = require('./routes/donor.routes');
const donationRoutes = require('./routes/donation.routes');
const communicationRoutes = require('./routes/communication.routes');
const errorMiddleware = require('./middleware/error.middleware');
const { query } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test database connection
query('SELECT NOW()')
  .then(() => {
    console.log('Database connected successfully');
    
    app.use('/api/auth', authRoutes);
    app.use('/api/donors', donorRoutes);
    app.use('/api/donations', donationRoutes);
    app.use('/api/communications', communicationRoutes);
    
    app.use(errorMiddleware);
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

module.exports = app;