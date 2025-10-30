# Crypto Tracker - Full Stack MERN Application

A modern, responsive cryptocurrency dashboard that displays real-time data for the top 10 cryptocurrencies with interactive charts, theme switching, and automated data collection.

## Live Demo

- **Frontend**: [https://crypto-tracker-pi-amber.vercel.app](https://crypto-tracker-pi-amber.vercel.app)
- **Backend API**: [https://crypto-tracker-t5yg.onrender.com](https://crypto-tracker-t5yg.onrender.com)
- **API Documentation**: [https://crypto-tracker-t5yg.onrender.com/api/health](https://crypto-tracker-t5yg.onrender.com/api/health)


## Features

- **Real-time Data**: Live cryptocurrency prices from CoinGecko API
- **Auto-refresh**: Updates every 30 minutes automatically
- **Historical Tracking**: Hourly data collection via cron jobs
- **Dark/Light Theme**: Beautiful theme toggle with smooth transitions
- **Search & Filter**: Find cryptocurrencies by name or symbol
- **Sorting**: Sort by price, market cap, 24h change, and more
- **Interactive Charts**: Historical price visualization with Chart.js
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Error Handling**: Graceful error states and retry functionality

## Tech Stack

### Frontend Technologies

| Technology           | Version | Purpose                                    |
| -------------------- | ------- | ------------------------------------------ |
| **React**            | 18.2.0  | Modern UI library with hooks and context   |
| **Vite**             | 4.4.5   | Lightning-fast build tool and dev server   |
| **Tailwind CSS**     | 3.3.0   | Utility-first CSS framework for styling    |
| **Chart.js**         | 4.4.0   | Interactive charts for price visualization |
| **React Chart.js 2** | 5.2.0   | React wrapper for Chart.js                 |
| **Lucide React**     | 0.279.0 | Beautiful SVG icon library                 |
| **Axios**            | 1.5.0   | Promise-based HTTP client                  |

### Backend Technologies

| Technology     | Version | Purpose                            |
| -------------- | ------- | ---------------------------------- |
| **Node.js**    | 18.x    | JavaScript runtime environment     |
| **Express.js** | 4.18.2  | Fast web application framework     |
| **MongoDB**    | 6.0+    | NoSQL database for data storage    |
| **Mongoose**   | 7.5.0   | MongoDB object modeling library    |
| **Node-cron**  | 3.0.2   | Task scheduler for automated jobs  |
| **Axios**      | 1.5.0   | HTTP client for external API calls |
| **Cors**       | 2.8.5   | Cross-origin resource sharing      |
| **Dotenv**     | 16.3.1  | Environment variable management    |

### External Services

| Service           | Purpose                       | Plan      |
| ----------------- | ----------------------------- | --------- |
| **CoinGecko API** | Real-time cryptocurrency data | Free tier |
| **MongoDB Atlas** | Cloud database hosting        | Free tier |
| **Vercel**        | Frontend deployment           | Free tier |
| **Render**        | Backend deployment            | Free tier |

## Project Structure

```
crypto-tracker/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.jsx
│   │   │   ├── SearchFilter.jsx
│   │   │   ├── CoinCard.jsx
│   │   │   ├── CoinChart.jsx
│   │   │   ├── CryptoGrid.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorComponent.jsx
│   │   ├── context/        # React Context providers
│   │   │   ├── ThemeContext.jsx
│   │   │   └── CryptoContext.jsx
│   │   ├── utils/          # Utility functions
│   │   │   └── formatters.js
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js Backend
│   ├── controllers/        # Route controllers
│   │   └── cryptoController.js
│   ├── routes/            # API routes
│   │   └── cryptoRoutes.js
│   ├── models/            # MongoDB models
│   │   └── Crypto.js
│   ├── cron/              # Cron job definitions
│   │   └── cryptoCron.js
│   ├── config/            # Configuration files
│   │   └── database.js
│   ├── index.js           # Server entry point
│   └── package.json
├── README.md
└── .env.example
```

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/atlas)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**

```bash
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crypto-tracker?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000

# API Configuration (Optional)
COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

**Start the backend server:**

```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

### Step 3: Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

**Configure your `.env.local` file:**

```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Optional: Enable development features
VITE_NODE_ENV=development
```

**Start the frontend development server:**

```bash
npm run dev
```

### Step 4: Verify Installation

Once both servers are running, you can access:

| Service          | URL                              | Status              |
| ---------------- | -------------------------------- | ------------------- |
| **Frontend**     | http://localhost:3000            | ✅ Main Application |
| **Backend API**  | http://localhost:5000/api        | ✅ API Server       |
| **Health Check** | http://localhost:5000/api/health | ✅ Server Status    |
| **Crypto Data**  | http://localhost:5000/api/coins  | ✅ Live Data        |

### Step 5: Database Setup

1. **Create MongoDB Atlas Cluster:**

   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (free tier available)
   - Create a database user with read/write permissions

2. **Configure Network Access:**

   - Add your IP address to the whitelist
   - Or add `0.0.0.0/0` for development (not recommended for production)

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string and update your `.env` file

## ⏰ Automated Cron Job System

The application features a sophisticated automated data collection system using `node-cron` that ensures continuous, reliable cryptocurrency data updates.

### How the Cron Job Works

#### 1. **Job Initialization**

```javascript
// File: server/cron/cryptoCron.js
import cron from "node-cron";
import { saveCryptoData } from "../controllers/cryptoController.js";

// Initialize cron job when server starts
export const initializeCronJob = () => {
  // Schedule hourly data collection
  cron.schedule("0 * * * *", async () => {
    console.log("🔄 Cron job started:", new Date().toISOString());
    await saveCryptoData();
  });

  // Initial data fetch after 5 seconds
  setTimeout(async () => {
    await saveCryptoData();
  }, 5000);
};
```

#### 2. **Data Collection Process**

```mermaid
graph TD
    A[Cron Job Triggers] --> B[Fetch from CoinGecko API]
    B --> C{API Response OK?}
    C -->|Yes| D[Transform Data]
    C -->|No| E[Log Error & Retry]
    D --> F[Save to MongoDB]
    F --> G[Update Timestamps]
    G --> H[Log Success]
    E --> I[Use Cached Data]
```

#### 3. **Schedule Configuration**

| Schedule     | Description                  | Cron Expression | Purpose                 |
| ------------ | ---------------------------- | --------------- | ----------------------- |
| **Hourly**   | Every hour at minute 0       | `0 * * * *`     | Primary data collection |
| **Initial**  | 5 seconds after server start | `setTimeout`    | Bootstrap data          |
| **Timezone** | UTC                          | Default         | Consistent timing       |

#### 4. **Data Processing Pipeline**

```javascript
// Data transformation and storage
const processData = async (apiData) => {
  const transformedData = apiData.map((coin) => ({
    coinId: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    marketCap: coin.market_cap,
    percentChange24h: coin.price_change_percentage_24h,
    image: coin.image,
    rank: coin.market_cap_rank,
    volume24h: coin.total_volume,
    timestamp: new Date(),
  }));

  // Batch save to database
  await Crypto.insertMany(transformedData);
};
```

### Benefits of Automated Collection

#### 📊 **Historical Data Tracking**

- **Hourly Snapshots**: Complete price history for trend analysis
- **Data Continuity**: No gaps in historical records
- **Chart Generation**: Powers interactive price charts

#### 🔄 **Reliability & Redundancy**

- **API Fallback**: Local database serves data when CoinGecko is unavailable
- **Error Handling**: Graceful degradation with retry mechanisms
- **Data Persistence**: Historical data survives API outages

#### ⚡ **Performance Optimization**

- **Reduced API Calls**: Frontend uses cached data, reducing rate limits
- **Faster Response**: Database queries are faster than external API calls
- **Bandwidth Saving**: Less external API dependency

### Monitoring & Logs

#### Console Output Example:

```bash
🚀 Server running on port 5000
⏰ Cron job initialized
🔄 Cron job started: 2024-01-15T10:00:00.000Z
✅ Successfully saved 10 cryptocurrencies to database
📊 Next update scheduled for: 2024-01-15T11:00:00.000Z
```

#### Error Handling:

```javascript
try {
  await saveCryptoData();
  console.log("✅ Cron job completed successfully");
} catch (error) {
  console.error("❌ Cron job failed:", error.message);
  // Continue operation with cached data
}
```

## 📊 API Endpoints

### GET `/api/coins`

Fetches real-time top 10 cryptocurrencies from CoinGecko API.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "coinId": "bitcoin",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 43250.5,
      "marketCap": 847234567890,
      "percentChange24h": 2.45,
      "image": "https://...",
      "rank": 1,
      "volume24h": 23456789012,
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### POST `/api/history`

Saves current data to database (used by cron job).

### GET `/api/history/:coinId`

Returns historical data for a specific coin.

**Query Parameters:**

- `limit` (optional): Number of records to return (default: 24)

### GET `/api/current`

Retrieves current data from database (fallback when API is unavailable).

### GET `/api/health`

Health check endpoint for monitoring.

## 🎨 UI/UX Features

### Dark/Light Theme

- **Toggle**: Located in the header
- **Persistence**: Theme preference saved in localStorage
- **Smooth Transitions**: 200ms CSS transitions for all elements

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Supports all screen sizes
- **Grid Layout**: Responsive card grid (1-4 columns based on screen size)

### Interactive Elements

- **Hover Effects**: Scale and color transitions
- **Loading States**: Skeleton cards and spinners
- **Error Handling**: User-friendly error messages with retry options
- **Charts**: Interactive price history visualization

## 🌍 Deployment Guide

### 🚀 Live Application Links

| Service         | URL                                                                                                              | Status    |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | --------- |
| **Frontend**    | [https://crypto-tracker-pi-amber.vercel.app/](https://crypto-tracker-pi-amber.vercel.app/)                         | 🟢 Online |
| **Backend API** | [https://crypto-tracker-t5yg.onrender.com/](https://crypto-tracker-t5yg.onrender.com)                       | 🟢 Online |
| **API Health**  | [https://crypto-tracker-t5yg.onrender.com/api/health](https://crypto-tracker-t5yg.onrender.com/api/health) | 🟢 Online |
| **Live Data**   | [https://crypto-tracker-t5yg.onrender.com/api/coins](https://crypto-tracker-t5yg.onrender.com/api/coins)   | 🟢 Online |


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
