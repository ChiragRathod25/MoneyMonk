import React, { useDebugValue, useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import {Select} from "../index";

function ExpenseCategoryPieChart() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);
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

  const expensePieChart =  function ( data) {
    // destroy the previous chart if it exists
    const existingChart = Chart.getChart("acquisitions");
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart(document.getElementById("acquisitions"), {
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
   
    const filteredData = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (startDate && transactionDate < startDate) {
        return false;
      }
      return true;
    }
    );
    console.log("filteredData", filteredData);
    const category = {};
    for (const cat of filteredData) {
      if (!category[cat.categoryId.name]) {
        category[cat.categoryId.name] = cat.amount;
      } else {
        category[cat.categoryId.name] += cat.amount;
      }
    }

    // convert object to array
    const categoryArray = Object.entries(category).map(([key, value]) => ({
      name: key,
      amount: value,
    }));
    console.log("categoryArray", categoryArray);
    expensePieChart(categoryArray);
  };
    
  useEffect(()=>{
    handleTimePeriodChange();
  },[transactions, selectedTimePeriod])

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserExpenseTransactions({ userId })
      .then((response) => {
        console.log(response.documents);
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
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!transactions) {
    return <div>No transactions found</div>;
  }

  return (
    <>
      <div>ExpenseCategoryPieChart</div>
      <div
        className="
    flex-col
    justify-center
    items-center
    w-[500px]
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
        <canvas id="acquisitions"></canvas>
      </div>
    </>
  );
}

export default ExpenseCategoryPieChart;
