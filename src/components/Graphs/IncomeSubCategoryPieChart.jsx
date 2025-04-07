import React, { useDebugValue, useEffect, useState } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { Select, TransactionTable } from "../index";

const IncomeSubCategoryPieChart = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const canvasRef = React.useRef(null);
  const chartRef = React.useRef(null);
  const userId = useSelector((state) => state?.auth?.userData?.$id);

  const [timePeriod, setTimePeriod] = React.useState([
    "Last 7 Days",
    "Last 30 Days",
    "Last 60 Days",
    "Last 90 Days",
    "Last 1 Year",
    "Last 2 Years",
    "All Time",
  ]);
  const [selectedTimePeriod, setSelectedTimePeriod] =
    React.useState("Last 7 Days");

  const incomePieChart = function (data) {
    // destroy the previous chart if it exists
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
            label: `Income ${selectedTimePeriod}`,
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

    console.log("Filtered Data", filteredData);
    setFilteredTransactions(filteredData);

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
    incomePieChart(categoryArray);
  };

  useEffect(() => {
    handleTimePeriodChange();
  }, [transactions, selectedTimePeriod]);

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserIncomeTransactions({ userId })
      .then((response) => {
        console.log("response.documents", response.documents);
        setTransactions(response.documents);
        return response.documents;
      })
      .catch((error) => {
        console.log(error);
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

  if (!transactions.length) {
    return <div>No transactions found</div>;
  }

  return (
    <div>
      <h1>Income Sub-Category Pie Chart</h1>
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
        <Select
          options={timePeriod}
          className="w-full"
          label="Select Time Period"
          selectedOption={selectedTimePeriod}
          onChange={(e) => {
            setSelectedTimePeriod(() => e.target.value);
          }}
        />
        <canvas ref={canvasRef}></canvas>
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  );
};

export default IncomeSubCategoryPieChart;
