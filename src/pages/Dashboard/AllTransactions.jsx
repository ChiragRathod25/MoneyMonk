import React, { useEffect } from "react";
import transactionService from "../../appwrite/transactionServices";
import { TransactionCard } from "../../components";
import { useSelector } from "react-redux";

function AllTransactions() {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const [error, setError] = React.useState(null);

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
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-8">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading your transactions...
        </p>
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
        <p className="text-gray-600 text-lg animate-pulse">
          No transactions found
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">
        All Transactions
      </h1>

      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.$id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-10">
          No transactions found. Start adding your expenses!
        </div>
      )}
    </div>
  );
}

export default AllTransactions;
