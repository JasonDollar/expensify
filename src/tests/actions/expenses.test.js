/* eslint-disable */
import { addExpense, removeExpense, editExpense } from '../../actions/expenses'

test('remove expense', () => {
  const action = removeExpense({ id: '123ase' })
  expect(action).toEqual ({
    type: 'REMOVE_EXPENSE',
    id: '123ase'
  })
}) 

test('edit expense', ()=> {
  const action = editExpense('asdf' , 'lol' )
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'asdf',
    updates: 'lol'
  })
})

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'rent',
    amount: 109500,
    createdAt: 123,
    note: 'none'
  }
  const action = addExpense(expenseData)
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})

test('should setup add expense action object with default values', () => {
  const action = addExpense()
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description : '', 
    note : '', 
    amount : 0, 
    createdAt : 0,
    id: expect.any(String)
    }
  })
})