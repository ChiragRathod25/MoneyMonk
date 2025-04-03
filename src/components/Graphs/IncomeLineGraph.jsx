import React, { useEffect } from 'react'
import transactionService from '../../appwrite/transactionServices';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

function IncomeLineGraph() {
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const userId = useSelector((state) => state?.auth?.userData?.$id);
    const [transactions, setTransactions] = React.useState([]);

    useEffect(()=>{
        transactionService.getUserIncomeTransactions({userId})
        .then((response)=>{
            console.log("response.documents", response.documents);
            setTransactions(response.documents);
            return response.documents;
        })
        .then((data)=>{
            // get the month from the date and amount
            const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            const month = sortedData.map((row) => new Date(row.date).toLocaleString('default', { month: 'long' }));
            const amount = sortedData.map((row) => row.amount);
            const dates= sortedData.map((row) => new Date(row.date).toLocaleDateString('en-US'));
            const IncomeLineGraph=()=>{
                new Chart(
                    document.getElementById("incomeLineGraph"),
                    {
                        type:"line",
                        data:{
                            labels: dates,
                            datasets:[
                                {
                                    label:"Income",
                                    data: amount,
                                    backgroundColor:"rgba(253, 51, 162, 0.7)",
                                    borderColor:"rgba(253, 51, 162, 0.7)",
                                    borderWidth:2,
                                 
                                }
                            ]
                        },
                        options:{
                            responsive:true,
                            plugins:{
                                legend:{
                                    position:"top"
                                },
                                title:{
                                    display:true,
                                    text:"Income Line Graph"
                                }
                            }
                        }
                    }
                )
                
            }
            IncomeLineGraph()
        })
        .catch((error)=>{
            console.log(error);
            setError(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    },[userId])
  
     // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>
        Income Line Graph
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
        <canvas id="incomeLineGraph"></canvas>
      </div>
    </div>
  );
}

export default IncomeLineGraph