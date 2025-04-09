import React, { useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import { TransactionCard } from "../../components";
import { useSelector } from "react-redux";

const AllExpense = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    setLoading(true);
    transactionService
      .getUserExpenseTransactions({ userId })
      .then((response) => {
        console.log("response from getUserExpenseTransactions", response.documents);
        setTransactions(response.documents);
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
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
      💸 All Expenses
    </h1>

    <div className="space-y-4">
      {transactions.filter((tx) => tx?.type === "Expense").length > 0 ? (
        transactions
          .filter((tx) => tx?.type === "Expense")
          .map((transaction) => (
            <TransactionCard key={transaction.$id} transaction={transaction} />
          ))
      ) : (
        <p className="text-gray-500 text-center">No expense transactions found.</p>
      )}
    </div>
  </div>
);

};

export default AllExpense;
