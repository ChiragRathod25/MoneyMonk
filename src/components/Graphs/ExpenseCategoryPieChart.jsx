import React, { useDebugValue, useEffect, useRef } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "../index";
import { setTransaction } from "../../Slices/transactionSlice";

function ExpenseCategoryPieChart({setFilteredTransactions}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const existingTransactions = useSelector((state) =>
    state.transaction.transactionDataType === "ExpenseCategoryPieChart"
      ? state.transaction.transactions
      : []
  );
  const dispatch = useDispatch()
  const userId = useSelector((state) => state?.auth?.userData?.$id);
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

  const expensePieChart = function (data) {
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
    setFilteredTransactions(filteredData);
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

  useEffect(() => {
    if(!canvasRef.current) return;
    handleTimePeriodChange();
  }, [transactions, selectedTimePeriod]);

  useEffect(()=>{
    if(!transactions.length) return;
    dispatch(setTransaction({
      transactionDataType: "ExpenseCategoryPieChart",
      transactionData: transactions,
    }))
  },[transactions])


  useEffect(() => {
    setLoading(true);
    if(existingTransactions?.length) {
      handleTimePeriodChange();
      setTransactions(existingTransactions);
      setLoading(false);
      return;
    }


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
      <div>ExpenseCategoryPieChart</div>
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
      </div>
    </>
  );
}

export default ExpenseCategoryPieChart;
