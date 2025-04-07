import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import transactionService from "../../appwrite/transactionServices";
import { Select, TransactionTable } from "../index";

function ExpenseLineGraph() {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const [transactions, setTransactions] = React.useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
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

  useEffect(() => {
    setLoading(true);
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
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Expnese Line Graph</h1>
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
          selectedOption={selectedTimePeriod}
          label="Select Time Period"
          onChange={(e) => {
            setSelectedTimePeriod(e.target.value);
          }}
        />

        <canvas ref={canvasRef}></canvas>
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}

export default ExpenseLineGraph;
