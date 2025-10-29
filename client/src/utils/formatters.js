export const formatCurrency = (value, decimals = 2) => {
  if (value === null || value === undefined) return "$0.00";

  const absValue = Math.abs(value);

  if (absValue >= 1e12) {
    return `$${(value / 1e12).toFixed(decimals)}T`;
  } else if (absValue >= 1e9) {
    return `$${(value / 1e9).toFixed(decimals)}B`;
  } else if (absValue >= 1e6) {
    return `$${(value / 1e6).toFixed(decimals)}M`;
  } else if (absValue >= 1e3) {
    return `$${(value / 1e3).toFixed(decimals)}K`;
  } else {
    return `$${value.toFixed(decimals)}`;
  }
};

export const formatPercentage = (value) => {
  if (value === null || value === undefined) return "0.00%";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const getPercentageColor = (value) => {
  if (value >= 0) {
    return "text-green-500";
  } else {
    return "text-red-500";
  }
};

export const formatDateTime = (timestamp) => {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimeAgo = (timestamp) => {
  if (!timestamp) return "Unknown";

  const now = new Date();
  const diff = now - new Date(timestamp);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

export const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
