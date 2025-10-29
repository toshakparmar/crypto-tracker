import React from 'react';
import { Loader2, TrendingUp, Coins, Sparkles } from 'lucide-react';

const Loading = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-all duration-500">
            <div className="text-center relative">
                <div className="flex items-center justify-center mb-10 relative">
                    <div className="relative">
                        <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                            <Coins className="h-14 w-14 text-white animate-bounce" />
                        </div>

                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl p-10 border border-gray-200 dark:border-gray-700 shadow-2xl">
                    <h2 className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-6">
                        Loading Crypto Data
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg font-semibold">
                        Fetching the latest cryptocurrency prices from the market...
                    </p>

                    <div className="flex justify-center space-x-4 mb-8">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                        <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce delay-300"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                        <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                        <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;