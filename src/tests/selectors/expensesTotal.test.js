import expensesTotal from '../../selectors/expensesTotal'
import expenses from '../fixtures/expenses'

test('should return 0 if no expense', () => {
  const result = expensesTotal([])
  expect(result).toBe(0)
})


test('should correctly add up a single expense', () => {
  const amount = expenses[0].amount
  // expensesTotal zawsze otrzymuje array of object, tu tez tak musi otzrymac
  const result = expensesTotal([{ ...expenses[0] }])
  expect(result).toBe(amount)
})


test('should correctly add up a multiple expenses', () => {
  const result = expensesTotal(expenses)
  expect(result).toBe(114195)
})

