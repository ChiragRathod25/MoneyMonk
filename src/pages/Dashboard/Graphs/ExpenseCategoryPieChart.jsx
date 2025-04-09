import React from "react";
import {
  ExpenseCategoryPieChart as ExpenseCategoryPieChartComponent,
  TransactionTable,
} from "../../../components";

function ExpenseCategoryPieChart() {
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Expense Breakdown by Category
        </h2>
        <ExpenseCategoryPieChartComponent
          setFilteredTransactions={setFilteredTransactions}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Filtered Transactions
        </h2>
        <TransactionTable
          transactions={filteredTransactions}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default ExpenseCategoryPieChart;
