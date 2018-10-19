import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h1>Expense List</h1>
      {expenses.map(item => (
        <ExpenseListItem 
          key={item.id} 
          {...item}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList)

