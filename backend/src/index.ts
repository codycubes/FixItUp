import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Config
import config from './config/config';

// Database
import connectDB from './config/db';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import issueRoutes from './routes/issue.routes';
import categoryRoutes from './routes/category.routes';
import municipalityRoutes from './routes/municipality.routes';
import corporationRoutes from './routes/corporation.routes';

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
app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/municipalities', municipalityRoutes);
app.use('/api/corporations', corporationRoutes);

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