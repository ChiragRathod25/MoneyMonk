import React from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
// ExpenseCategoryPieChart,
// ExpenseCategoryToSubCategoryPieChart,
// IncomeSubCategoryPieChart,
// PaymentModeDistributionBarChart,
// IncomeLineGraph,
// ExpenseLineGraph,
function Report() {
  const navigate = useNavigate();

  return (
    <>
      <div>Report</div>
      <div
        className="
        flex
        flex-col
        gap-2
        items-center
        justify-center
        w-full
        
        "
      >

      <Button onClick={() => navigate("/reports/expense-category-pie-chart")}>
        Expense Category Pie Chart
      </Button>
      <Button
        onClick={() =>
          navigate("/reports/expense-category-to-subcategory-pie-chart")
        }
      >
        Expense Category To SubCategory Pie Chart
      </Button>
      <Button onClick={() => navigate("/reports/income-subcategory-pie-chart")}>
        Income SubCategory Pie Chart
      </Button>
      <Button
        onClick={() => navigate("/reports/payment-mode-distribution-bar-chart")}
      >
        Payment Mode Distribution Bar Chart
      </Button>
      <Button onClick={() => navigate("/reports/income-line-graph")}>
        Income Line Graph
      </Button>
      <Button onClick={() => navigate("/reports/expense-line-graph")}>
        Expense Line Graph
      </Button>
      </div>
    </>
  );
}

export default Report;
