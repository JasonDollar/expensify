import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE action
const addExpense = (
  {
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

const removeExpense = ({id}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})



// Expenses reducer
const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id) 
      //filter nie zmienia state tylko zwraca nowy - (item => item.id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        }
      })
    default: 
      return state
  }
}


// Filters actions
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

const sortByDate = () => ({
  type: 'SORT_DATE'
})

const sortByAmount = () => ({
  type: 'SORT_AMOUNT'
})

const setStartDay = date => ({
  type: 'START_DATE',
  startDate: date
})

const setEndDay = date => ({
  type: 'END_DATE',
  endDate: date
})


// Filters reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined
}
const filtersReducer  = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER': 
      return {
        ...state,
        text: action.text
      }
    case 'SORT_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default: 
      return state
  }
}
 
// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter(expense => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof startDate !== 'number' || expense.createdAt >= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    return startDateMatch && endDateMatch && textMatch  
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  })
}

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

store.subscribe(() => {
  const state = store.getState() //zwraca caly state ze store
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})



const demoState = {
  expenses: [{
    id: 'sadfdsaf',
    description: 'January Rent',
    note: 'final rent payment',
    amount: 54500,
    createdAt: 1000
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
}

const expenseOne = store.dispatch(addExpense(demoState.expenses[0]))
const expenseTwo = store.dispatch(addExpense(demoState.expenses[0]))
// console.log(expenseOne)
// store.dispatch(removeExpense(expenseOne.expense))

// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500, description: 'coffe'}))

// store.dispatch(setStartDay(1001))
// store.dispatch(setEndDay(1031))

// store.dispatch(sortByDate())
// store.dispatch(sortByAmount())

store.dispatch(setStartDay(125)) 
store.dispatch(setTextFilter('ren')) 
// store.dispatch(setTextFilter('rff  ')) 
store.dispatch(sortByDate()) 
// store.dispatch(setStartDay())
// store.dispatch(setEndDay(1205))
// store.dispatch(setEndDay())

