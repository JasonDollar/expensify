

import React from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import {
  addExpense,  
  removeExpense, 
  editExpense
} from './actions/expenses'
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDay,
  setEndDay
} from './actions/filters'
import getVisibleExpense from './selectors/expenses'

 

const store = configureStore()

store.dispatch(addExpense({
  id: 238764,
  description: 'water bill',
  note: null,
  amount: 2134,
  createdAt: Date.now()
}))
store.dispatch(addExpense({
  id: uuid(),
  description: 'rent',
  note: null,
  amount: 1023,
  createdAt: Date.now()
}))


store.dispatch(setTextFilter(''))

console.log(store.getState())

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
  
  ReactDOM.render(  jsx , document.getElementById('app'))