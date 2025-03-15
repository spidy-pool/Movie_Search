import React from "react";

const ErrorBoundary = ({ error }) => {
  if (!error) return null;
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {error}
    </div>
  );
};

export default ErrorBoundary;