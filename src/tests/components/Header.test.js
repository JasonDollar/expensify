// react-test-renderer
import React from 'react'
import { shallow } from 'enzyme'
// import toJSON from 'enzyme-to-json'

// import ReactShallowRenderer from 'react-test-renderer/shallow'

import Header from '../../components/Header'

test('should render header corretcly', () => {
  // const renderer = new ReactShallowRenderer()
  // renderer.render(<Header />)
  // expect(renderer.getRenderOutput()).toMatchSnapshot()

  const wrapper = shallow(<Header />)
  // expect(wrapper.find('h1').length).toBe(1) 
  // expect(wrapper.find('h1').text()).toBe('Expensify') 
  expect(wrapper).toMatchSnapshot()
})  