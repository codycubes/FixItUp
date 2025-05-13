import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Config
import config from './config/config';

// Database
import connectDB from './config/db';

// Routes
import authRoutes from './routes/auth.routes';

// Middleware
import { errorHandler } from './middleware/error.middleware';

// Connect to MongoDB
connectDB();

// Create Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to FixItUp API',
    environment: config.nodeEnv
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
}); 