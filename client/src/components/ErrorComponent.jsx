import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff, ServerCrash } from 'lucide-react';

const ErrorComponent = ({ error, onRetry }) => {
    const getErrorIcon = () => {
        if (error?.includes('network') || error?.includes('fetch')) {
            return WifiOff;
        }
        if (error?.includes('server') || error?.includes('500')) {
            return ServerCrash;
        }
        return AlertTriangle;
    };

    const ErrorIcon = getErrorIcon();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-all duration-500">
            <div className="max-w-lg w-full mx-4">
                <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-center mb-8">
                            <div className="bg-red-100 dark:bg-red-900/30 p-8 rounded-full shadow-xl animate-pulse">
                                <ErrorIcon className="h-16 w-16 text-red-500 dark:text-red-400" />
                            </div>
                        </div>

                        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                            Oops! Something went wrong
                        </h3>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-semibold">
                                {error || 'Unable to load cryptocurrency data. Please check your connection and try again.'}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <button
                                onClick={onRetry}
                                className="inline-flex items-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 space-x-4 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg"
                            >
                                <RefreshCw className="h-6 w-6" />
                                <span>Try Again</span>
                            </button>

                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                                If the problem persists, please refresh the page or check your network connection.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;