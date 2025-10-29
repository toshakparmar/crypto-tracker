# Crypto Tracker Server

Node.js/Express.js backend API for the Crypto Tracker application with MongoDB integration and automated data updates.

## Features

- **RESTful API**: Express.js server with comprehensive crypto endpoints
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Automated Updates**: Cron jobs for regular data synchronization
- **CoinGecko Integration**: Real-time cryptocurrency data from CoinGecko API
- **Error Handling**: Comprehensive error handling and logging
- **Security**: Helmet, CORS, and rate limiting middleware
- **Test Mode**: Simplified server for testing without database

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your configuration
# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crypto-tracker
CLIENT_URL=http://localhost:5173
COINGECKO_API_URL=https://api.coingecko.com/api/v3
UPDATE_INTERVAL=30
```

## API Endpoints

### Base URL: `http://localhost:5000/api`

- `GET /health` - Health check
- `GET /crypto/coins` - Get all cryptocurrencies
- `GET /crypto/coins/:coinId` - Get specific cryptocurrency
- `GET /crypto/coins/:coinId/history` - Get price history
- `POST /crypto/refresh` - Force data refresh

## Database Models

### CryptoData

- Current cryptocurrency market data
- Updated automatically every 30 minutes
- Indexed for efficient querying

### PriceHistory

- Historical price data for charts
- Supports custom date ranges
- Optimized for time-series queries

## Testing

### Simple Test Server

Runs without MongoDB dependency:

```bash
node test-server-simple.js
```

### Test Script

Tests all endpoints:

```bash
node test-server.js
```

## Deployment

1. Set production environment variables
2. Ensure MongoDB is accessible
3. Run `npm start`

## Development

- Uses nodemon for hot reloading
- ESLint for code quality
- Comprehensive error logging
- Automatic data synchronization
