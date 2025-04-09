import React from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { PieChart, BarChart2, LineChart, Layers } from "lucide-react";

function Report() {
  const navigate = useNavigate();

  const reportItems = [
    {
      label: "Expense Category Pie Chart",
      icon: <PieChart className="w-5 h-5 mr-2" />,
      path: "/reports/expense-category-pie-chart",
    },
    {
      label: "Expense to SubCategory Pie Chart",
      icon: <Layers className="w-5 h-5 mr-2" />,
      path: "/reports/expense-category-to-subcategory-pie-chart",
    },
    {
      label: "Income SubCategory Pie Chart",
      icon: <PieChart className="w-5 h-5 mr-2" />,
      path: "/reports/income-subcategory-pie-chart",
    },
    {
      label: "Payment Mode Bar Chart",
      icon: <BarChart2 className="w-5 h-5 mr-2" />,
      path: "/reports/payment-mode-distribution-bar-chart",
    },
    {
      label: "Income Line Graph",
      icon: <LineChart className="w-5 h-5 mr-2" />,
      path: "/reports/income-line-graph",
    },
    {
      label: "Expense Line Graph",
      icon: <LineChart className="w-5 h-5 mr-2" />,
      path: "/reports/expense-line-graph",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📊 Reports Dashboard</h1>
        <p className="text-gray-500 mt-2">Visual insights of your income and expenses</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reportItems.map((item) => (
          <div
            key={item.label}
            className="bg-white hover:shadow-md border border-gray-200 rounded-2xl transition-shadow duration-200 p-4 flex items-center cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="text-gray-800 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report;
