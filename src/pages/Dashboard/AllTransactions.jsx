import React, { useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import { TransactionCard } from "../../components";
import { useSelector } from "react-redux";

function AllTransactions() {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const userId = useSelector((state) => state?.auth?.userData?.$id);

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserTransactions({ userId })
      .then((response) => {
        console.log("response from getUserTransactions", response.documents);
        setTransactions(response.documents);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>All Expense</h1>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.$id} transaction={transaction} />
      ))}
    </div>
  );
}

export default AllTransactions;
