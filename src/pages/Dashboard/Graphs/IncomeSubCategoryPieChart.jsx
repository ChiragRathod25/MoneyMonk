import React from 'react'
import {IncomeSubCategoryPieChart as IncomeSubCategoryPieChartComponent, TransactionTable} from "../../../components"
function IncomeSubCategoryPieChart() {
    const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  return (
    <>
    <div>IncomeSubCategoryPieChart</div>
    <IncomeSubCategoryPieChartComponent setFilteredTransactions={setFilteredTransactions}/>
    <TransactionTable transactions={filteredTransactions} className="w-full"/>
    
    </>
  )
}

export default IncomeSubCategoryPieChart