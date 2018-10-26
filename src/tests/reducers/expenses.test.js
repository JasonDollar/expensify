import expensesReducer from '../../reducers/expenses'

import expenses from '../fixtures/expenses'

test('should set def. state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if no id found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

test('should add an expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
        id: '1',
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state[state.length-1]).toEqual(action.expense)
})

test('should edit an expense', () => {
  const amount = 2132132312321
  const action = {
    type: 'EDIT_EXPENSE',
    id: '2',
    updates: {
      amount
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state[1].amount).toBe(amount)
})
test('should not edit expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '4',
    updates: {
      amount: 111500,
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

