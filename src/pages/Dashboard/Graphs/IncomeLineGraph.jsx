import React from 'react'
import {IncomeLineGraph as IncomeLineGraphComponent,TransactionTable}  from "../../../components"
function IncomeLineGraph() {
    const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  return (
    <>
    <div>IncomeLineGraph</div>
    <IncomeLineGraphComponent setFilteredTransactions={setFilteredTransactions}/>
    <TransactionTable transactions={filteredTransactions} className="w-full" />

    </>
  )
}

export default IncomeLineGraph