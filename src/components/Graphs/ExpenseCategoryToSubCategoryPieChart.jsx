import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "../index";
import transactionService from "../../appwrite/transactionServices";
import { setTransaction } from "../../Slices/transactionSlice";

function ExpenseCategoryToSubCategoryPieChart({ setFilteredTransactionsByCategory }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactionsByTimePeriod, setFilteredTransactionsByTimePeriod] = useState([]);

  const existingTransactions = useSelector((state) =>
    state.transaction.transactionDataType === "ExpenseCategoryToSubCategoryPieChart"
      ? state.transaction.transactions
      : []
  );
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const canvasRef = React.useRef(null);
  const chartRef = React.useRef(null);

  const [timePeriod] = useState([
    "Last 7 Days",
    "Last 30 Days",
    "Last 60 Days",
    "Last 90 Days",
    "Last 1 Year",
    "Last 2 Years",
    "All Time",
  ]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Last 7 Days");

  const ExpenseCategoryToSubCategoryChart = function (data) {
    if (chartRef.current) chartRef.current.destroy();
    if (!canvasRef.current) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: "pie",
      data: {
        labels: data.map((row) => row.name),
        datasets: [
          {
            label: `Acquisitions ${selectedTimePeriod}`,
            data: data.map((row) => row.amount),
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
      return startDate ? transactionDate >= startDate && transactionDate <= currentDate : true;
    });
    setFilteredTransactionsByTimePeriod(filteredData);
  };

  const handleCategoryChange = () => {
    const e = selectedCategory;
    const currentData = filteredTransactionsByTimePeriod;
    const filteredData = currentData.filter((transaction) => transaction.categoryId.name === e);
    setFilteredTransactionsByCategory(filteredData);

    const category = {};
    for (const cat of filteredData) {
      category[cat.subcategoryId.name] = (category[cat.subcategoryId.name] || 0) + cat.amount;
    }

    const categoryArray = Object.entries(category).map(([key, value]) => ({
      name: key,
      amount: value,
    }));
    ExpenseCategoryToSubCategoryChart(categoryArray);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    handleTimePeriodChange();
  }, [transactions, selectedTimePeriod]);

  useEffect(() => {
    handleCategoryChange();
  }, [selectedCategory, filteredTransactionsByTimePeriod]);

  useEffect(() => {
    if (!transactions.length) return;
    dispatch(
      setTransaction({
        transactionDataType: "ExpenseCategoryToSubCategoryPieChart",
        transactionData: transactions,
      })
    );
  }, [transactions]);

  useEffect(() => {
    setLoading(true);
    if (existingTransactions?.length) {
      setTransactions(existingTransactions);

      const categoryList = {};
      existingTransactions.map((transaction) => {
        categoryList[transaction.categoryId.name] = 1;
      });
      const categoryListArray = Object.keys(categoryList);
      setCategories(categoryListArray);
      setSelectedCategory(categoryListArray[0]);

      handleTimePeriodChange();
      setLoading(false);
      return;
    }

    transactionService
      .getUserExpenseTransactions({ userId })
      .then((response) => {
        setTransactions(response.documents);
        return response.documents;
      })
      .then((transactions) => {
        const categoryList = {};
        transactions.map((transaction) => {
          categoryList[transaction.categoryId.name] = 1;
        });
        const categoryListArray = Object.keys(categoryList);
        setCategories(categoryListArray);
        setSelectedCategory(categoryListArray[0]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-center text-gray-800 ">
        Expense Category to SubCategory
      </h2>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="w-full md:w-1/2">
          <Select
            options={timePeriod}
            selectedOption={selectedTimePeriod}
            onChange={(e) => setSelectedTimePeriod(() => e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Select
            options={categories}
            selectedOption={selectedCategory}
            onChange={(e) => setSelectedCategory(() => e.target.value)}
          />
        </div>
      </div>

      <div className="w-full h-auto">
        <canvas ref={canvasRef} className="max-w-full h-[400px]" />
      </div>
    </div>
  );
}

export default ExpenseCategoryToSubCategoryPieChart;
