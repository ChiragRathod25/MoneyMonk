import React from "react";
import {
  ExpenseCategoryPieChart as ExpenseCategoryPieChartComponent,
  TransactionTable,
} from "../../../components";
function ExpenseCategoryPieChart() {
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);

  return (
    <>
      <div>ExpenseCategoryPieChart</div>
      <ExpenseCategoryPieChartComponent
        setFilteredTransactions={setFilteredTransactions}
      />
      <TransactionTable
        transactions={filteredTransactions}
        className="w-full"
      />
    </>
  );
}

export default ExpenseCategoryPieChart;
