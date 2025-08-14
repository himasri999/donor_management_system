import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import donorRoutes from './routes/donor.routes';
import donationRoutes from './routes/donation.routes';
import communicationRoutes from './routes/communication.routes';
import errorMiddleware from './middleware/error.middleware';
import { query } from './config/db';

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

export default app;