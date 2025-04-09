import React from 'react'
import {ExpenseLineGraph as ExpenseLineGraphComponent,TransactionTable} from "../../../components"

function ExpenseLineGraph() {
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Expense Trend Overview
        </h2>
        <ExpenseLineGraphComponent setFilteredTransactions={setFilteredTransactions} />
      </div>
  
      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Transactions Matching Trend
        </h2>
        <TransactionTable transactions={filteredTransactions} className="w-full" />
      </div>
    </div>
  );
  
}

export default ExpenseLineGraph