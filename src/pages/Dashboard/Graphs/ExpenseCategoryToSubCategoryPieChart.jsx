import React from "react";
import {
  ExpenseCategoryToSubCategoryPieChart as ExpenseCategoryToSubCategoryPieChartComponent,
  TransactionTable,
} from "../../../components";
function ExpenseCategoryToSubCategoryPieChart() {
    const [filteredTransactionsByCategory, setFilteredTransactionsByCategory] =
        React.useState([]);
        return (
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Subcategory-wise Expense Distribution
              </h2>
              <ExpenseCategoryToSubCategoryPieChartComponent
                setFilteredTransactionsByCategory={setFilteredTransactionsByCategory}
              />
            </div>
        
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Filtered Transactions by Subcategory
              </h2>
              <TransactionTable
                transactions={filteredTransactionsByCategory}
                className="w-full"
              />
            </div>
          </div>
        );
        
}

export default ExpenseCategoryToSubCategoryPieChart;
