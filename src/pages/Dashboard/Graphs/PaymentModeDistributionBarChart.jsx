import React from "react";
import {
  PaymentModeDistributionBarChart as PaymentModeDistributionBarChartComponent,
  TransactionTable,
} from "../../../components";
function PaymentModeDistributionBarChart() {
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  return (
    <>
      <div>PaymentModeDistributionBarChart</div>
      <PaymentModeDistributionBarChartComponent
        setFilteredTransactions={setFilteredTransactions}
      />
      <TransactionTable
        transactions={filteredTransactions}
        className="w-full"
      />
    </>
  );
}

export default PaymentModeDistributionBarChart;
