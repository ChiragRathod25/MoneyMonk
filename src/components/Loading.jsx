import React from 'react';

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="flex flex-col items-center text-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-teal-500 h-32 w-32 mb-4"></div>
        <h2 className="text-2xl font-bold text-dark-blue mb-2">Loading...</h2>
        <p className="text-lg text-gray-700">Please wait while we load your data.</p>
      </div>
    </div>
  );
}

export default Loading;