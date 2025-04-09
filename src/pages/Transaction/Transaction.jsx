import React from "react";
import { TransactionDetails } from "../../components";

function Transaction() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        📄 Transaction Details
      </h1>
      <div className="w-full max-w-3xl">
        <TransactionDetails />
      </div>
    </div>
  );
}

export default Transaction;
