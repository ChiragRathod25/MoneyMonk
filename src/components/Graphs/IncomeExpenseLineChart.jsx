import React, { useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

function IncomeExpenseLineChart() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const userId = useSelector((state) => state?.auth?.userData?.$id);

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserTransactions({ userId })
      .then((response) => {
        console.log("response.documents", response.documents);
        setTransactions(response.documents);
        return response.documents;
      })
      .then((data) => {
        // separate income and expense transactions with date for label
        const incomeTransactions = [];
        const expenseTransactions = [];

        for (const transaction of data) {
          if (transaction.type === "Income") {
            incomeTransactions.push({
              name: transaction.description,
              date: transaction.date,
              amount: transaction.amount,
            });
          } else {
            expenseTransactions.push({
              name: transaction.description,
              date: transaction.date,
              amount: transaction.amount,
            });
          }
        }
        console.log("incomeTransactions", incomeTransactions);
        console.log("expenseTransactions", expenseTransactions);

        return data;
        return { incomeTransactions, expenseTransactions };
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        const DATA_COUNT = 12;
        const labels = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",

        ];
        for (let i = 0; i < DATA_COUNT; ++i) {
          labels.push(i.toString());
        }
        const datapoints = [
          0,
          20,
          20,
          60,
          60,
          120,
          NaN,
          180,
          120,
          125,
          105,
          110,
          170,
        ];
        const CHART_COLORS = {
          red: "rgb(255, 99, 132)",
          orange: "rgb(255, 159, 64)",
          yellow: "rgb(255, 205, 86)",
          green: "rgb(75, 192, 192)",
          blue: "rgb(54, 162, 235)",
          purple: "rgb(153, 102, 255)",
          grey: "rgb(201, 203, 207)",
        };
        const Data = {
          labels: labels,
          datasets: [
            {
              label: "Cubic interpolation (monotone)",
              data: datapoints,
              borderColor: CHART_COLORS.red,
              fill: false,
              cubicInterpolationMode: "monotone",
              tension: 0.4,
            },
         
         
          ],
        };
        const incomePieChart = async function () {
          const data = Data;
          new Chart(document.getElementById("IncomeExpenseLineChart"), {
            type: "line",
            data: data,
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Chart.js Line Chart - Cubic interpolation mode",
                },
              },
              interaction: {
                intersect: false,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Value",
                  },
                  suggestedMin: -10,
                  suggestedMax: 200,
                },
              },
            },
          });
        };
        incomePieChart();
      });
  }, [userId]);
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>IncomeExpenseLineChart</div>
      <div
        className="
    flex 
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
        <canvas id="IncomeExpenseLineChart"></canvas>
      </div>
    </>
  );
}

export default IncomeExpenseLineChart;
