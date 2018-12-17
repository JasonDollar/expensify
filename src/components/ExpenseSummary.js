import React, { Component } from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import expensesTotal from '../selectors/expensesTotal'
import selectExpenses from "../selectors/expenses"



export const ExpenseSummary = ({ expenses, expenseCount }) => {
  const wordCount = expenseCount === 1 ? ' expense ' : ' expenses '
  return (
    <div>
      <h2>
        {'Viewing '}
        {expenseCount}
        {wordCount}
        {'totalling '}
        {numeral(expensesTotal(expenses) / 100).format('$0,0.00')}
      </h2>
    </div>
  )  
}

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)
  return {
  expenses: visibleExpenses,
  expenseCount: visibleExpenses.length,
}}

export default connect(mapStateToProps)(ExpenseSummary)



