import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('should setup def. filter val', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should set sortBy to amount', ()=> {
  const state = filtersReducer(undefined, { type: 'SORT_AMOUNT' })
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})
test('should set sortBy to date', ()=> {
  const oldState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const state = filtersReducer(oldState, { type: 'SORT_DATE' })
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should set text filter', () => {
  const text = 'lol'
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text })
  expect(state.text).toBe(text)
})
test('should set start date', () => {
  const startDate = moment()
  const state = filtersReducer(undefined, { type: 'START_DATE', startDate })
  expect(state.startDate).toBe(startDate)
})
test('should set end date', () => {
  const endDate = moment().add(2, 'days').valueOf()
  const state = filtersReducer(undefined, { type: 'END_DATE', endDate })
  expect(state.endDate).toBe(endDate)
})