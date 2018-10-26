/*eslint-disable */
import moment from 'moment'
import { setStartDay, setEndDay, setTextFilter, sortByDate , sortByAmount } from '../../actions/filters'

test('should generate set start date action obj.', () => {
  const action = setStartDay(moment(0))
  expect(action).toEqual({
    type: 'START_DATE',
    startDate: moment(0) 
  })
})

test('should generate set end date action obj.', () => {
  const action = setEndDay(moment(0))
  expect(action).toEqual({
    type: 'END_DATE',
    endDate: moment(0)
  })
})

test('sort by date', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_DATE' })
})

test('sort by amount', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_AMOUNT' })
})

test('set filter text to coffee', () => {
  const text = 'coffee'
  const action = setTextFilter(text)
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  })
})

test('set filter text to empty string', () => {
  const action = setTextFilter()
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})