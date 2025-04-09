import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "chart.js/auto";
import transactionService from "../../appwrite/transactionServices";
import { Select } from "../index";
import { setTransaction } from "../../Slices/transactionSlice";

function ExpenseLineGraph({setFilteredTransactions}) {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const [transactions, setTransactions] = React.useState([]);
  const existingTransactions = useSelector((state) =>
    state.transaction.transactionDataType === "ExpenseLineGraph"

      ? state.transaction.transactions
      : []
  );
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
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

  const ExpenseLineGraph = (labels, data) => {
    // destroy the previous chart if it exists`
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    if (!canvasRef.current) {
      return;
    }

    // create a new chart
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Expense",
            data: data,
            backgroundColor: "rgba(206, 51, 253, 0.7)",
            borderColor: "rgba(206, 51, 253, 0.7)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Expense Line Graph",
          },
        },
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
    const dates = filteredData.map((row) =>
      new Date(row.date).toLocaleDateString("en-US")
    );
    const amount = filteredData.map((row) => row.amount);
    ExpenseLineGraph(dates, amount);
  };

  useEffect(() => {
    handleTimePeriodChange();
  }, [transactions, selectedTimePeriod]);

 useEffect(()=>{
     if(!transactions.length) return;
     dispatch(setTransaction({
      transactionData:transactions,
       transactionDataType: "ExpenseLineGraph",
     }));
     
   },[transactions])
 

  useEffect(() => {
    setLoading(true);
    if(!userId) return;
    // Check if transactions are already fetched
    if (existingTransactions?.length > 0) {
      handleTimePeriodChange();
      setTransactions(existingTransactions);
      setLoading(false);
      return;
    }
    
    transactionService
      .getUserExpenseTransactions({ userId })
      .then((response) => {
        console.log("response.documents", response.documents);
        setTransactions(response.documents);
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
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Expense Line Graph
      </h1>
  
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4">
        <div className="w-full">
          <Select
            options={timePeriod}
            className="w-full"
            selectedOption={selectedTimePeriod}
            label="Select Time Period"
            onChange={(e) => {
              setSelectedTimePeriod(e.target.value);
            }}
          />
        </div>
  
        <div className="w-full overflow-x-auto">
          <canvas ref={canvasRef} className="w-full h-[300px]"></canvas>
        </div>
      </div>
    </div>
  );
  
}

export default ExpenseLineGraph;
