import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import CoinChart from './CoinChart';
import Loading from './Loading';

const ChartModal = ({ isOpen, onClose, coin }) => {
    const { historicalData, historyLoading, fetchHistoricalData } = useCrypto();

    useEffect(() => {
        if (isOpen && coin) {
            fetchHistoricalData(coin.coinId);
        }
    }, [isOpen, coin, fetchHistoricalData]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !coin) return null;

    const isPositive = coin.percentChange24h >= 0;

    const modalContent = (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            <div className="relative bg-white dark:bg-gray-900 rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl h-[95vh] sm:h-[90vh] md:h-[85vh] flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
                        <div className="relative group/logo">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 p-1 sm:p-2 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500">
                                <img
                                    src={coin.image || `https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/200`}
                                    alt={`${coin.name} logo`}
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain group-hover/logo:scale-110 transition-transform duration-300 filter drop-shadow-sm"
                                    onError={(e) => {
                                        const fallbacks = [
                                            `https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/200`,
                                            `https://cryptologos.cc/logos/${coin.name.toLowerCase().replace(/\s+/g, '-')}-${coin.symbol.toLowerCase()}-logo.png`,
                                            `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`,
                                            `https://via.placeholder.com/48/3B82F6/FFFFFF?text=${coin.symbol.slice(0, 2)}`
                                        ];

                                        const currentIndex = fallbacks.findIndex(url => e.target.src.includes(url.split('/')[2]));
                                        const nextIndex = currentIndex + 1;

                                        if (nextIndex < fallbacks.length) {
                                            e.target.src = fallbacks[nextIndex];
                                        }
                                    }}
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                                {coin.name}
                            </h2>
                            <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                                    {coin.symbol}
                                </span>
                                <div className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${isPositive
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                    }`}>
                                    {isPositive ? (
                                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                                    )}
                                    <span>{formatPercentage(coin.percentChange24h)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {formatCurrency(coin.price)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                Market Cap: {formatCurrency(coin.marketCap)}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-200 group"
                        >
                            <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-hidden">
                    {/* Mobile price display */}
                    <div className="sm:hidden mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {formatCurrency(coin.price)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Market Cap: {formatCurrency(coin.marketCap)}
                        </p>
                    </div>

                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                        <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                            Price History (Last 24 Hours)
                        </h3>
                    </div>

                    {historyLoading ? (
                        <div className="h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                            <Loading />
                        </div>
                    ) : historicalData && historicalData.length > 0 ? (
                        <div className="h-64 sm:h-80 md:h-96 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl p-2 sm:p-4">
                            <CoinChart coinId={coin.coinId} />
                        </div>
                    ) : (
                        <div className="h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                            <div className="text-center">
                                <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                                    No historical data available yet
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                    Data will be available after the first hourly update
                                </p>
                                <div className="mt-4 space-y-2">
                                    <button
                                        onClick={() => {
                                            console.log('🔄 Retrying to fetch historical data for:', coin.coinId);
                                            fetchHistoricalData(coin.coinId);
                                        }}
                                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                                    >
                                        Retry Loading Chart
                                    </button>
                                    <button
                                        onClick={async () => {
                                            console.log('🎲 Generating sample data for chart demo');
                                            try {
                                                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/generate-sample-history`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' }
                                                });
                                                if (response.ok) {
                                                    setTimeout(() => fetchHistoricalData(coin.coinId), 1000);
                                                } else {
                                                    console.log('⚠️ Failed to generate sample data, using client fallback');
                                                    fetchHistoricalData(coin.coinId);
                                                }
                                            } catch (err) {
                                                console.log('⚠️ Error generating sample data, using client fallback');
                                                fetchHistoricalData(coin.coinId);
                                            }
                                        }}
                                        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors duration-200"
                                    >
                                        Generate Sample Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mobile statistics - moved to bottom */}
                    <div className="grid grid-cols-1 sm:hidden gap-3 mt-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                            <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Current Price</h4>
                            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                                {formatCurrency(coin.price)}
                            </p>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
                            <h4 className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">Market Cap</h4>
                            <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
                                {formatCurrency(coin.marketCap)}
                            </p>
                        </div>

                        <div className={`rounded-lg p-3 border ${isPositive
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                            }`}>
                            <h4 className={`text-xs font-semibold mb-1 ${isPositive ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                                }`}>
                                24h Change
                            </h4>
                            <p className={`text-lg font-bold ${isPositive ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
                                }`}>
                                {formatPercentage(coin.percentChange24h)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default ChartModal;