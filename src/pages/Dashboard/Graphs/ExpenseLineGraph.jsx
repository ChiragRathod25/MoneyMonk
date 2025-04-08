import React from 'react'
import {ExpenseLineGraph as ExpenseLineGraphComponent,TransactionTable} from "../../../components"

function ExpenseLineGraph() {
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  return (
    
    <>
    <div>ExpenseLineGraph</div>
    <ExpenseLineGraphComponent setFilteredTransactions={setFilteredTransactions}/>
    <TransactionTable transactions={filteredTransactions} className="w-full" />

    </>
  )
}

export default ExpenseLineGraph