import React, { useEffect, useRef } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "../index";
import { setTransaction } from "../../Slices/transactionSlice";

function ExpenseCategoryPieChart({ setFilteredTransactions }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const existingTransactions = useSelector((state) =>
    state.transaction.transactionDataType === "ExpenseCategoryPieChart"
      ? state.transaction.transactions
      : []
  );
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [timePeriod] = React.useState([
    "Last 7 Days",
    "Last 30 Days",
    "Last 60 Days",
    "Last 90 Days",
    "Last 1 Year",
    "Last 2 Years",
    "All Time",
  ]);
  const [selectedTimePeriod, setSelectedTimePeriod] = React.useState("Last 7 Days");

  const expensePieChart = function (data) {
    if (chartRef.current) chartRef.current.destroy();
    if (!canvasRef.current) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: "pie",
      data: {
        labels: data.map((row) => row.name),
        datasets: [
          {
            label: `Expenses - ${selectedTimePeriod}`,
            data: data.map((row) => row.amount),
            backgroundColor: [
              "#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa", "#a78bfa", "#f472b6",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  };

  const handleTimePeriodChange = () => {
    const e = selectedTimePeriod;
    const currentDate = new Date();
    let startDate = new Date();
    switch (e) {
      case "Last 7 Days":
        startDate.setDate(currentDate.getDate() - 7);
        break;
      case "Last 30 Days":
        startDate.setDate(currentDate.getDate() - 30);
        break;
      case "Last 60 Days":
        startDate.setDate(currentDate.getDate() - 60);
        break;
      case "Last 90 Days":
        startDate.setDate(currentDate.getDate() - 90);
        break;
      case "Last 1 Year":
        startDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      case "Last 2 Years":
        startDate.setFullYear(currentDate.getFullYear() - 2);
        break;
      case "All Time":
        startDate = null;
        break;
      default:
        break;
    }

    const filteredData = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (startDate) {
        return transactionDate >= startDate && transactionDate <= currentDate;
      } else {
        return true;
      }
    });

    setFilteredTransactions(filteredData);

    const category = {};
    for (const cat of filteredData) {
      if (!category[cat.categoryId.name]) {
        category[cat.categoryId.name] = cat.amount;
      } else {
        category[cat.categoryId.name] += cat.amount;
      }
    }

    const categoryArray = Object.entries(category).map(([key, value]) => ({
      name: key,
      amount: value,
    }));

    expensePieChart(categoryArray);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    handleTimePeriodChange();
  }, [transactions, selectedTimePeriod]);

  useEffect(() => {
    if (!transactions.length) return;
    dispatch(setTransaction({
      transactionDataType: "ExpenseCategoryPieChart",
      transactionData: transactions,
    }));
  }, [transactions]);

  useEffect(() => {
    setLoading(true);
    if (existingTransactions?.length) {
      handleTimePeriodChange();
      setTransactions(existingTransactions);
      setLoading(false);
      return;
    }

    transactionService
      .getUserExpenseTransactions({ userId })
      .then((response) => {
        setTransactions(response.documents);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-8">
        <p className="text-gray-600 text-lg animate-pulse">Loading data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center py-8">
        <p className="text-red-500 font-medium">
          Error: {error.message || "Something went wrong"}
        </p>
      </div>
    );
  }
  if (!transactions || transactions.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center py-8">
        <p className="text-gray-600 text-lg animate-pulse">No transactions found</p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Expense by Category
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
        <div className="mb-6">
          <Select
            options={timePeriod}
            className="w-full"
            label="Select Time Period"
            selectedOption={selectedTimePeriod}
            onChange={(e) => setSelectedTimePeriod(e.target.value)}
          />
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-md">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCategoryPieChart;
