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

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const fetchCoins = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching from:', `${API_BASE_URL}/coins`);

            const response = await fetch(`${API_BASE_URL}/coins`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

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

            // More specific error messages
            let errorMessage = 'Failed to fetch cryptocurrency data. ';

            if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
                errorMessage += 'Please check if your backend server is running on http://localhost:5000 and that no ad blocker is blocking the request.';
            } else if (err.message.includes('CORS')) {
                errorMessage += 'CORS error - please check server configuration.';
            } else if (err.message.includes('ERR_BLOCKED_BY_CLIENT')) {
                errorMessage += 'Request blocked by browser extension or ad blocker. Please disable and try again.';
            } else {
                errorMessage += err.message;
            }

            setError(errorMessage);
            setCoins([]);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]); const fetchHistoricalData = useCallback(async (coinId) => {
        try {
            setHistoryLoading(true);
            console.log('Fetching historical data from:', `${API_BASE_URL}/history/${coinId}`);

            const response = await fetch(`${API_BASE_URL}/history/${coinId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Historical data response:', result);

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
    }, [API_BASE_URL]);

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