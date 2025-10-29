import React from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Filter, Sparkles } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';

const SearchFilter = () => {
    const { searchTerm, setSearchTerm, sortConfig, handleSort } = useCrypto();

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown className="h-4 w-4" />;
        return sortConfig.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
    };

    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                    <div className="w-full">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Crypto Currencies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-500 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl backdrop-blur-sm hover:scale-[1.01]"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <div className="flex items-center space-x-2">
                                <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide">Sort by:</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleSort('name')}
                                    className={`flex items-center space-x-1 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-semibold text-xs transition-all duration-500 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${sortConfig.key === 'name'
                                        ? 'bg-blue-600 text-white shadow-blue-500/25'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <span>Name</span>
                                    {getSortIcon('name')}
                                </button>

                                <button
                                    onClick={() => handleSort('price')}
                                    className={`flex items-center space-x-1 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-semibold text-xs transition-all duration-500 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${sortConfig.key === 'price'
                                        ? 'bg-green-600 text-white shadow-green-500/25'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <span>Price</span>
                                    {getSortIcon('price')}
                                </button>

                                <button
                                    onClick={() => handleSort('marketCap')}
                                    className={`flex items-center space-x-1 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-semibold text-xs transition-all duration-500 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${sortConfig.key === 'marketCap'
                                        ? 'bg-purple-600 text-white shadow-purple-500/25'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <span className="hidden sm:inline">Market Cap</span>
                                    <span className="sm:hidden">Cap</span>
                                    {getSortIcon('marketCap')}
                                </button>

                                <button
                                    onClick={() => handleSort('percentChange24h')}
                                    className={`flex items-center space-x-1 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-semibold text-xs transition-all duration-500 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${sortConfig.key === 'percentChange24h'
                                        ? 'bg-orange-600 text-white shadow-orange-500/25'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <span className="hidden sm:inline">24h Change</span>
                                    <span className="sm:hidden">24h</span>
                                    {getSortIcon('percentChange24h')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;