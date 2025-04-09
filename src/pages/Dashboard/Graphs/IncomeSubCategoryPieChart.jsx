import React from 'react';
import {
  IncomeSubCategoryPieChart as IncomeSubCategoryPieChartComponent,
  TransactionTable,
} from '../../../components';

function IncomeSubCategoryPieChart() {
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Pie Chart Section */}
      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Income Distribution by Subcategory
        </h2>
        <IncomeSubCategoryPieChartComponent setFilteredTransactions={setFilteredTransactions} />
      </div>

      {/* Transactions Table Section */}
      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Matching Income Transactions
        </h2>
        <TransactionTable transactions={filteredTransactions} className="w-full" />
      </div>
    </div>
  );
}

export default IncomeSubCategoryPieChart;
