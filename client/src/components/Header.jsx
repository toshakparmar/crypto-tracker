import React from 'react';
import { Moon, Sun, RefreshCw, Coins, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCrypto } from '../context/CryptoContext';

const Header = () => {
    const { isDark, toggleTheme } = useTheme();
    const { loading, refetch } = useCrypto();

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 sticky top-0 z-50 backdrop-blur-lg bg-white/95 dark:bg-gray-900/95 shadow-lg">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16 md:h-18">
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
                        <div className="relative group">
                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-110 border border-gray-200 dark:border-gray-600">
                                <img
                                    src="/bitcoin-logo.svg"
                                    alt="Crypto Tracker"
                                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 transition-transform duration-300 group-hover:rotate-12"
                                />
                            </div>
                        </div>
                        <div className="space-y-0.5 min-w-0 flex-1">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 truncate">
                                Crypto Tracker
                            </h1>
                            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium tracking-wide hidden sm:block">
                                Real-time cryptocurrency analytics
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6">
                        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                            <div className="group flex items-center space-x-1.5 lg:space-x-2 bg-green-50 dark:bg-green-900/20 px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-md lg:rounded-lg border border-green-200 dark:border-green-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                                <Activity className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xs font-semibold text-green-700 dark:text-green-300 tracking-wide">
                                    Live Data
                                </span>
                            </div>

                            <div className="group flex items-center space-x-1.5 lg:space-x-2 bg-blue-50 dark:bg-blue-900/20 px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-md lg:rounded-lg border border-blue-200 dark:border-blue-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <TrendingUp className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide">
                                    Top 10
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <button
                                onClick={refetch}
                                disabled={loading}
                                className={`group relative flex items-center space-x-1 sm:space-x-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-700 ${loading ? 'cursor-not-allowed opacity-80' : 'hover:scale-105 active:scale-95'}`}
                                title="Refresh cryptocurrency data"
                            >
                                <RefreshCw
                                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-all duration-500 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`}
                                />
                                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 hidden sm:inline tracking-wide">
                                    {loading ? 'Refreshing...' : 'Refresh'}
                                </span>
                                {loading && (
                                    <div className="absolute inset-0 bg-blue-200/20 rounded-md sm:rounded-lg animate-pulse"></div>
                                )}
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="group relative flex items-center space-x-1 sm:space-x-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-gray-500/30 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-600"
                                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                <div className="relative">
                                    {isDark ? (
                                        <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-500 group-hover:text-yellow-400 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" />
                                    ) : (
                                        <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-600 group-hover:text-gray-700 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                                    )}
                                </div>
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 hidden md:inline tracking-wide">
                                    {isDark ? 'Light Mode' : 'Dark Mode'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;