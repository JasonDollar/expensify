import React from 'react'
import { shallow } from 'enzyme'

import { ExpenseSummary } from '../../components/ExpenseSummary'
import expenses from '../fixtures/expenses'

test('should render expenses amount with expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenses={expenses} expenseCount={3} />)

  expect(wrapper).toMatchSnapshot()
})

test('should render amount of 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expenses={[{ ...expenses[0] }]} expenseCount={1} />)

  expect(wrapper).toMatchSnapshot()
})