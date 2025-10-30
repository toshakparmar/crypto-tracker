import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CryptoContext = createContext();

export const useCrypto = () => {
    const context = useContext(CryptoContext);
    if (!context) throw new Error('useCrypto must be used within CryptoProvider');
    return context;
};

export const CryptoProvider = ({ children }) => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [dataSource, setDataSource] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const fetchCoins = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/coins`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCoins(Array.isArray(data) ? data : data?.data || []);
        } catch (err) {
            let errorMessage = 'Failed to fetch cryptocurrency data. ';

            if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
                errorMessage += 'Please check if backend server is running.';
            } else if (err.message.includes('CORS')) {
                errorMessage += 'CORS error - check server configuration.';
            } else {
                errorMessage += err.message;
            }

            setError(errorMessage);
            setCoins([]);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]);

    /**
     * Generate sample historical data with realistic market patterns
     */
    const generateSampleHistoricalData = useCallback((coin) => {
        const sampleData = [];
        const basePrice = coin.price;
        const now = new Date();
        let currentPrice = basePrice;
        const priceHistory = [];

        const patterns = ['bullish_rally', 'bearish_dump', 'sideways_volatile', 'pump_and_dump', 'gradual_rise'];
        const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];

        for (let i = 47; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - (i * 30 * 60 * 1000));
            const minutesSinceStart = (47 - i) * 30;
            const progress = minutesSinceStart / (24 * 60);

            let patternTrend = 0;
            switch (selectedPattern) {
                case 'bullish_rally':
                    patternTrend = 0.1 * Math.pow(progress, 0.4);
                    break;
                case 'bearish_dump':
                    patternTrend = -0.08 * Math.pow(progress, 0.3);
                    break;
                case 'sideways_volatile':
                    patternTrend = Math.sin(progress * Math.PI * 6) * 0.06;
                    break;
                case 'pump_and_dump':
                    if (progress < 0.2) patternTrend = 0.25 * progress;
                    else if (progress < 0.6) patternTrend = 0.05 - (progress - 0.2) * 0.3;
                    else patternTrend = -0.07 + (progress - 0.6) * 0.03;
                    break;
                case 'gradual_rise':
                    patternTrend = 0.03 + Math.sin(progress * Math.PI * 2) * 0.04;
                    break;
            }

            const randomNoise = (Math.random() - 0.5) * 0.08;
            const volatilitySpike = Math.random() < 0.06 ? (Math.random() - 0.5) * 0.25 : 0;

            let momentum = 0;
            if (priceHistory.length >= 3) {
                const recentTrend1 = (priceHistory[priceHistory.length - 1] - priceHistory[priceHistory.length - 2]) / priceHistory[priceHistory.length - 2];
                const recentTrend2 = (priceHistory[priceHistory.length - 2] - priceHistory[priceHistory.length - 3]) / priceHistory[priceHistory.length - 3];
                momentum = (recentTrend1 + recentTrend2) * 0.2;
            }

            const newsEvent = Math.random() < 0.08 ? (Math.random() - 0.5) * 0.2 : 0;
            const hour = timestamp.getHours();
            const marketHourMultiplier = (hour >= 9 && hour <= 16) ? 1.2 : 0.8;
            const totalChange = (patternTrend + randomNoise + volatilitySpike + momentum + newsEvent) * marketHourMultiplier;
            const dampening = Math.abs(totalChange) > 0.15 ? 0.6 : Math.abs(totalChange) > 0.1 ? 0.8 : 1;
            currentPrice = currentPrice * (1 + totalChange * dampening);

            const supportLevels = [basePrice * 0.82, basePrice * 0.88, basePrice * 0.94, basePrice, basePrice * 1.06, basePrice * 1.12, basePrice * 1.18];
            for (const level of supportLevels) {
                if (Math.abs(currentPrice - level) / level < 0.02) {
                    const bounce = (Math.random() - 0.5) * 0.06;
                    currentPrice *= (1 + bounce);
                    break;
                }
            }

            const maxDeviation = 0.4;
            const minPrice = basePrice * (1 - maxDeviation);
            const maxPrice = basePrice * (1 + maxDeviation);
            currentPrice = Math.max(minPrice, Math.min(maxPrice, currentPrice));
            priceHistory.push(currentPrice);

            sampleData.push({
                coinId: coin.coinId,
                name: coin.name,
                symbol: coin.symbol,
                price: Math.max(currentPrice, 0.01),
                marketCap: coin.marketCap * (currentPrice / basePrice),
                percentChange24h: coin.percentChange24h,
                image: coin.image,
                timestamp: timestamp.toISOString()
            });
        }
        return sampleData;
    }, []);

    /**
     * Generate minimal sample data for unknown coins
     */
    const generateMinimalSampleData = useCallback((coinId) => {
        const now = new Date();
        const basePrice = 1000;
        const sampleData = [];
        let currentPrice = basePrice;

        for (let i = 23; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
            const progress = (23 - i) / 24;
            const randomChange = (Math.random() - 0.5) * 0.15;
            const trendEffect = Math.sin(progress * Math.PI * 3) * 0.1;
            const volatility = Math.random() < 0.15 ? (Math.random() - 0.5) * 0.2 : 0;
            const momentum = i < 22 ? (Math.random() - 0.5) * 0.05 : 0;

            currentPrice = currentPrice * (1 + randomChange + trendEffect + volatility + momentum);
            currentPrice = Math.max(basePrice * 0.65, Math.min(basePrice * 1.35, currentPrice));

            sampleData.push({
                coinId: coinId,
                name: coinId.charAt(0).toUpperCase() + coinId.slice(1),
                symbol: coinId.toUpperCase().slice(0, 3),
                price: currentPrice,
                marketCap: currentPrice * 1000000,
                percentChange24h: ((currentPrice - basePrice) / basePrice) * 100,
                image: '',
                timestamp: timestamp.toISOString()
            });
        }
        return sampleData;
    }, []);

    /**
     * Fetch historical data - database cache (preferred) or sample data
     */
    const fetchHistoricalData = useCallback(async (coinId) => {
        try {
            setHistoryLoading(true);

            const response = await fetch(`${API_BASE_URL}/history/${coinId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.json();

            if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                setHistoricalData(result.data);
                setDataSource(result.source);
                return;
            }

            const currentCoin = coins.find(coin => coin.coinId === coinId);
            const sampleData = currentCoin
                ? generateSampleHistoricalData(currentCoin)
                : generateMinimalSampleData(coinId);

            setHistoricalData(sampleData);
            setDataSource('client-sample');

        } catch (err) {
            const currentCoin = coins.find(coin => coin.coinId === coinId);
            const sampleData = currentCoin
                ? generateSampleHistoricalData(currentCoin)
                : generateMinimalSampleData(coinId);

            setHistoricalData(sampleData);
            setDataSource('client-sample');
        } finally {
            setHistoryLoading(false);
        }
    }, [API_BASE_URL, coins, generateSampleHistoricalData, generateMinimalSampleData]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedCoins = React.useMemo(() => {
        if (!Array.isArray(coins)) {
            return [];
        }

        let result = coins.filter(coin =>
            coin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortConfig.key) {
            result.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [coins, searchTerm, sortConfig]);

    useEffect(() => {
        fetchCoins();

        const interval = setInterval(fetchCoins, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, [fetchCoins]);

    const value = {
        coins: filteredAndSortedCoins,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        sortConfig,
        handleSort,
        selectedCoin,
        setSelectedCoin,
        historicalData,
        historyLoading,
        dataSource,
        fetchHistoricalData,
        refetch: fetchCoins
    };

    return (
        <CryptoContext.Provider value={value}>
            {children}
        </CryptoContext.Provider>
    );
};