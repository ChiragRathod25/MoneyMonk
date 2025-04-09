import React from 'react';

function TransactionCard({ transaction }) {
  return transaction ? (
    <div className="bg-white shadow-md rounded-2xl p-5 mb-4 transition hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{transaction.type}</h2>
        <span className="text-sm text-gray-500">{transaction?.date}</span>
      </div>

      <p className="text-gray-700 mb-1">{transaction?.description}</p>

      <div className="text-sm text-gray-600 space-y-1 mt-2">
        <p><span className="font-medium text-gray-700">Amount:</span> ₹{transaction?.amount}</p>
        <p><span className="font-medium text-gray-700">Category:</span> {transaction?.categoryId.name}</p>
        <p><span className="font-medium text-gray-700">Subcategory:</span> {transaction?.subcategoryId.name}</p>
        <p><span className="font-medium text-gray-700">Payment Mode:</span> {transaction?.paymentModeId.name}</p>
      </div>
    </div>
  ) : null;
}

export default TransactionCard;
