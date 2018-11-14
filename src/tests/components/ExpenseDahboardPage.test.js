import React from 'react'
import { shallow } from 'enzyme'

import ExpenseDahsboardPage from '../../components/ExpenseDahsboardPage'

test('should render ExpenseDahsboardPage correctly', () => {

  const wrapper = shallow(<ExpenseDahsboardPage />)
  expect(wrapper).toMatchSnapshot()
})  