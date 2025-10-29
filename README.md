# 🚀 Crypto Tracker - Full Stack MERN Application

A modern, responsive cryptocurrency dashboard that displays real-time data for the top 10 cryptocurrencies with interactive charts, theme switching, and automated data collection.

## 🌐 Live Demo

- **Frontend**: [https://crypto-tracker-frontend.vercel.app](https://crypto-tracker-frontend.vercel.app)
- **Backend API**: [https://crypto-tracker-backend.onrender.com](https://crypto-tracker-backend.onrender.com)
- **API Documentation**: [https://crypto-tracker-backend.onrender.com/api/health](https://crypto-tracker-backend.onrender.com/api/health)

![Crypto Tracker Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Crypto+Tracker+Dashboard)

## 🌟 Features

- **Real-time Data**: Live cryptocurrency prices from CoinGecko API
- **Auto-refresh**: Updates every 30 minutes automatically
- **Historical Tracking**: Hourly data collection via cron jobs
- **Dark/Light Theme**: Beautiful theme toggle with smooth transitions
- **Search & Filter**: Find cryptocurrencies by name or symbol
- **Sorting**: Sort by price, market cap, 24h change, and more
- **Interactive Charts**: Historical price visualization with Chart.js
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Error Handling**: Graceful error states and retry functionality

## 🛠️ Tech Stack

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

## 📦 Project Structure

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

## 🚀 Setup and Installation

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
| **Frontend**    | [https://crypto-tracker-frontend.vercel.app](https://crypto-tracker-frontend.vercel.app)                         | 🟢 Online |
| **Backend API** | [https://crypto-tracker-backend.onrender.com](https://crypto-tracker-backend.onrender.com)                       | 🟢 Online |
| **API Health**  | [https://crypto-tracker-backend.onrender.com/api/health](https://crypto-tracker-backend.onrender.com/api/health) | 🟢 Online |
| **Live Data**   | [https://crypto-tracker-backend.onrender.com/api/coins](https://crypto-tracker-backend.onrender.com/api/coins)   | 🟢 Online |

### Backend Deployment (Render)

#### Step 1: Prepare for Deployment

```bash
# Ensure your package.json has the correct scripts
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "echo 'No build step required'"
  }
}
```

#### Step 2: Deploy to Render

1. **Create Account**: Sign up at [Render.com](https://render.com)
2. **New Web Service**: Click "New" → "Web Service"
3. **Connect Repository**: Link your GitHub repository
4. **Configure Settings**:
   ```
   Name: crypto-tracker-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

#### Step 3: Environment Variables

Set these in Render dashboard:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crypto-tracker
PORT=10000
NODE_ENV=production
CLIENT_URL=https://crypto-tracker-frontend.vercel.app
COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

### Frontend Deployment (Vercel)

#### Step 1: Prepare Build Configuration

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
  },
});
```

#### Step 2: Deploy to Vercel

1. **Create Account**: Sign up at [Vercel.com](https://vercel.com)
2. **Import Project**: Click "New Project" → Import from GitHub
3. **Configure Settings**:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

#### Step 3: Environment Variables

Set in Vercel dashboard:

```env
VITE_API_URL=https://crypto-tracker-backend.onrender.com/api
VITE_NODE_ENV=production
```

### Database Setup (MongoDB Atlas)

#### Production Configuration

1. **Create Production Cluster**:

   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create M0 cluster (free tier)
   - Choose AWS/Google Cloud region closest to your users

2. **Security Configuration**:

   ```bash
   # Network Access
   IP Whitelist: 0.0.0.0/0 (for Render)

   # Database User
   Username: crypto-tracker-prod
   Password: [Generate strong password]
   Role: Atlas Admin (or custom read/write)
   ```

3. **Connection String**:
   ```
   mongodb+srv://crypto-tracker-prod:password@cluster0.abc123.mongodb.net/crypto-tracker-prod?retryWrites=true&w=majority
   ```

### Deployment Verification

#### Health Check Endpoints

```bash
# Backend health
curl https://crypto-tracker-backend.onrender.com/api/health

# Response:
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": "2h 15m 30s",
  "database": "connected"
}
```

#### Performance Monitoring

```javascript
// Monitor cron job execution
GET / api / current;
// Should return data updated within last hour

// Check API response time
GET / api / coins;
// Should respond within 500ms
```

### Continuous Deployment

#### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Production Checklist

- [ ] **Backend deployed on Render** ✅
- [ ] **Frontend deployed on Vercel** ✅
- [ ] **MongoDB Atlas configured for production** ✅
- [ ] **Environment variables set correctly** ✅
- [ ] **CORS configured for production domains** ✅
- [ ] **SSL certificates active (automatic)** ✅
- [ ] **Cron job running and saving data** ✅
- [ ] **API endpoints responding correctly** ✅
- [ ] **Frontend connecting to production API** ✅
- [ ] **Database storing data successfully** ✅

## 🔧 Development Scripts

### Server Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Client Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🧪 Testing & Development

### Development Scripts

#### Backend Commands

```bash
cd server

# Development with auto-restart
npm run dev

# Production mode
npm start

# Test API endpoints
npm run test:api
```

#### Frontend Commands

```bash
cd client

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### API Testing

#### Using Postman/Thunder Client

```bash
# Health Check
GET http://localhost:5000/api/health

# Get live crypto data
GET http://localhost:5000/api/coins

# Get cached data
GET http://localhost:5000/api/current

# Get historical data
GET http://localhost:5000/api/history/bitcoin?limit=24
```

#### Using cURL

```bash
# Test production API
curl -X GET "https://crypto-tracker-backend.onrender.com/api/health"

# Test with headers
curl -H "Content-Type: application/json" \
     -X GET "https://crypto-tracker-backend.onrender.com/api/coins"
```

### Manual Testing Checklist

#### ✅ **Backend Testing**

- [ ] Server starts without errors
- [ ] MongoDB connection established
- [ ] Cron job initializes and runs
- [ ] API endpoints return correct data
- [ ] Error handling works properly
- [ ] CORS configured correctly

#### ✅ **Frontend Testing**

- [ ] Application loads successfully
- [ ] Crypto data displays correctly
- [ ] Search and filter functionality
- [ ] Theme toggle (dark/light mode)
- [ ] Auto-refresh every 30 minutes
- [ ] Interactive charts work
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Loading states and error handling

#### ✅ **Integration Testing**

- [ ] Frontend connects to backend API
- [ ] Real-time data updates
- [ ] Historical data in charts
- [ ] Error states when API fails
- [ ] Fallback to cached data works

## 📈 Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized cryptocurrency logos
- **Caching**: Local storage for theme preferences
- **Debounced Search**: Prevents excessive API calls
- **Memoization**: React hooks for expensive calculations

## 🔒 Security Features

- **CORS**: Configured for specific origins
- **Environment Variables**: Sensitive data in env files
- **Error Handling**: No sensitive information in error messages
- **Rate Limiting**: Natural rate limiting through cron scheduling

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**

- Verify connection string in `.env`
- Check network access in MongoDB Atlas
- Ensure database user has correct permissions

**2. CORS Errors**

- Update `CLIENT_URL` in server `.env`
- Check frontend API URL configuration

**3. API Rate Limiting**

- CoinGecko has rate limits for free tier
- Implement caching to reduce API calls

**4. Build Errors**

- Clear `node_modules` and reinstall dependencies
- Check Node.js version compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

## � Project Statistics

| Metric                   | Value              |
| ------------------------ | ------------------ |
| **Total Files**          | 25+                |
| **Lines of Code**        | 2,500+             |
| **Components**           | 8 React Components |
| **API Endpoints**        | 5 REST Endpoints   |
| **Database Collections** | 1 (Crypto)         |
| **Cron Jobs**            | 1 (Hourly)         |
| **Build Time**           | ~2 minutes         |
| **Bundle Size**          | ~500KB             |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow ESLint configuration
- Write meaningful commit messages
- Test your changes locally
- Update documentation if needed

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/crypto-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/crypto-tracker/discussions)
- **Email**: support@vrautomations.com

## �🙏 Acknowledgments

- **[CoinGecko](https://www.coingecko.com/)** - Free cryptocurrency API
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** - Cloud database platform
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Chart.js](https://www.chartjs.org/)** - Interactive chart library
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon set
- **[Vercel](https://vercel.com/)** - Frontend deployment platform
- **[Render](https://render.com/)** - Backend deployment platform

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>Built with ❤️ by VR Automations</strong>
  <br />
  <sub>Making cryptocurrency data accessible to everyone</sub>
</div>
