import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import CoinCard from './CoinCard';
import Loading from './Loading';
import ErrorComponent from './ErrorComponent';
import { TrendingUp, Search, Sparkles } from 'lucide-react';

const CryptoGrid = () => {
    const { loading, error, refetch, coins } = useCrypto();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorComponent error={error} onRetry={refetch} />;
    }

    if (coins.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-20 backdrop-blur-sm">
                            <div className="mb-10">
                                <div className="text-8xl mb-6 animate-bounce">🔍</div>
                            </div>
                            <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-6">
                                No Results Found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto font-semibold">
                                Try adjusting your search terms or filters to discover amazing cryptocurrencies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 auto-rows-fr">
                    {coins.map((coin, index) => (
                        <div
                            key={coin.coinId}
                            className="animate-fadeInUp"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CoinCard coin={coin} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-gray-700 inline-block shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-600 dark:text-gray-400 font-medium">
                            <div className="flex items-center space-x-2">
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
                                <span>Auto-refresh: 30 minutes</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse shadow-sm"></div>
                                <span>Cron updates: Hourly</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoGrid;