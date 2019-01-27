

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
        } else return expense
      }) 
    case 'SET_EXPENSES':
      return action.expenses
    default: 
      return state
  }
}

export default expensesReducer

/*
FIREBASE_API_KEY=AIzaSyCChDa8LGwWtMktjMGD80Up9_Eryo21V8A
FIREBASE_AUTH_DOMAIN=expensify-f4e49.firebaseapp.com
FIREBASE_DATABASE_URL=https://expensify-f4e49.firebaseio.com
FIREBASE_PROJECT_ID=expensify-f4e49
FIREBASE_STORAGE_BUCKET=expensify-f4e49.appspot.com
FIREBASE_MESSAGING_SENDER_ID=273117936780


*/