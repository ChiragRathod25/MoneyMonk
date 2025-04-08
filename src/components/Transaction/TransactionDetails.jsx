import React, { useEffect, useState } from "react";
import transactionService from "../../appwrite/transactionServices";
import bucketService from "../../appwrite/bucketServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Transaction() {
  const { transactionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [referenceImageUrl, setReferenceImageUrl] = useState(null);
  const existingTransactions = useSelector(
    (state) => state.transaction.transactions
  );
  console.log("existingTransactions", existingTransactions);
  console.log("transactionId", transactionId);
  useEffect(() => {
    const existingTransaction = existingTransactions.find(
      (transaction) => transaction.$id === transactionId
    );
    console.log("existingTransaction", existingTransaction);

    if (existingTransaction) {
      setTransaction(existingTransaction);
      console.log("transaction", existingTransaction);
      setLoading(false);
      return;
    }
    if (!transactionId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    transactionService
      .getTransactionById(transactionId)
      .then((res) => {
        console.log("transaction", res);
        setTransaction(res);
      })
      .catch((error) => {
        console.error("Transaction", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!transaction) return;
    if (transaction.reference) {
      bucketService
        .getFilePreview(transaction.reference)
        .then((res) => {
          console.log("reference image", res);
          setReferenceImageUrl(res.href);
        })
        .catch((error) => {
          console.error("Transaction", error);
          setError(error.message);
        });
    }
  }, [transaction]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!transaction) {
    return <div>No transactions found</div>;
  }

  // amount
  // double
  // enum
  // status
  // enum
  // description
  // string
  // reference
  // string
  // date
  // datetime
  // categoryId
  // relationship with categoryId
  // subcategoryId
  // relationship with subcategoryId
  // paymentModeId
  // relationship with paymentModeId
  // userId
  // string

  return (
    <>
      <div>Transaction</div>

      <div>Transaction Id: {transaction.$id}</div>
      <div>Transaction Type: {transaction?.type}</div>
      <div>Transaction Amount: {transaction?.amount}</div>
      <div>Transaction Status: {transaction?.status}</div>
      <div>Transaction Notes: {transaction?.description}</div>
      <div>
        <img src={referenceImageUrl} alt="Transaction Reference" />
      </div>
      <div>Transaction Date: {transaction?.date}</div>
      <div>Transaction Category: {transaction?.categoryId.name}</div>
      <div>Transaction Subcategory: {transaction?.subcategoryId.name}</div>
      <div>Transaction Payment Mode: {transaction?.paymentModeId.name}</div>
    </>
  );
}

export default Transaction;
