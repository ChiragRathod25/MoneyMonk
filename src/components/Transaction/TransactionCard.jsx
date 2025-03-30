import React from 'react';


// schema
// amount,
// type,
// status,
// description,
// date,
// categoryId:categoryId,
// subcategoryId:subCategoryId,
// paymentModeId:paymentMode,

function TransactionCard({transaction}) {
    
    return transaction? (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold">{transaction.type}</h2>
            <p className="text-gray-600">{transaction.description}</p>
            <p className="text-gray-600">Amount: ${transaction.amount}</p>
            <p className="text-gray-600">Date: {transaction.date}</p>
            <p className="text-gray-600">Category: {transaction.categoryId.name}</p>
            <p className="text-gray-600">Subcategory: {transaction.subcategoryId.name}</p>
            <p className="text-gray-600">Payment Mode: {transaction.paymentModeId.name}</p>
        </div>
    ):null
}

export default TransactionCard; 