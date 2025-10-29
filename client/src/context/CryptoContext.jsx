import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CryptoContext = createContext();

export const useCrypto = () => {
    const context = useContext(CryptoContext);
    if (!context) {
        throw new Error('useCrypto must be used within CryptoProvider');
    }
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

    const API_BASE_URL = 'http://localhost:5000/api';

    const fetchCoins = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/coins`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);  

            if (Array.isArray(data)) {
                setCoins(data);
            } else if (data && Array.isArray(data.data)) {
                setCoins(data.data);
            } else {
                console.warn('Unexpected API response format:', data);
                setCoins([]);
            }
        } catch (err) {
            console.error('Error fetching coins:', err);
            setError('Failed to fetch cryptocurrency data. Please try again later.');
            setCoins([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchHistoricalData = useCallback(async (coinId) => {
        try {
            setHistoryLoading(true);
            const response = await fetch(`${API_BASE_URL}/history/${coinId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                setHistoricalData(result.data);
            } else {
                console.warn('Unexpected history API response format:', result);
                setHistoricalData([]);
            }
        } catch (err) {
            console.error('Error fetching historical data:', err);
            setHistoricalData([]);
        } finally {
            setHistoryLoading(false);
        }
    }, []);

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
        fetchHistoricalData,
        refetch: fetchCoins
    };

    return (
        <CryptoContext.Provider value={value}>
            {children}
        </CryptoContext.Provider>
    );
};