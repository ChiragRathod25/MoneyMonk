import React, { useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import {Select} from "../index";

function PaymentModeDistributionBarChart() {
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

  const PaymentModeBarChart = function (data) {
    // destroy the previous chart if it exists
    const existingChart = Chart.getChart("PaymentModeDistributionBarChartId");
    if (existingChart) {
      existingChart.destroy();
    }

    // create a new chart
    new Chart(document.getElementById("PaymentModeDistributionBarChartId"), {
      type: "bar",
      data: {
        labels: data.map((row) => row.name),
        datasets: [
          {
            label: "Payment Mode",
            data: data.map((row) => row.amount),
            backgroundColor: "rgba(253, 51, 162, 0.7)",
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
            // text: 'Chart.js Bar Chart'
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
    const filteredData = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        (startDate ? transactionDate >= startDate : true) &&
        transactionDate <= currentDate
      );
    });
    console.log("Filtered Data", filteredData);
    const category = {};
    for (const cat of filteredData) {
      if (!category[cat.paymentModeId.name]) {
        category[cat.paymentModeId.name] = cat.amount;
      } else {
        category[cat.paymentModeId.name] += cat.amount;
      }
    }

    // convert object to array
    const paymentModeArray = Object.entries(category).map(([key, value]) => ({
      name: key,
      amount: value,
    }));
    console.log("Filtered Data", filteredData);
    console.log("category", category);
    console.log("paymentModeArray", paymentModeArray);
    PaymentModeBarChart(paymentModeArray);
  };

   useEffect(() => {
     handleTimePeriodChange();
   }, [transactions, selectedTimePeriod]);

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserTransactions({ userId })
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
      <h1>Payment Mode Distribution Bar Chart</h1>
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
          selectedOption={selectedTimePeriod}
          setSelectedOption={setSelectedTimePeriod}
          label="Select Time Period"
          onChange={(e) => {
            setSelectedTimePeriod(e.target.value);
          }}
        />
        <canvas id="PaymentModeDistributionBarChartId"></canvas>
      </div>
    </div>
  );
}

export default PaymentModeDistributionBarChart;
