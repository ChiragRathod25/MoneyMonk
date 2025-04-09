import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTransaction } from "../../Slices/transactionSlice";

const typeIcon = {
  income: (
    <ArrowDownCircle className="text-emerald-500 bg-emerald-100 dark:bg-emerald-800/20 p-1 w-7 h-7 rounded-full" />
  ),
  expense: (
    <ArrowUpCircle className="text-rose-500 bg-rose-100 dark:bg-rose-800/20 p-1 w-7 h-7 rounded-full" />
  ),
};

const statusStyle = {
  success: "bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/20 dark:text-yellow-300",
};


const TransactionTable = ({ transactions = [] }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleClick=(transaction)=>{
    navigate(`/transaction/view/${transaction.$id}`)
  }
  

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-[#0f172a] m-4 p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <motion.table
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-w-full table-auto text-sm md:text-base"
      >
        <thead>
          <tr className="bg-gray-100 dark:bg-[#1e293b] text-[13px] md:text-[14px] text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            <th className="px-6 py-4 text-left">Type</th>
            <th className="px-6 py-4 text-left">Amount</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Payment</th>
            <th className="px-6 py-4 text-left">Date</th>
            <th className="px-6 py-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {transactions && transactions.map((tx, index) => (
            <motion.tr
              key={tx.referenceNo || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => handleClick(tx)}
              className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1c2431] transition duration-300 text-gray-800 dark:text-gray-300"
            >
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3 font-medium">
                {typeIcon[tx.type]}
                <span className="capitalize">{tx.type}</span>
              </td>
              <td className="px-6 py-4 font-bold text-gray-900 dark:text-white tracking-tight">
                ₹{tx.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 capitalize">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {tx.categoryId?.name || "—"}
                  </span>
                  {tx.subcategoryId?.name && (
                    <span className="text-xs text-gray-400">
                      {tx.subcategoryId.name}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CreditCard className="w-4 h-4" />
                  {tx.paymentModeId?.name || "—"}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(tx.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
                    statusStyle[tx.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
      {transactions.length === 0 && (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
          No transactions yet. Add your first one!
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
