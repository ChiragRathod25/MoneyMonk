import React, { useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const IncomeSubCategoryPieChart = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const userId = useSelector((state) => state?.auth?.userData?.$id);

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserIncomeTransactions({ userId })
      .then((response) => {
        console.log("response.documents", response.documents);
        setTransactions(response.documents);
        return response.documents;
      })
      .then((data) => {
        const category = {};
        for (const cat of data) {
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
        return categoryArray;
      })
      .then((Data) => {
        console.log("Data", Data);
        const incomePieChart = async function () {
          new Chart(document.getElementById("incomeSubCategoryPieChart"), {
            type: "pie",
            data: {
              labels: Data.map((row) => row.name),
              datasets: [
                {
                  label: "Income by Sub-Category",
                  data: Data.map((row) => row.amount),
                },
              ],
            },
          });
        };
        incomePieChart();
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Income Sub-Category Pie Chart</h1>
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
        <canvas id="incomeSubCategoryPieChart"></canvas>
      </div>
    </div>
  );
};

export default IncomeSubCategoryPieChart;
