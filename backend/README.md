# FixItUp Backend API

A RESTful API backend built with Express, MongoDB, and TypeScript with authentication functionality.

## Features

- User authentication with JWT
- MongoDB database with Mongoose ODM
- TypeScript for type safety
- Error handling middleware
- Express framework

## Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/fixitup
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

### Development

Run the server in development mode:
```
npm run dev
```

### Production Build

Build for production:
```
npm run build
```

Start the production server:
```
npm start
```

## API Endpoints

### Authentication

- **Register a User**
  - `POST /api/auth/register`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "123456" }`

- **Login**
  - `POST /api/auth/login`
  - Body: `{ "email": "john@example.com", "password": "123456" }`

- **Get Current User**
  - `GET /api/auth/me`
  - Headers: `Authorization: Bearer YOUR_TOKEN` 