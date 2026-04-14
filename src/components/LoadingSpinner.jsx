import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="spinner mb-4"></div>
      <p className="text-gray-500 font-medium animate-pulse">Syncing your friendships...</p>
    </div>
  );
};

export default LoadingSpinner;
