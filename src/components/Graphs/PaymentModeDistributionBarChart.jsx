import React, { useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

function PaymentModeDistributionBarChart() {
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
        const category = {};
        for (const cat of data) {
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
  
        return paymentModeArray;
      })
      .then((Data) => {
        console.log("Data", Data);
        const PaymentModeDistributionBarChart = async function () {
          new Chart(
            document.getElementById("PaymentModeDistributionBarChart"),
            {
              type: "bar",
              data: {
                labels: Data.map((row) => row.name),
                datasets: [
                  {
                    label: "Payment Modes",
                    data: Data.map((row) => row.amount),
                    backgroundColor: "rgba(253, 51, 162, 0.7)",
                    
                  },
                ],
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    // text: 'Chart.js Bar Chart'
                  }
                }
              },
            }
          );
        };
        PaymentModeDistributionBarChart();
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
  if(!transactions.length){
    return <div>No transactions found</div>;
  }
  

  return (
    <div>
      <h1>
        Payment Mode Distribution Bar Chart
      </h1>
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
        <canvas id="PaymentModeDistributionBarChart"></canvas>
      </div>
    </div>
  );
}

export default PaymentModeDistributionBarChart;
