import React from 'react'
import { TransactionForm } from '../../components'

function AddExpense() {
  return (
    <div>
        <TransactionForm transacationType="expense" />
    </div>
  )
}

export default AddExpense