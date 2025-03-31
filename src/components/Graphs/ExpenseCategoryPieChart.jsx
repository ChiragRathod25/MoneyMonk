import React, { useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

function ExpenseCategoryPieChart() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const [Data, setData] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserTransactions({ userId })
      .then((response) => {
        console.log(response.documents);
        setTransactions(response.documents);
        return response.documents;
      })
      .then((data) => {
        const category = {};
        for (const cat of data) {
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
        return categoryArray
      })
      .then((data) => {
        setData(data);
        console.log("Data", data);
        return data;
      })
      .then((Data)=>{
        const expensePieChart = async function () {
          const data = Data;
      
          new Chart(document.getElementById("acquisitions"), {
            type: "pie",
            data: {
              labels: data.map((row) => row.name),
              datasets: [
                {
                  label: "Acquisitions by year",
                  data: data.map((row) => row.amount),
                },
              ],
            },
          });
        };
        expensePieChart();
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

 
 

  return (
    <>
      <div>ExpenseCategoryPieChart</div>
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
        <canvas id="acquisitions"></canvas>
      </div>
    </>
  );
}

export default ExpenseCategoryPieChart;
