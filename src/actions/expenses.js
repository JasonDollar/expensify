import uuid from 'uuid'
import database from '../firebase/firebase'

// ADD_EXPENSE action
const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
})

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0
    } = expenseData
    const expense = { description, note, amount, createdAt }
    return database.ref('expenses').push(expense)
      .then(ref => { //ref ktore nam firebase zwroci bd przydatne do akcji zrobienia
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }))
      })

  }
}

const removeExpense = ({ id })=> ({
  type: 'REMOVE_EXPENSE',
  id
})

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
}) 

export const startSetExpenses = () => {
  return dispatch => {
    // const {
    // description = '', 
    // note = '', 
    // amount = 0, 
    // createdAt = 0
    // } = expenseData
    // const expense = { description, note, amount, createdAt }
    return database.ref('expenses').once('value')
      .then(snapshot => { 
        const expenses = []
        snapshot.forEach(item => {
          expenses.push({
            id: item.key,
            ...item.val()
          })
        })
        dispatch(setExpenses(expenses))
      })

  }
}

export { addExpense, removeExpense, editExpense }