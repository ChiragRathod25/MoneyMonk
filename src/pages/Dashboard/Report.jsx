import React from "react";
import {
  ExpenseCategoryPieChart,

  ExpenseCategoryToSubCategoryPieChart,
  IncomeSubCategoryPieChart,
  PaymentModeDistributionBarChart,
  IncomeLineGraph,
  ExpenseLineGraph,
} from "../../components";

function Report() {
  return (
    <>
      <div>Report</div>

      {/* <ExpenseCategoryPieChart/> */}
      {/* <ExpenseCategoryToSubCategoryPieChart/> */}
      {/* <IncomeSubCategoryPieChart/> */}
      <PaymentModeDistributionBarChart/>
      {/* <IncomeLineGraph/> */}
      {/* <ExpenseLineGraph/> */}

    </>
  );
}

export default Report;
