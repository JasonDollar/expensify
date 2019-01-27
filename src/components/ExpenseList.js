import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'



export const ExpenseList = ({ expenses }) => {
  
  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">Expenses </div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      <div className="list-body">
        {
          expenses.length === 0 ? (
            <div className="list-item--message">
              <span>No expenses</span>
            </div>
          ) : (
            expenses.map(item => (
              <ExpenseListItem 
                key={item.id} 
                {...item}
              />
              ))
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList)


