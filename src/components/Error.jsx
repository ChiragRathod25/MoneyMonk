import React from 'react';

function Error({ errorMsg }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark-blue mb-4">Oops!</h1>
        <p className="text-xl text-red-500 mb-4">{errorMsg || "Something went wrong."}</p>
        <p className="text-lg text-gray-700 mb-8">
          Please try again later or contact support if the problem persists.
        </p>
        <a href="/" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default Error;