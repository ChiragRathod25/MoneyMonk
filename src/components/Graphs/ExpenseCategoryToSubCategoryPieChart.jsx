import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { Select, TransactionTable } from "../index";
import transactionService from "../../appwrite/transactionServices";

function ExpenseCategoryToSubCategoryPieChart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [
    filteredTransactionsByTimePeriod,
    setFilteredTransactionsByTimePeriod,
  ] = useState([]);
  const [filteredTransactionsByCategory, setFilteredTransactionsByCategory] =
    useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const canvasRef = React.useRef(null);
  const chartRef = React.useRef(null);

  const [timePeriod, setTimePeriod] = useState([
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
    // destroy the previous chart if it exist
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    if (!canvasRef.current) {
      return;
    }

    // create a new chart
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
    console.log("start date", startDate, currentDate);

    //filterData between currentDate and startDate
    const filteredData = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (startDate) {
        return transactionDate >= startDate && transactionDate <= currentDate;
      } else {
        return true;
      }
    });
    console.log("filteredData", filteredData);
    setFilteredTransactionsByTimePeriod(filteredData);
  };

  const handleCategoryChange = () => {
    const e = selectedCategory;
    const currentData = filteredTransactionsByTimePeriod;
    const filteredData = currentData.filter((transaction) => {
      return transaction.categoryId.name === e;
    });
    console.log("filteredData", filteredData);
    setFilteredTransactionsByCategory(filteredData);
    const category = {};
    for (const cat of filteredData) {
      if (!category[cat.subcategoryId.name]) {
        category[cat.subcategoryId.name] = cat.amount;
      } else {
        category[cat.subcategoryId.name] += cat.amount;
      }
    }

    // convert object to array
    const categoryArray = Object.entries(category).map(([key, value]) => ({
      name: key,
      amount: value,
    }));
    console.log("categoryArray", categoryArray);
    ExpenseCategoryToSubCategoryChart(categoryArray);
  };

  useEffect(() => {
    handleTimePeriodChange();
  }, [transactions, selectedTimePeriod]);

  useEffect(() => {
    handleCategoryChange();
  }, [selectedCategory, filteredTransactionsByTimePeriod]);

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserExpenseTransactions({ userId })
      .then((response) => {
        console.log("response.documents", response.documents);
        setTransactions(response.documents);
        return response.documents;
      })
      .then((transactions) => {
        const categoryList = {};
        transactions.map((transaction) => {
          categoryList[transaction.categoryId.name] = 1;
        });
        console.log("categoryList", categoryList);
        const categoryListArray = Object.keys(categoryList).map((category) => {
          return category;
        });
        console.log("categoryListArray", categoryListArray);
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
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!transactions) {
    return <div>No transactions found</div>;
  }

  return (
    <>
      <div
        className="
    flex-col
    justify-center
    items-center
    w-full
    h-full
    bg-white
    rounded-lg
    shadow-md
    p-4
    "
      >
        <h1>Expense Category to SubCategory</h1>
        <Select
          options={timePeriod}
          selectedOption={selectedTimePeriod}
          onChange={(e) => {
            setSelectedTimePeriod(() => e.target.value);
          }}
        />
        <Select
          options={categories}
          selectedOption={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(() => e.target.value);
          }}
        />
        <canvas ref={canvasRef}></canvas>

        <TransactionTable transactions={filteredTransactionsByCategory} />
      </div>
    </>
  );
}

export default ExpenseCategoryToSubCategoryPieChart;
