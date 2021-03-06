/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startAddExpense ,
  addExpense, 
  removeExpense, 
  editExpense, 
  setExpenses, 
  startSetExpenses, 
  startRemoveExpense, 
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expenseData = {}
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expensesData[id] =  {description, note, amount, createdAt}
  })
  database.ref('expenses').set(expensesData).then(() => done())
})

test('remove expense', () => {
  const action = removeExpense({ id: '123ase' })
  expect(action).toEqual ({
    type: 'REMOVE_EXPENSE',
    id: '123ase'
  })
}) 

test('should remove expense from firebase', (done) => {
  const store = createMockStore({})
  const id = expenses[2].id
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    })
    return database.ref('expenses/' + id).once('value')
      .then((snapschot) => {
        expect(snapshot.val()).toBeFalsy()
        done()
      })
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

  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'mouse',
    amount: 3000,
    note: 'mouse', 
    createdAt: 1000,
  }
  store.dispatch(startAddExpense(expenseData))
    .then (() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      })
      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData)
      done()
    })

})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
  const expenseDefault = {
    description: '',
    amount: 0,
    note: '', 
    createdAt: 0,
  }
  store.dispatch(startAddExpense({}))
    .then (() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefault
        }
      })
      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefault)
      done()
    })
})

test('should set up set expense action obj with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  })
})

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({})
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    })
  })

})