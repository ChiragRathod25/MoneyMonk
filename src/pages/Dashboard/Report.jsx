import React from 'react'
import { ExpenseCategoryPieChart, IncomeExpenseLineChart, IncomeSubCategoryPieChart } from '../../components'


function Report() {
  return (
    <>
    
    <div>Report</div>

    <ExpenseCategoryPieChart/>
    <IncomeSubCategoryPieChart/>
    <IncomeExpenseLineChart/>
    </>
  )
}

export default Report