import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Star, Sparkles } from 'lucide-react';
import { formatCurrency, formatPercentage, formatDateTime } from '../utils/formatters';
import ChartModal from './ChartModal';

const CoinCard = ({ coin }) => {
    const [showChart, setShowChart] = useState(false);
    const isPositive = coin.percentChange24h >= 0;

    return (
        <>
            <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 overflow-hidden h-full flex flex-col relative hover:scale-[1.02] hover:-translate-y-1">
                <div className="p-2.5 flex-1 flex flex-col relative z-10">
                    <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                        <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-1">
                            <div className="relative group/logo">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 p-1 rounded-md flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500">
                                    <img
                                        src={coin.image || `https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/200`}
                                        alt={`${coin.name} logo`}
                                        className="w-5 h-5 sm:w-7 sm:h-7 object-contain group-hover/logo:scale-110 transition-transform duration-300 filter drop-shadow-sm"
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
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                                    <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {coin.name}
                                </h3>
                                <span className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wide">
                                    {coin.symbol}
                                </span>
                            </div>
                        </div>

                        <div className="text-right flex-shrink-0 ml-1.5">
                            <p className="text-xs font-semibold text-gray-900 dark:text-white mb-0.5">
                                {formatCurrency(coin.price)}
                            </p>
                            <div className={`flex items-center justify-end space-x-0.5 px-1 sm:px-1.5 py-0.5 rounded-sm text-xs font-medium shadow-sm ${isPositive
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                }`}>
                                {isPositive ? (
                                    <TrendingUp className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                                ) : (
                                    <TrendingDown className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                                )}
                                <span className="text-xs">{formatPercentage(coin.percentChange24h)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2.5 flex-1">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-sm p-1.5 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5 font-medium uppercase tracking-wide">Market Cap</p>
                            <p className="font-medium text-gray-900 dark:text-white text-xs">
                                {formatCurrency(coin.marketCap)}
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-sm p-1.5 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5 font-medium uppercase tracking-wide">Last Updated</p>
                            <p className="font-medium text-gray-900 dark:text-white text-xs">
                                {formatDateTime(coin.timestamp)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowChart(true)}
                        className="w-full flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2.5 rounded-sm font-medium text-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-1 dark:focus:ring-offset-gray-800 shadow-sm"
                    >
                        <BarChart3 className="h-3 w-3" />
                        <span>View Chart</span>
                    </button>
                </div>
            </div>

            <ChartModal
                isOpen={showChart}
                onClose={() => setShowChart(false)}
                coin={coin}
            />
        </>
    );
};

export default CoinCard;