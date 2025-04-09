import React from 'react';
import {
  IncomeLineGraph as IncomeLineGraphComponent,
  TransactionTable,
} from '../../../components';

function IncomeLineGraph() {
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Income Line Graph */}
      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Income Trend Overview
        </h2>
        <IncomeLineGraphComponent setFilteredTransactions={setFilteredTransactions} />
      </div>

      {/* Filtered Transactions Table */}
      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Matching Income Transactions
        </h2>
        <TransactionTable transactions={filteredTransactions} className="w-full" />
      </div>
    </div>
  );
}

export default IncomeLineGraph;
