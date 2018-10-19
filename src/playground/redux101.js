import { createStore } from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
})
  
const setCount = ({count }) => ({
  type: 'SET',
  count
})

const reset = () => ({
  type: 'RESET',
  count: 0
})

// REDUCERS
const countReducer = (state = {count: 0}, action) => {

  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
    
      return {
        count: state.count - action.decrementBy
      }
    case 'RESET':
      return {
        count: 0
      }
    case 'SET':
      return {
        count: action.count
      }
    default: 
      return state
  }
}



const store = createStore(countReducer)

// wyswietlany przy kazdej zmianie
store.subscribe(() => {
  console.log(store.getState())
})

// Actions - object that get sent to the store

//increment
store.dispatch(incrementCount({incrementBy: 5}))
store.dispatch(incrementCount())

store.dispatch(reset())
store.dispatch(setCount({count: 101}))

store.dispatch(decrementCount())

store.dispatch(incrementCount({incrementBy: 12}))






console.log(store.getState())