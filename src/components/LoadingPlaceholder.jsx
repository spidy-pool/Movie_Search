import React from "react";

const LoadingPlaceholder = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-64 rounded-lg"></div>
      <div className="mt-4 bg-gray-200 h-6 rounded"></div>
      <div className="mt-2 bg-gray-200 h-4 rounded"></div>
    </div>
  );
};

export default LoadingPlaceholder;