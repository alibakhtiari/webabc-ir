
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary border-opacity-30 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-t-primary border-opacity-100 rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
