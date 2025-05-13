import dotenv from 'dotenv';

// Load env vars
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  jwtSecret: string;
  jwtExpire: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://boitshepomashamaite777:gqvVBNzOuU37PK2X@fixitup.7w1vynb.mongodb.net/?retryWrites=true&w=majority&appName=FixItUp',
  jwtSecret: process.env.JWT_SECRET || '123456',
  jwtExpire: process.env.JWT_EXPIRE || '30d'
};

export default config; 