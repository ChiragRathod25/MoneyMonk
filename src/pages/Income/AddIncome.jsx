import React from 'react'
import { TransactionForm } from '../../components'
function AddIncome() {
  return (
    <div>
        <TransactionForm transacationType="income" />
    </div>
  )
}

export default AddIncome