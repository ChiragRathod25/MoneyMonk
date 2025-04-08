import React from "react";
import {
  ExpenseCategoryToSubCategoryPieChart as ExpenseCategoryToSubCategoryPieChartComponent,
  TransactionTable,
} from "../../../components";
function ExpenseCategoryToSubCategoryPieChart() {
    const [filteredTransactionsByCategory, setFilteredTransactionsByCategory] =
        React.useState([]);
  return (
    <>
      <div>ExpenseCategoryToSubCategoryPieChart</div>
      <ExpenseCategoryToSubCategoryPieChartComponent
        setFilteredTransactionsByCategory={setFilteredTransactionsByCategory}
      />
      <TransactionTable
        transactions={filteredTransactionsByCategory}
        className="w-full"
      />
    </>
  );
}

export default ExpenseCategoryToSubCategoryPieChart;
