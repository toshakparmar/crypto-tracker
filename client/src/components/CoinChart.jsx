import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useCrypto } from '../context/CryptoContext';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CoinChart = ({ coinId }) => {
    const { historicalData, historyLoading } = useCrypto();
    const { isDark } = useTheme();

    if (historyLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Loading chart data...</p>
                </div>
            </div>
        );
    }

    if (!historicalData.length) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No historical data available yet</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Chart data will appear after the first hourly update</p>
                </div>
            </div>
        );
    }

    const priceData = historicalData.map(item => item.price);
    const isUpward = priceData.length > 1 && priceData[priceData.length - 1] > priceData[0];

    const data = {
        labels: historicalData.map(item =>
            new Date(item.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        ),
        datasets: [
            {
                label: 'Price (USD)',
                data: priceData,
                borderColor: isUpward
                    ? 'rgb(34, 197, 94)'
                    : 'rgb(239, 68, 68)',
                backgroundColor: isUpward
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 8,
                pointBackgroundColor: isUpward
                    ? 'rgb(34, 197, 94)'
                    : 'rgb(239, 68, 68)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: isUpward
                    ? 'rgb(34, 197, 94)'
                    : 'rgb(239, 68, 68)',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                titleColor: isDark ? '#ffffff' : '#111827',
                bodyColor: isDark ? '#ffffff' : '#111827',
                borderColor: isDark ? '#4B5563' : '#E5E7EB',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 13,
                    weight: '500',
                },
                callbacks: {
                    title: (context) => `Time: ${context[0].label}`,
                    label: (context) => `Price: ${formatCurrency(context.parsed.y)}`,
                },
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
        scales: {
            x: {
                grid: {
                    color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.6)',
                    drawBorder: false,
                },
                ticks: {
                    color: isDark ? '#9CA3AF' : '#6B7280',
                    maxTicksLimit: 8,
                    font: {
                        size: 12,
                        weight: '500',
                    },
                },
                border: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.6)',
                    drawBorder: false,
                },
                ticks: {
                    color: isDark ? '#9CA3AF' : '#6B7280',
                    callback: (value) => formatCurrency(value, 4),
                    font: {
                        size: 12,
                        weight: '500',
                    },
                },
                border: {
                    display: false,
                },
            },
        },
    };

    const priceChange = priceData.length > 1 ?
        ((priceData[priceData.length - 1] - priceData[0]) / priceData[0] * 100) : 0;

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        Price History (24h)
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {historicalData.length} data points
                    </p>
                </div>

                {priceData.length > 1 && (
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isUpward
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>
                        {isUpward ? (
                            <TrendingUp className="h-4 w-4" />
                        ) : (
                            <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-semibold text-sm">
                            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1 relative" style={{ minHeight: '300px' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default CoinChart;