import React, { useEffect, useState } from "react";
import transactionService from "../../appwrite/transactionServices";
import bucketService from "../../appwrite/bucketServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function TransactionDetails() {
  const { transactionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [referenceImageUrl, setReferenceImageUrl] = useState(null);

  const existingTransactions = useSelector(
    (state) => state.transaction.transactions
  );

  useEffect(() => {
    const existingTransaction = existingTransactions.find(
      (t) => t.$id === transactionId
    );

    if (existingTransaction) {
      setTransaction(existingTransaction);
      return;
    }

    if (!transactionId) return;

    setLoading(true);
    transactionService
      .getTransactionById(transactionId)
      .then((res) => setTransaction(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (transaction?.reference) {
      bucketService
        .getFilePreview(transaction.reference)
        .then((res) => setReferenceImageUrl(res.href))
        .catch((err) => setError(err.message));
    }
  }, [transaction]);

  if (loading) return <div className="text-center py-6 text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-6">Error: {error}</div>;
  if (!transaction) return <div className="text-center py-6 text-gray-500">No transaction found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transaction Details</h2>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>ID:</strong> {transaction.$id}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>Amount:</strong> ₹{transaction.amount}</p>
        <p><strong>Status:</strong> {transaction.status}</p>
        <p><strong>Description:</strong> {transaction.description}</p>
        <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
        <p><strong>Category:</strong> {transaction.categoryId?.name}</p>
        <p><strong>Subcategory:</strong> {transaction.subcategoryId?.name}</p>
        <p><strong>Payment Mode:</strong> {transaction.paymentModeId?.name}</p>
      </div>

      {referenceImageUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-1">Reference Image:</h3>
          <img
            src={referenceImageUrl}
            alt="Transaction Reference"
            className="w-full rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
}

export default TransactionDetails;
