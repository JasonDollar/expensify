import moment from 'moment'


const filtersReducerDefaultState = {
  text: '',
  sortBy: 'amount',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
}
export default (state = filtersReducerDefaultState, action) => {
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